<?php

/*
    Получаем страницы компаний.
    У одной компании может быть только одна страница
*/

# require_once dirname(dirname(dirname(__FILE__))) . '/resources/getdata.class.php';
require_once dirname(dirname(dirname(__FILE__))) . '/society/blogs/getdata.class.php';

# class modWebCompaniesResourcesGetdataProcessor extends modWebResourcesGetdataProcessor{
class modWebCompaniesResourcesGetdataProcessor extends modWebSocietyBlogsGetdataProcessor{
    
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $alias = $c->getAlias();
        
        $c->innerJoin('modResource', 'City', "City.id = {$alias}.parent");
        
        # $c->innerJoin('modCompany', 'Company');
        
        // По типу заведения
        if($facility_type = (int)$this->getProperty('facility_type')){
            $c->innerJoin("modTemplateVarResource", "facility_type", "facility_type.contentid = {$alias}.id AND facility_type.tmplvarid = 25 AND facility_type.value = {$facility_type}");
        }
        
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
