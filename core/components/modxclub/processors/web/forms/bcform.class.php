<?php
require_once MODX_CORE_PATH.'/components/modxsite/processors/site/web/form.class.php';

class modWebFormsFormProcessor extends modSiteWebFormProcessor{
    
    protected $manager_message_tpl = "messages/forms/multiselectfields.tpl";
    protected $use_captcha  = false;

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
        
        $fields = array_merge($fields,$_fields);
        
        return $fields;
    }
    
    
}
return 'modWebFormsFormProcessor';