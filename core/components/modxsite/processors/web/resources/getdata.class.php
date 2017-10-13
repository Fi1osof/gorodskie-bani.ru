<?php

require_once dirname(dirname(dirname(__FILE__))) . '/site/web/resources/getdata.class.php';

class modWebResourcesGetdataProcessor extends modSiteWebResourcesGetdataProcessor{
    
    public function initialize(){
        

        foreach($this->properties as $name => & $value){

            if(is_scalar($value)){

                switch((string)$value){

                    case 'true':

                        $value = true;

                        break;

                    case 'false':

                        $value = false;

                        break;

                    case '0':

                        $value = 0;

                        break;

                    case 'null':

                        $value = null;

                        break;

                    case 'undefined':

                        unset($this->properties[$name]);

                        break;
                }
            }

        }

        $this->setDefaultProperties(array( 
            /*
                Схема ссылки на картинку.  
                - false : Отсутствуе. Будет выдано значение TV-параметра как есть
                - base  : Будет сформировано с учетом УРЛ-а на медиасурс от корня сайта
                - full  : Будет сформирован полный путь, включая http://
                
            */
            'image_url_schema'      => 'base',   
            "format"    => "json",
            "cache"             => true,
            // 'cache_prefix'      => $this->modx->context->key . '/resources/getdata/' . $this->modx->user->id. "/",   
            'cache_prefix'      => $this->modx->context->key . "/" . get_class($this) . '/getdata/' . $this->modx->user->id. "/",  
        ));
        
        // $this->modx->log(1, print_r($this->properties, 1), "FILE");

        return parent::initialize();
    }



    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $alias = $c->getAlias();
        
        $where = array(
        );

        
        if($template = (int)$this->getProperty("template")){
            $where['template'] = $template;
        }
        
        if($excludeTemplates = $this->getProperty("excludeTemplates")){

            if(!is_array($excludeTemplates)){
                $excludeTemplates = explode(",", $excludeTemplates);
            }

            // $this->modx->log(1, print_r($excludeTemplates, 1), "FILE");

            $where['template:not in'] = $excludeTemplates;
        }

        $c->where($where);

        return $c;
    }
    

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


            if(!empty($l['tvs']['ya_coords']['value'])){
                $l['coords'] = array_map('trim', explode(",", $l['tvs']['ya_coords']['value']));
            }

        }
        
        return $list;
    }
}

return 'modWebResourcesGetdataProcessor';
