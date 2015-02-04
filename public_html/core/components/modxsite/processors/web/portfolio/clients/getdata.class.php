<?php

require_once dirname(dirname(dirname(__FILE__))) . '/resources/getdata.class.php';

class modWebPortfolioClientsGetdataProcessor extends modWebResourcesGetdataProcessor{
    
    
    public function initialize(){
        
        $this->setProperties(array(
            "parent"    => 267,
        ));
        
        return parent::initialize();
    }
    
    
    /*protected function getCountQuery(xPDOQuery & $query){
        $query = parent::getCountQuery($query);
         
        
        return $query;
    }*/
    
}

return 'modWebPortfolioClientsGetdataProcessor';
