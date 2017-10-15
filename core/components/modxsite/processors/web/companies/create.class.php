<?php

/*
    Создание новой компании.
    Так как обязательно при этом надо создать страницу компании, 
    то расширяем процессор создания документа
*/

// require_once MODX_PROCESSORS_PATH . 'resource/create.class.php';

require_once dirname(__FILE__) . '/_validator.class.php';

class modWebCompaniesCreateProcessor extends modObjectCreateProcessor{
    
    public $classKey = 'modCompany';
    
    public $permission = "create_company";
    
    
    public function checkPermissions(){
        
        if(!$this->modx->user->id){
            return false;
        }
        
        return parent::checkPermissions();
    }
    
    
    public function initialize(){
        
        $this->unsetProperty("editedby");
        $this->unsetProperty("editedon");
        $this->unsetProperty("owner");
        $this->unsetProperty("resource_id");
        $this->unsetProperty("blog_id");
        $this->unsetProperty("content");
        
        $this->setProperties(array(
            "name"  => strip_tags(trim($this->getProperty('name'))),
            "address"  => strip_tags(trim($this->getProperty('address'))),
            "website"  => strip_tags(trim($this->getProperty('website'))),
            "email"  => strip_tags(trim($this->getProperty('email'))),
            "phone"  => strip_tags(trim($this->getProperty('phone'))),
            "employees"  => (int)$this->getProperty('employees'),
            "works"  => (int)$this->getProperty('works'),
        ));
        
        $this->setProperties(array(
            "createdby" =>   $this->modx->user->id,
            "createdon" => time(),
        ));
        
        if($foundation_date = $this->getProperty('foundation_date')){
            if(!$foundation_date = strtotime($foundation_date)){
                return "Дата основания должна быть указана в формате yyyy-mm-dd";
            }
            
            // else
            $this->setProperty('foundation_date', $foundation_date);
        }
        
        return parent::initialize();
    }
     
    
    public function beforeSave(){
        
        parent::beforeSave();
        
        $resource = $this->modx->newObject('modResource', array(
            "createdby" =>   $this->getProperty('createdby'),
            "createdon" => $this->getProperty('createdon'),
            "pagetitle" => $this->getProperty('name'),
            "class_key" => "modDocument",
            "isfolder"  => 1,
            "template"  => 21,
            "parent"    => $this->modx->getOption('modxsite.companies_catalog_id'),
            "published" => false,
        ));
        $resource->alias = $resource->cleanAlias($resource->pagetitle);
        $this->object->addOne($resource) ;
        
        $validator = new modWebCompaniesValidator($this);
        $ok = $validator->validate();
        if($ok !== true){
            return $ok;
        }
        
        // Проверяем наличие в базе такой компании
        if($this->modx->getCount($this->classKey, array(
            "name"  => $this->object->name,
        ))){
            return "Такая компания уже имеется";
        }
        
        // Проверяем по сайту
        if($this->object->website && $this->modx->getCount($this->classKey, array(
            "website"  => $this->object->website,
        ))){
            return "Компания с таким вебсайтом уже имеется";
        }
        
        // Проверяем по емейлу
        if($this->object->email && $this->modx->getCount($this->classKey, array(
            "email"  => $this->object->email,
        ))){
            return "Компания с такой почтой уже имеется";
        }
        
        /*print_r($this->object->toArray());
        
        return "Debug";*/
        
        return !$this->hasErrors();
    }
    
    public function afterSave(){
        
        $resource = & $this->object->Resource;
        
        $resource->alias = $resource->alias . "-". $resource->id;
        
        $resource->save();
        
        $this->modx->cacheManager->refresh();
        $this->modx->cacheManager->clearCache();
        
        return parent::afterSave();
    }
}


return 'modWebCompaniesCreateProcessor';

