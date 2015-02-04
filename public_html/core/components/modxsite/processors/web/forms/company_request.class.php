<?php


require_once dirname(dirname(__FILE__)) . '/form.class.php';

class modWebFormsCompanyrequestProcessor extends modWebFormProcessor{
    
    protected $manager_message_tpl = "messages/forms/company_request.tpl";
    
    
    protected function getManagerMailSubject(){
        $site_name = $this->modx->getOption('site_name');
        $subject = "Новая завяка компании на сайте «{$site_name}»";
        return $subject;
    }
    
    
    
    /*
        Example: 
        $fields = array(
            'email' => array(
                'required' => true,
                'error_message' => 'Fill email',     
            ),
        );
    */
    protected function getFields(){
        $fields = array(
            'name' => array(
                'required' => true,
                'error_message' => 'Укажите имя',     
            ),
            'email' => array(
                'required' => true,
                'error_message' => 'Укажите емейл',     
            ),
        );
        return $fields;
    }
    
}


return 'modWebFormsCompanyrequestProcessor';

