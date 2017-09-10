<?php

/**
* 
*/

require_once __DIR__ . '/object.class.php';

class modWebCompaniesUpdateProcessor extends modWebCompaniesObjectProcessor{

    public function initialize(){

    	$this->setProperties(array(
    		"new_object" => false,
    		"save_object" => true,
    	));

    	return parent::initialize();
    }

}

return 'modWebCompaniesUpdateProcessor';