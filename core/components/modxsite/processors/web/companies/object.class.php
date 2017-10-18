<?php

/**
* 
*/

require_once __DIR__ . '/../object.class.php';

abstract class modWebCompaniesObjectProcessor extends modWebObjectProcessor{
	
    // function checkPermissions(){

    //     return $this->modx->hasPermission("updateCompanies") && parent::checkPermissions();
    // }


    public function initialize(){

        $this->unsetProperty("editedby");
        $this->unsetProperty("editedon");
        $this->unsetProperty("owner");
        $this->unsetProperty("resource_id");
        $this->unsetProperty("blog_id");
        $this->unsetProperty("content");

    	$props = array(
    		"id" => (int)$this->getProperty("id"),
    		"lat" => (float)$this->getProperty("lat"),
    		"lng" => (float)$this->getProperty("lng"),
    		"new_object" => $this->getProperty("new_object"),
    		"save_object" => $this->getProperty("save_object"),
    	);

    	$this->properties = $props;

    	
        // print_r($this->properties);

    	return parent::initialize();
    }


    public function beforeSet(){

        
    	$name = $this->getProperty("name");
    	
    	if(isset($name)){
    		$this->setDefaultProperties(array(
    			"pagetitle"	=> trim($name),
    		));
    	}
    	
        // print_r($this->properties);

    	return parent::beforeSet();
    }


	public function beforeSave(){
		
    	// print_r($this->properties);


		$object = & $this->object;

		if($object->isNew()){
			// return "Нельзя создавать объекты";

			// if(!$object->address){
			// 	$this->addFieldError("address", "Необходимо указать адрес заведения");
			// }

			// $object->fromArray(array(
			// 	"address"	=> $this->getProperty("address", ""),
			// 	"work_time"	=> $this->getProperty("work_time", ""),
			// ));

		}

		$tvs = array(
			"address",
			"metro",
			"phones",
			"site",
			"work_time",
			"prices",
			"coords",
		);

		foreach($tvs as $tv_name){

			$value = $this->getProperty($tv_name);

			if($object->isNew()){
				$value = $value ? $value : "";
			}

			if(isset($value)){
				$object->set($tv_name, trim($value));
			}

			// $object->fromArray(array(
			// 	"address"	=> $object->isNew() ? trim($this->getProperty($tv_name, "")) : (),
			// ));
		}

		// print_r($object->toArray());

		if(isset($object->address) && empty($object->address)){
			$this->addFieldError("address", "Необходимо указать адрес заведения");
		}

		if(isset($object->work_time) && empty($object->work_time)){
			$this->addFieldError("work_time", "Необходимо указать время работы");
		}

		if(isset($object->prices) && empty($object->prices)){
			$this->addFieldError("prices", "Необходимо указать цены");
		}

		if(isset($object->coords) && empty($object->coords)){
			$this->addFieldError("coords", "Необходимо указать объект на карте");
		}

		// if(!$object->address){
		// 	$this->addFieldError("address", "Необходимо указать адрес заведения");
		// }


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


		$address = $object->address;

		if(isset($address)){
			$object->setTVValue(14, $address);
		}


		$metro = $object->metro;

		if(isset($metro)){
			$object->setTVValue(22, $metro);
		}


		$phones = $object->phones;

		if(isset($phones)){
			$object->setTVValue(16, $phones);
		}


		$site = $object->site;

		if(isset($site)){
			$object->setTVValue(13, $site);
		}


		$work_time = $object->work_time;

		if(isset($work_time)){
			$object->setTVValue(19, $work_time);
		}


		$prices = $object->prices;

		if(isset($prices)){
			$object->setTVValue(20, $prices);
		}


		return parent::afterSave();
	}

	public function failure($msg = "", $object = array()){

		if(!$msg){
			$msg = "Проверьте правильность заполнения формы";
		}

		return parent::failure($msg, $object);

	}

}

return 'modWebCompaniesObjectProcessor';