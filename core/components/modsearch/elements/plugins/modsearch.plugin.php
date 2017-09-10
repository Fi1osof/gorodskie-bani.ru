<?php
switch($modx->event->name){
    
    case 'OnDocFormSave':
        
        if(!empty($object) AND $object instanceof modResource AND $object->id){
            /*
                Пересоздаем поисковые индексы
            */
            if($searcher = $modx->getService('modSearch', 'modSearch')){
                $searcher->createIndex($object);
            }
        }
        
        break;
}