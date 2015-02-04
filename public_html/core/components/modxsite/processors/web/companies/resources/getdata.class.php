<?php

/*
    Получаем страницы компаний.
    У одной компании может быть только одна страница
*/

require_once dirname(dirname(dirname(__FILE__))) . '/resources/getdata.class.php';

class modWebCompaniesResourcesGetdataProcessor extends modWebResourcesGetdataProcessor{
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $c->innerJoin('modResource', 'City', "City.id = {$this->classKey}.parent");
        
        # $c->innerJoin('modCompany', 'Company');
        
        $c->where(array(
            "template"  => 27,
        ));
        
        return $c;
    }
    
    public function setSelection(xPDOQuery $c){
        $c = parent::setSelection($c); 
         
        $c->select(array(
            "City.id as city_id",
            "City.pagetitle as city",
            "City.uri as city_uri",
        ));
        
        return $c;
    }
    
    # public function setSelection(xPDOQuery $c){
    #     $c = parent::setSelection($c);
    #     
    #     $c->innerJoin('modCountry', "Country", "Country.id = Company.country_id");
    #     $c->innerJoin('modCity', "City", "City.id = Company.city_id");
    #     
    #     $c->select(array(
    #         "Country.country",
    #         "City.city",
    #     ));
    #     
    #     $columns = array();
    #     $fields = $this->modx->getFields('modCompany');
    #     
    #     foreach($fields as $t => $v){
    #         $columns[] = "Company.{$t} as company_{$t}";
    #     }
    #      
    #     $c->select($columns);
    #     
    #     return $c;
    # }
}

return 'modWebCompaniesResourcesGetdataProcessor';
