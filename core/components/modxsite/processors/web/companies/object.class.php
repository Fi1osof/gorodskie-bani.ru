<?php

/**
* 
*/

require_once __DIR__ . '/../object.class.php';

abstract class modWebCompaniesObjectProcessor extends modWebObjectProcessor{
	
    // function checkPermissions(){

    //     return $this->modx->hasPermission("updateCompanies") && parent::checkPermissions();
    // }

    function checkPermissions(){

        // return $this->modx->hasPermission("updateCompanies") && parent::checkPermissions();

        return true;
    }


    public function initialize(){

        $this->unsetProperty("class_key");
        $this->unsetProperty("template");
        $this->unsetProperty("context_key");
        $this->unsetProperty("deletedby");
        $this->unsetProperty("deletedon");
        $this->unsetProperty("createdby");
        $this->unsetProperty("createdon");
        $this->unsetProperty("editedby");
        $this->unsetProperty("editedon");
        $this->unsetProperty("owner");
        $this->unsetProperty("resource_id");
        $this->unsetProperty("blog_id");
        $this->unsetProperty("content");

    	$props = array(
    		"id" => (int)$this->getProperty("id"),
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


		$object = & $this->object;
		
    	$this->modx->log(1, print_r($this->properties, 1), "FILE");
    	$this->modx->log(1, print_r($this->modx->user->toArray(), 1), "FILE");

		// print_r($object->toArray());

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
			// "coords",
			"lat",
			"lng",
			"image",
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

		if(isset($object->name) && empty($object->name)){
			$this->addFieldError("name", "Необходимо указать название заведения");
		}

		if(isset($object->address) && empty($object->address)){
			$this->addFieldError("address", "Необходимо указать адрес заведения");
		}

		if(isset($object->work_time) && empty($object->work_time)){
			$this->addFieldError("work_time", "Необходимо указать время работы");
		}

		if(isset($object->prices) && empty($object->prices)){
			$this->addFieldError("prices", "Необходимо указать цены");
		}

		// if(isset($object->coords) && empty($object->coords)){
		// 	$this->addFieldError("coords", "Необходимо указать объект на карте");
		// }

		if(isset($object->lat) && empty($object->lat)){
			$this->addFieldError("coords", "Необходимо указать объект на карте");
		}

		if(isset($object->lng) && empty($object->lng)){
			$this->addFieldError("coords", "Необходимо указать объект на карте");
		}

		if(isset($object->image) && empty($object->image)){
			$this->addFieldError("image", "Необходимо загрузить основное фото");
		}

		// if(!$object->address){
		// 	$this->addFieldError("address", "Необходимо указать адрес заведения");
		// }

		// return "Debug";

		if(!$this->modx->hasPermission("SUDO") && !$this->hasErrors()){
				
			$this->addFieldError("user_id", $this->modx->user->id);


			if(!$object->createdby){

				if($object->isNew()){

					return "Необходимо авторизоваться";

				}
				else{
					return "Не указан владелец";
				}

			}

			if(!$this->modx->user->id){
				$this->addFieldError("error_code", "UNAUTHORIZED");
				return "Вы не атворизованы. Пожалуйста, авторизуйтесь.";
			}

			else if($object->createdby != $this->modx->user->id){
				$this->addFieldError("error_code", "NOT_OWNER");
				return "Вы не можете сохранить изменения в чужой компании. Если это ваша компания, пожалуйста, свяжитесь с нами по почте info@gorodskie-bani.ru";
			}

			if($object->isNew()){

				if($this->modx->getCount("modResource", array(
					"class_key"	=> $this->classKey,
					"createdby"	=> $this->modx->user->id,
				))){
					return "Вы не можете создать более одного заведения. Чтобы иметь эту возможность, свяжитесь с нами по почте info@gorodskie-bani.ru";
				}

			}

		}


		// print_r($object->gallery);

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


		$image = $object->image;

		if(isset($image)){
			$object->setTVValue(3, preg_replace('/^\/?assets\/images\//', '', $image));
		}

		$gallery = $object->gallery;

		if(isset($gallery)){

			// $tv = (array)$object->getTVValue(23);

			$migx = array();

			foreach($gallery as $item){
				$image = preg_replace('/^\/?assets\/images\//', '', $item['image']);

				if(!$image){
					continue;
				}

				// {"MIGX_id":"2","title":"","image":"companies\/1275-sokolinaya-gora\/1 (2).jpg","description":""}

				$migx[] = array(
					"MIGX_id" => count($migx) + 1,
					"title" => "",
					"image" => $image,
					"description" => "",
				);
			}

			$object->setTVValue(23, json_encode($migx));

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