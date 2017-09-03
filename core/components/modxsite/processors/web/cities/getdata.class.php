<?php

require_once dirname(dirname(__FILE__)) . '/getdata.class.php';
 

class modWebCitiesGetdataProcessor extends modWebGetdataProcessor{
    
    public $classKey = 'modCity';
    
    public function initialize(){
        
        $this->setProperties(array(
            "sort"  => "rank DESC, city",
            "dir"   => "ASC",
            "limit" => 0,
        ));
        
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
         
        
        $where = array();
        
        if($country_id = (int)$this->getProperty('country_id')){
            $where['country_id'] = $country_id;
        }
        
        if($where){
            $c->where($where);
        }
        
        return $c;
    }

    
    public function outputArray(array $array, $count = false) {
        
        if($this->getProperty('output_type') == 'json'){
            
            $_array = array();
            foreach($array as $a){
                $_array[] = $a;
            }
            $array = $_array;
        }
        
        return parent::outputArray($array, $count);
    }
    
}

return 'modWebCitiesGetdataProcessor';
