<?php

require_once __DIR__ . '/../site/web/object.class.php';

abstract class modWebObjectProcessor extends modSiteWebObjectProcessor{

    function checkPermissions(){

        return $this->modx->user->id && parent::checkPermissions();
    }

    public function initialize() {


        $request_body = file_get_contents('php://input');

        if($request_body AND $data = json_decode($request_body, 1)){
            $this->setProperties($data);
        }

        return parent::initialize();
    }


    public function afterSave(){


        $this->modx->cacheManager->clearCache();

        return parent::afterSave();
    }


    
    public function cleanup() {

        $object = & $this->object;

        foreach($object->_fields as $name => $value){


            if(!array_key_exists($name, $this->properties)){
            
        
                unset($object->_fields[$name]);

            }

        }

        return parent::cleanup();
    }
}

return 'modWebObjectProcessor';

// abstract class modXObjectProcessor extends modObjectUpdateProcessor{
    
//     public $logSaveAction = false;
    
    
    
//     public function fireBeforeSaveEvent() {
//         $preventSave = false;
//         if (!empty($this->beforeSaveEvent)) {
//             /** @var boolean|array $OnBeforeFormSave */
//             $OnBeforeFormSave = $this->modx->invokeEvent($this->beforeSaveEvent,array(
//                 'mode'  => $this->object->isNew() ? modSystemEvent::MODE_NEW : modSystemEvent::MODE_UPD,
//                 'data' => $this->object->toArray(),
//                 $this->primaryKeyField => $this->object->get($this->primaryKeyField),
//                 $this->object => &$this->object,
//                 $this->objectType => &$this->object,
//             ));
//             if (is_array($OnBeforeFormSave)) {
//                 $preventSave = false;
//                 foreach ($OnBeforeFormSave as $msg) {
//                     if (!empty($msg)) {
//                         $preventSave .= $msg."\n";
//                     }
//                 }
//             } else {
//                 $preventSave = $OnBeforeFormSave;
//             }
//         }
//         return $preventSave;
//     }
    
    
//     # public function beforeSave() { 
//     #     print_r($this->object->toArray());
//     #     return 'Debug';
//     # }
    
    
//     public function fireAfterSaveEvent() {
//         if (!empty($this->afterSaveEvent)) {
//             $this->modx->invokeEvent($this->afterSaveEvent,array(
//                 'mode' => $this->object->isNew() ? modSystemEvent::MODE_NEW : modSystemEvent::MODE_UPD,
//                 $this->primaryKeyField => $this->object->get($this->primaryKeyField),
//                 $this->object => &$this->object,
//                 $this->objectType => &$this->object,
//             ));
//         }
//     }
    
    
//     public function logManagerAction() {
//         if($this->logSaveAction){
//             return parent::logManagerAction();
//         }
//         return;
//     } 
    
// }
