<?php

/*
    Создание новой компании.
    Так как обязательно при этом надо создать страницу компании, 
    то расширяем процессор создания документа
*/

// require_once MODX_PROCESSORS_PATH . 'resource/create.class.php';

require_once dirname(__FILE__) . '/_validator.class.php';

require_once __DIR__ . '/object.class.php';

// class modWebCompaniesCreateProcessor extends modObjectCreateProcessor{
class modWebCompaniesCreateProcessor extends modWebCompaniesObjectProcessor{
    
    public $classKey = 'SocietyBlog';
    
    public $permission = "create_company";
    
    
    // public function checkPermissions(){
        
    //     if(!$this->modx->user->id){
    //         return false;
    //     }
        
    //     return parent::checkPermissions();
    // }
    
    
    // function checkPermissions(){

    //     // return $this->modx->hasPermission("updateCompanies") && parent::checkPermissions();

    //     return true;
    // }

    
    public function initialize(){
        
        // if($foundation_date = $this->getProperty('foundation_date')){
        //     if(!$foundation_date = strtotime($foundation_date)){
        //         return "Дата основания должна быть указана в формате yyyy-mm-dd";
        //     }
            
        //     // else
        //     $this->setProperty('foundation_date', $foundation_date);
        // }

        // print_r($this->properties);
        
        $this->unsetProperty("id");
        
        $this->setProperties(array(
            "new_object" => true,
            "save_object" => true,
        ));

        // print_r($this->properties);

        return parent::initialize();
    }


    public function beforeSet(){
        
        
        $this->setProperties(array(
            "name"  => strip_tags(trim($this->getProperty('name'))),
            "address"  => strip_tags(trim($this->getProperty('address'))),
            "website"  => strip_tags(trim($this->getProperty('website'))),
            "email"  => strip_tags(trim($this->getProperty('email'))),
            "phone"  => strip_tags(trim($this->getProperty('phone'))),
            "employees"  => (int)$this->getProperty('employees'),
            "works"  => (int)$this->getProperty('works'),
        ));
        
        // $this->setProperties(array(
        //     // "createdby" =>   $this->modx->user->id,
        //     "createdon" => time(),
        // ));
 

        return parent::beforeSet();
    }
     
    
    public function beforeSave(){
        
        $object = & $this->object;

        $object->fromArray(array(
            "createdon" => time(),
        ));

        // parent::beforeSave();
        
        // $resource = $this->modx->newObject('modResource', array(
        //     "createdby" =>   $this->getProperty('createdby'),
        //     "createdon" => $this->getProperty('createdon'),
        //     "pagetitle" => $this->getProperty('name'),
        //     "class_key" => "modDocument",
        //     "isfolder"  => 1,
        //     "template"  => 21,
        //     "parent"    => $this->modx->getOption('modxsite.companies_catalog_id'),
        //     "published" => false,
        // ));

        // $resource->alias = $resource->cleanAlias($resource->pagetitle);
        // $this->object->addOne($resource) ;
        
        // $validator = new modWebCompaniesValidator($this);
        // $ok = $validator->validate();
        // if($ok !== true){
        //     return $ok;
        // }
        
        // // Проверяем наличие в базе такой компании
        // if($this->modx->getCount($this->classKey, array(
        //     "name"  => $this->object->name,
        // ))){
        //     return "Такая компания уже имеется";
        // }
        
        // // Проверяем по сайту
        // if($this->object->website && $this->modx->getCount($this->classKey, array(
        //     "website"  => $this->object->website,
        // ))){
        //     return "Компания с таким вебсайтом уже имеется";
        // }
        
        // // Проверяем по емейлу
        // if($this->object->email && $this->modx->getCount($this->classKey, array(
        //     "email"  => $this->object->email,
        // ))){
        //     return "Компания с такой почтой уже имеется";
        // }
        
        // /*
        // */
        // print_r($this->object->toArray());
        
        // return "Debug";



        $data = array_merge((array)$this->properties, array(
            "class_key"     => $this->classKey,
            "parent"    => 1524,
            "template"  => 27,
            // "alias"         => preg_replace("/https?:\/\//i", "", trim($object->pagetitle, "/")),
            "alias"         => trim($object->name),
        ));

        // print_r($data);

        $resource = $this->createResource($data);

        if($resource){

            // print_r($resource->toArray());

            $object->fromArray($resource->toArray());
            
            // print_r($object->toArray());
        }

        return parent::beforeSave();
    }
    
    public function afterSave(){
        
        $object = & $this->object;

        $this->setProperty("uri", $object->uri);

        // $resource = & $this->object;
        
        // $resource->alias = $resource->alias . "-". $resource->id;
        
        // $resource->save();
        
        $this->modx->cacheManager->refresh();
        $this->modx->cacheManager->clearCache();
        
        return parent::afterSave();
    }
}


return 'modWebCompaniesCreateProcessor';

