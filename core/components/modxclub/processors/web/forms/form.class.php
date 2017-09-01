<?php
require_once MODX_CORE_PATH.'/components/modxsite/processors/site/web/form.class.php';

class modWebFormsFormProcessor extends modSiteWebFormProcessor{
    
    protected $manager_message_tpl = "messages/forms/default.tpl";
    protected $use_captcha  = true;
    
    
    public function initialize(){
        
        
        
        
        return parent::initialize();
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
            'type' => array(
                'required' => true,
                'error_message' => 'Укажите цель обращения',     
            ),
        );
        
        $type = $this->getProperty('type');
        
        if(in_array($type, array(
            'Техническая оптимизация сайта',
            'Бесплатный аудит веб-сайта',
            'Поддержка веб-сайта',
            'Аудит веб-сайта',
            'Перенос сайта на MODX',
         ))){
            $_fields['site'] = "Укажите сайт";
        }
        
        $fields = array_merge($fields,$_fields);
        
        return $fields;
    }
    
    
}
return 'modWebFormsFormProcessor';