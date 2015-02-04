<?php
require_once MODX_CORE_PATH.'/components/modxsite/processors/site/web/form.class.php';

class modWebFormsBriefProcessor extends modSiteWebFormProcessor{
    
    protected $manager_message_tpl = "messages/forms/default.tpl";
    protected $use_captcha  = false;
    
    
    public function initialize(){
        
        return parent::initialize();
    }
    
    protected function getManagerMailSubject(){
        $site_name = $this->modx->getOption('site_name');
        $subject = "Бриф на разработку с сайта «{$site_name}»";
        return $subject;
    }
    
    protected function getFields(){
        
        $fields = parent::getFields();
        
        $_fields = array(
            'email' => array(
                'required' => true,
                'error_message' => 'Укажите емейл',     
            ),
            'name' => array(
                'required' => true,
                'error_message' => 'Укажите имя',     
            ),
        );
        
        $fields = array_merge($fields,$_fields);
        
        return $fields;
    }
    
    
}
return 'modWebFormsBriefProcessor';