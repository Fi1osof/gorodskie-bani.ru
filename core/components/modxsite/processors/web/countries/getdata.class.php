<?php

require_once dirname(dirname(__FILE__)) . '/getdata.class.php';
 

class modWebCountriesGetdataProcessor extends modWebGetdataProcessor{
    
    public $classKey = 'modCountry';
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "sort"  => "rank",
            "dir"   => "DESC",
        ));
        
        return parent::initialize();
    }
    
}

return 'modWebCountriesGetdataProcessor';
