<?php

ini_set('display_errors', true);
define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/index.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
$modx->error->message = null;

$config = array(
    	"base_url" => "http://ha.fi1osof.modxcloud.com/assets/components/modhybridauth/action.php", 

		"providers" => array ( 
			// openid providers
			"OpenID" => array (
				"enabled" => true
			),

			"AOL"  => array ( 
				"enabled" => true 
			),

			"Yahoo" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" )
			),

			"Google" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" )
			),

			"Facebook" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" )
			),

			"Twitter" => array ( 
				"enabled" => true,
				"keys"    => array ( "key" => "DmviCRZIQloj7Wmsg0OiQ", "secret" => "jSgLScIJOxmk3oPVq9aT6SJvtNbHJ1J08nv9LrUqs" ) 
			),

			// windows live
			"Live" => array ( 
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ) 
			),

			"MySpace" => array ( 
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" ) 
			),

			"LinkedIn" => array ( 
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" ) 
			),

			"Foursquare" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ) 
			),
		),

		// if you want to enable logging, set 'debug_mode' to true  then provide a writable file by the web server on "debug_file"
		"debug_mode" => false,

		"debug_file" => ""
	);

/*$HybridAuth = $modx->getService('hybridauth','HybridAuth',$modx->getOption('hybridauth.core_path',null,$modx->getOption('core_path').'components/hybridauth/').'model/hybridauth/',array());
if (!($HybridAuth instanceof HybridAuth)) return '';

if (!$modx->error->hasError()) {
    $HybridAuth->process();
}*/

require_once MODX_BASE_PATH.'hybridauth/Hybrid/Auth.php';

define ('HYBRID_PATH',  MODX_BASE_PATH.'hybridauth/Hybrid/');

class modHybrid_Endpoint {
    public static $request = NULL;
	public static $initDone = FALSE;

	/**
	* Process the current request
	*
	* $request - The current request parameters. Leave as NULL to default to use $_REQUEST.
	*/
	public static function process( $request = NULL )
	{
		// Setup request variable
		modHybrid_Endpoint::$request = $request;

		if ( is_null(modHybrid_Endpoint::$request) ){
			// Fix a strange behavior when some provider call back ha endpoint
			// with /index.php?hauth.done={provider}?{args}... 
			// >here we need to recreate the $_REQUEST
			if ( strrpos( $_SERVER["QUERY_STRING"], '?' ) ) {
				$_SERVER["QUERY_STRING"] = str_replace( "?", "&", $_SERVER["QUERY_STRING"] );

				parse_str( $_SERVER["QUERY_STRING"], $_REQUEST );
			}

			modHybrid_Endpoint::$request = $_REQUEST;
		}

		// If openid_policy requested, we return our policy document
		if ( isset( modHybrid_Endpoint::$request["get"] ) && modHybrid_Endpoint::$request["get"] == "openid_policy" ) {
			modHybrid_Endpoint::processOpenidPolicy();
		}

		// If openid_xrds requested, we return our XRDS document
		if ( isset( modHybrid_Endpoint::$request["get"] ) && modHybrid_Endpoint::$request["get"] == "openid_xrds" ) {
			modHybrid_Endpoint::processOpenidXRDS();
		}

		// If we get a hauth.start
		if ( isset( modHybrid_Endpoint::$request["hauth_start"] ) && modHybrid_Endpoint::$request["hauth_start"] ) {
			modHybrid_Endpoint::processAuthStart();
		}
		// Else if hauth.done
		elseif ( isset( modHybrid_Endpoint::$request["hauth_done"] ) && modHybrid_Endpoint::$request["hauth_done"] ) {
			modHybrid_Endpoint::processAuthDone();
		}
		// Else we advertise our XRDS document, something supposed to be done from the Realm URL page
		else {
			modHybrid_Endpoint::processOpenidRealm();
		}
	}

	/**
	* Process OpenID policy request
	*/
	public static function processOpenidPolicy()
	{
		$output = file_get_contents( HYBRID_PATH . "/resources/openid_policy.html" ); 
		print $output;
		self::__die();
	}

	/**
	* Process OpenID XRDS request
	*/
	public static function processOpenidXRDS()
	{
		header("Content-Type: application/xrds+xml");

		$output = str_replace
		(
			"{RETURN_TO_URL}",
			str_replace(
				array("<", ">", "\"", "'", "&"), array("&lt;", "&gt;", "&quot;", "&apos;", "&amp;"), 
				Hybrid_Auth::getCurrentUrl( false )
			),
			file_get_contents( HYBRID_PATH . "/resources/openid_xrds.xml" )
		);
		print $output;
		self::__die();
	}

