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
                    
                
                case 'cities/getdata':
                    require dirname(dirname(__FILE__)) . '/cities/getdata.class.php';
                    self::$actualClassName = 'modWebCitiesGetdataProcessor';
                    break; 
                    
                
                case 'companies/create':
                    require dirname(dirname(__FILE__)) . '/companies/create.class.php';
                    self::$actualClassName = 'modWebCompaniesCreateProcessor';
                    break; 
                    
                
                case 'forms/company_request':
                    require dirname(dirname(__FILE__)) . '/forms/company_request.class.php';
                    self::$actualClassName = 'modWebFormsCompanyrequestProcessor';
                    break; 
                    
                
                case 'email_messages/send':
                    require dirname(dirname(__FILE__)) . '/society/email_messages/send.class.php';
                    self::$actualClassName = 'modWebSocietyEmailmessagesSendProcessor';
                    break; 
                
                case 'login':
                    require_once dirname(dirname(__FILE__)) . '/society/users/login.class.php';
                    self::$actualClassName = "modWebSocietyUsersLoginProcessor";
                    break;
                    
                
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