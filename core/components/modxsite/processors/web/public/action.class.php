<?php

/*
Процессор, определяющий по запрошенному действию какой процессор выполнять
*/

class modWebPublicActionProcessor extends modProcessor{
    
    protected static $actualClassName;
    
    public static function getInstance(modX &$modx,$className,$properties = array()) {
        
        // Здесь мы имеем возможность переопределить реальный класс процессора
        if(!empty($properties['pub_action']) && !self::$actualClassName){
             
            switch($properties['pub_action']){
                
                case 'topics/votes/create':
                    require dirname(dirname(__FILE__)) . '/society/topics/votes/create.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsVotesCreateProcessor';
                    break; 
                
                case 'topics/comments/votes/create':
                    require dirname(dirname(__FILE__)) . '/society/topics/comments/votes/create.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsCommentsVotesCreateProcessor';
                    break; 
                
                case 'comments/getdata':
                    require dirname(dirname(__FILE__)) . '/society/topics/comments/getdata.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsCommentsGetdataProcessor';
                    break; 
                
                // Голос за заведение
                case 'ratings/company/vote/create':
                    require dirname(dirname(__FILE__)) . '/society/companies/votes/object.class.php';
                    self::$actualClassName = 'modWebSocietyCompaniesVotesObjectProcessor';
                    break; 
                    
                
                case 'registration':
                    require dirname(dirname(__FILE__)) . '/society/users/create.class.php';
                    self::$actualClassName = 'modWebSocietyUsersCreateProcessor';
                    break; 
                    
                
                case 'topic/save':
                    require dirname(dirname(__FILE__)) . '/society/topics/create.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsCreateProcessor';
                    break; 
                
                case 'topic/update':
                    require dirname(dirname(__FILE__)) . '/society/topics/update.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsUpdateProcessor';
                    break; 
                    
                
                case 'topics/comments/save':
                    require dirname(dirname(__FILE__)) . '/society/topics/comments/create.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsCommentsCreateProcessor';
                    break; 
                    
                    
                
                case 'topics/getdata':
                    require dirname(dirname(__FILE__)) . '/society/topics/getdata.class.php';
                    self::$actualClassName = 'modWebSocietyTopicsGetdataProcessor';
                    break; 
                    
                
                case 'cities/getdata':
                    require dirname(dirname(__FILE__)) . '/cities/getdata.class.php';
                    self::$actualClassName = 'modWebCitiesGetdataProcessor';
                    break; 
                    
                
                case 'companies/create':
                    require dirname(dirname(__FILE__)) . '/companies/create.class.php';
                    self::$actualClassName = 'modWebCompaniesCreateProcessor';
                    break; 

                case 'companies/update':
                    require dirname(dirname(__FILE__)) . '/companies/update.class.php';
                    self::$actualClassName = 'modWebCompaniesUpdateProcessor';
                    break; 
                
                case 'companies/getdata':
                    require dirname(dirname(__FILE__)) . '/companies/resources/getdata.class.php';
                    self::$actualClassName = 'modWebCompaniesResourcesGetdataProcessor';
                    break; 
                
                case 'resources/getdata':
                    require dirname(dirname(__FILE__)) . '/resources/getdata.class.php';
                    self::$actualClassName = 'modWebResourcesGetdataProcessor';
                    break; 
                    
                
                case 'forms/company_request':
                    require dirname(dirname(__FILE__)) . '/forms/company_request.class.php';
                    self::$actualClassName = 'modWebFormsCompanyrequestProcessor';
                    break; 
                    
                case 'forms/feedback':
                    require dirname(dirname(__FILE__)) . '/forms/feedback.class.php';
                    self::$actualClassName = 'modWebFormsFeedbackProcessor';
                    break; 
                    
                
                case 'email_messages/send':
                    require dirname(dirname(__FILE__)) . '/society/email_messages/send.class.php';
                    self::$actualClassName = 'modWebSocietyEmailmessagesSendProcessor';
                    break; 
                
                case 'login':
                    require_once dirname(dirname(__FILE__)) . '/society/users/login.class.php';
                    self::$actualClassName = "modWebSocietyUsersLoginProcessor";
                    break;

                case 'logout':
                    require_once dirname(dirname(__FILE__)) . '/users/logout.class.php';
                    self::$actualClassName = "modWebUsersLogoutProcessor";
                    break;

                case 'users/getdata':
                    require __DIR__ . '/../users/getdata.class.php';
                    self::$actualClassName = 'modWebUsersGetdataProcessor';
                    break;


                case 'users/find_user':
                    require dirname(dirname(__FILE__)) . '/users/find_user.class.php';
                    self::$actualClassName = 'modWebUsersFinduserProcessor';
                    break;

                case 'users/get_own_data':
                    require dirname(dirname(__FILE__)) . '/users/own_profile/getdata.class.php';
                    self::$actualClassName = 'modWebUsersOwnprofileGetdataProcessor';
                    break;

                case 'users/activate':
                    require dirname(dirname(__FILE__)) . '/society/users/activate.class.php';
                    self::$actualClassName = 'modWebSocietyUsersActivateProcessor';
                    break;

                case 'password/forgot':

                    require dirname(dirname(__FILE__)) . '/society/users/password/forgot.class.php';
                    self::$actualClassName = 'modWebSocietyUsersPasswordForgotProcessor';
                    break;

                case 'images/upload':

                    require dirname(dirname(__FILE__)) . '/images/upload.class.php';
                    self::$actualClassName = 'modWebImagesUploadProcessor';
                    break;


                /*
                    CRM
                */
                case 'crm/users/create':
                    require dirname(dirname(__FILE__)) . '/crm/users/create.class.php';
                    self::$actualClassName = 'modWebCrmUsersCreateProcessor';
                    break; 

                case 'crm/users/update':

                    require dirname(dirname(__FILE__)) . '/users/update.class.php';
                    self::$actualClassName = 'modWebUsersUpdateProcessor';
                    break;

                case 'crm/users/sendOffer':

                    require dirname(dirname(__FILE__)) . '/crm/users/sendoffer.class.php';
                    self::$actualClassName = 'modWebCrmUsersSendofferProcessor';
                    break;
                /*
                    EOF CRM
                */

                
                default:;
            } 
        }
        
        if(self::$actualClassName){
            $className = self::$actualClassName;
        }

        return parent::getInstance($modx,$className,$properties);
    }
     
    
    public function process(){
        $error = 'Действие не существует или не может быть выполнено';
        $this->modx->log(xPDO::LOG_LEVEL_ERROR, __CLASS__ . " - {$error}");
        $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
        return $this->failure($error);
    }
    
}

return 'modWebPublicActionProcessor';