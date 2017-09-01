<?php
$_REQUEST['ctx']  = 'web';
define('MODX_REQP',false);

return;

require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$_SERVER['HTTP_MODAUTH']= $modx->user->getUserToken($modx->context->get('key'));

/* handle request */
if(!$path = $modx->getOption('modxclub.core_path', null)){
    $path = $modx->getOption('core_path', null) .'components/modxclub/';
}

$path .= 'processors/web/'; 

/*print $path;

if($modx->hasPermission('frames')){
    print "fsdf";
    exit;
}*/

$modx->request->handleRequest(array(
    'action' => $_REQUEST['action'],
    'processors_path' => $path,
    'location' => isset($location) ? $location : '',
));