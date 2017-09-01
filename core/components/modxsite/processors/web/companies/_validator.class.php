<?php

require_once dirname(dirname(__FILE__)) . '/_validator.class.php';

class modWebCompaniesValidator extends modWebValidator{
    
    
    public function validate(){
        
        $company = & $this->object;
        $resource = & $company->Resource; 
        
        if(!$company->name){
            $this->addFieldError("name", "Не было указано название компании");
        }
        
        if(!$country = $company->Country){
            $this->addFieldError("country_id", "Не была указана страна");
        }
        
        if(!$city = $company->City){
            $this->addFieldError("city_id", "Не был указан город");
        }
        
        if(
            $foundation_date = $company->foundation_date
            AND $foundation_date > time()
        ){
            $this->addFieldError("foundation_date", "Дата основания не может быть позднее текущей даты");
        }
        
        if($website = $company->website){
            $company->website = preg_replace('/^.*?\:\/\/|\/+$/', '', $website);
        }
        
        if(
            $country && $city
            AND $city->country_id != $country->id
        ){
            return "Указаные страна и город не совпадают";
        }
        
        if(!$resource->CreatedBy){
            return "У документа отсутствует автор";
        }
        
        return parent::validate();
    }
    
}

return 'modWebCompaniesValidator';
