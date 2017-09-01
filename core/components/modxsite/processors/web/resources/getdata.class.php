<?php

require_once dirname(dirname(dirname(__FILE__))) . '/site/web/resources/getdata.class.php';

class modWebResourcesGetdataProcessor extends modSiteWebResourcesGetdataProcessor{
    
    public function initialize(){
        
        $this->setDefaultProperties(array( 
            /*
                Схема ссылки на картинку.  
                - false : Отсутствуе. Будет выдано значение TV-параметра как есть
                - base  : Будет сформировано с учетом УРЛ-а на медиасурс от корня сайта
                - full  : Будет сформирован полный путь, включая http://
                
            */
            'image_url_schema'      => 'base',      
        ));
        
        return parent::initialize();
    }
    
    //
    public function afterIteration(array $list){
        $list = parent::afterIteration($list);
        
        switch($this->getProperty('image_url_schema')){
            case 'base':
                $images_base_url = $this->modx->runSnippet('getSourcePath');
                break;
                
            case 'full':
                $images_base_url = $this->modx->getOption('site_url');
                $images_base_url .= preg_replace("/^\//", "", $this->modx->runSnippet('getSourcePath'));
                break;
                
            default: $images_base_url = '';
        }
        
        foreach($list as & $l){
            $l['image'] = '';
            if(!empty($l['tvs']['image']['value'])){
                $l['image'] = $images_base_url . $l['tvs']['image']['value'];
            }
            else{
                $l['imageDefault'] = $images_base_url . 'products/No-Photo.jpg';
            }
            
            
            $l['gallery'] = array();
            if(
                !empty($l['tvs']['gallery']['value'])
                AND $gallery = json_decode($l['tvs']['gallery']['value'], 1)
            ){
                foreach($gallery as $image){ 
                    $image['image'] = $images_base_url . $image['image'];
                    # $image['image'] = $image['image'];
                    $l['gallery'][] = $image;
                    
                    if(!$l['image']){
                        $l['image'] = $image['image'];
                    }
                }
                
            } 
        }
        
        return $list;
    }
}

return 'modWebResourcesGetdataProcessor';
