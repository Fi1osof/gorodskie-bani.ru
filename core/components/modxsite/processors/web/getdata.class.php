<?php

require_once dirname(dirname(__FILE__)) . '/site/web/getdata.class.php';

class modWebGetdataProcessor extends modSiteWebGetdataProcessor{
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
    		"format" => "json",
    		"count"	=> 0,
        ));
        
        return parent::initialize();
    }
}

return 'modWebGetdataProcessor';