	/**
	* Process OpenID realm request
	*/
	public static function processOpenidRealm()
	{
		$output = str_replace
		(
			"{X_XRDS_LOCATION}",
			htmlentities( Hybrid_Auth::getCurrentUrl( false ), ENT_QUOTES, 'UTF-8' ) . "?get=openid_xrds&v=" . Hybrid_Auth::$version,
			file_get_contents( HYBRID_PATH . "/resources/openid_realm.html" )
		); 
		print $output;
		self::__die();
	}

	/**
	* define:endpoint step 3.
	*/
	public static function processAuthStart()
	{
		modHybrid_Endpoint::authInit();

		$provider_id = trim( strip_tags( modHybrid_Endpoint::$request["hauth_start"] ) );

		# check if page accessed directly
		if( ! Hybrid_Auth::storage()->get( "hauth_session.$provider_id.hauth_endpoint" ) ) {
			Hybrid_Logger::error( "Endpoint: hauth_endpoint parameter is not defined on hauth_start, halt login process!" );

			header( "HTTP/1.0 404 Not Found" );
			self::__die( "You cannot access this page directly  1." );
		}

		# define:hybrid.endpoint.php step 2.
		$hauth = Hybrid_Auth::setup( $provider_id );

		# if REQUESTed hauth_idprovider is wrong, session not created, etc. 
		if( ! $hauth ) {
			Hybrid_Logger::error( "Endpoint: Invalid parameter on hauth_start!" );

			header( "HTTP/1.0 404 Not Found" );
			self::__die( "Invalid parameter! Please return to the login page and try again." );
		}

		try {
			Hybrid_Logger::info( "Endpoint: call adapter [{$provider_id}] loginBegin()" );

			$hauth->adapter->loginBegin();
		}
		catch ( Exception $e ) {
			Hybrid_Logger::error( "Exception:" . $e->getMessage(), $e );
			Hybrid_Error::setError( $e->getMessage(), $e->getCode(), $e->getTraceAsString(), $e );

			$hauth->returnToCallbackUrl();
		}

		self::__die();
	}

	/**
	* define:endpoint step 3.1 and 3.2
	*/
	public static function processAuthDone()
	{
		modHybrid_Endpoint::authInit();

		$provider_id = trim( strip_tags( modHybrid_Endpoint::$request["hauth_done"] ) );

		$hauth = Hybrid_Auth::setup( $provider_id );

		if( ! $hauth ) {
			Hybrid_Logger::error( "Endpoint: Invalid parameter on hauth_done!" ); 

			$hauth->adapter->setUserUnconnected();

			header("HTTP/1.0 404 Not Found"); 
			self::__die( "Invalid parameter! Please return to the login page and try again." );
		}

		try {
			Hybrid_Logger::info( "Endpoint: call adapter [{$provider_id}] loginFinish() " );

			$hauth->adapter->loginFinish(); 
		}
		catch( Exception $e ){
			Hybrid_Logger::error( "Exception:" . $e->getMessage(), $e );
			Hybrid_Error::setError( $e->getMessage(), $e->getCode(), $e->getTraceAsString(), $e );

			$hauth->adapter->setUserUnconnected(); 
		}

		Hybrid_Logger::info( "Endpoint: job done. retrun to callback url." );

		$hauth->returnToCallbackUrl();
		self::__die();
	}

	public static function authInit()
	{
		if ( ! modHybrid_Endpoint::$initDone) {
			modHybrid_Endpoint::$initDone = TRUE;

			# Init Hybrid_Auth
			try {
				require_once HYBRID_PATH  . "/Storage.php";
				
				$storage = new Hybrid_Storage(); 

				// Check if Hybrid_Auth session already exist
				if ( ! $storage->config( "CONFIG" ) ) { 
					header( "HTTP/1.0 404 Not Found" );
					self::__die( "You cannot access this page directly 2." );
				}

				Hybrid_Auth::initialize( $storage->config( "CONFIG" ) ); 
			}
			catch ( Exception $e ){
				Hybrid_Logger::error( "Endpoint: Error while trying to init Hybrid_Auth" ); 

				header( "HTTP/1.0 404 Not Found" );
				self::__die( "Oophs. Error!" );
			}
		}
	}
    
    public static function __die($msg = ''){
        @session_write_close();
        die($msg);
    }
}

// modHybrid_Endpoint::process();
$user_profile = array();
if( !empty( $_GET["action"] ) && $_GET["action"] == 'auth' && !empty($_GET["service"]) ) {
  try  {
    $params = array();
    $params['hauth_return_to'] = "SdfsdfsdF";
    $hybridauth = new Hybrid_Auth( $config );
    
    
    $adapter = $hybridauth->authenticate( $_GET["service"], $params);
    $user_profile = $adapter->getUserProfile();
  } catch( Exception $e )  {
    die( "<b>got an error!</b> " . $e->getMessage() ); 
  }
    print '<pre>';
    print_r($user_profile);
}
else{
    modHybrid_Endpoint::process();
}