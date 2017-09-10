<?php

/**
* 
*/

require_once __DIR__ . '/../object.class.php';

abstract class modWebCompaniesObjectProcessor extends modWebObjectProcessor{
	
    function checkPermissions(){

        return $this->modx->hasPermission("updateCompanies") && parent::checkPermissions();
    }

    public function initialize(){

    	$props = array(
    		"id" => (int)$this->getProperty("id"),
    		"lat" => (float)$this->getProperty("lat"),
    		"lng" => (float)$this->getProperty("lng"),
    		"new_object" => $this->getProperty("new_object"),
    		"save_object" => $this->getProperty("save_object"),
    	);

    	$this->properties = $props;

    	return parent::initialize();
    }

	public function beforeSave(){

		$object = & $this->object;

		if($object->isNew()){
			return "Нельзя создавать объекты";
		}

		// print_r($object->toArray());

		// return "Debug";
		return parent::beforeSave();
	}

	public function afterSave(){

		$object = & $this->object;

		if(
			$lat = $this->getProperty("lat")
			AND $lng = $this->getProperty("lng")
		){
			$object->setTVValue(27, implode(",", array($lng, $lat)));
		}

		return parent::afterSave();
	}

}

return 'modWebCompaniesObjectProcessor';