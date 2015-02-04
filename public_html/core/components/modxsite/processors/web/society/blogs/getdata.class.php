<?php

require_once MODX_CORE_PATH . 'components/modsociety/processors/society/web/blogs/getdata.class.php';

class modWebSocietyBlogsGetdataProcessor extends modSocietyWebBlogsGetdataProcessor{
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "blogs"     => array(),         // Массив дополнительных 
            "check_for_post"   => 0,       // Проверка блогов, в которые можно публиковать топики
        ));
        
        return parent::initialize();
    }
    
    public function prepareQueryBeforeCount(xPDOQuery $q){
        $q = parent::prepareQueryBeforeCount($q);
        
        $q->innerJoin('modUser', 'CreatedBy');
        $q->innerJoin('modUserProfile', 'CreatedByProfile', "CreatedBy.id = CreatedByProfile.internalKey");
        
        return $q;
    }
    
    
    public function prepareCountQuery(xPDOQuery & $query){
        $query = parent::prepareCountQuery($query);
        
        /*if(!$this->modx->hasPermission('view_all_blogs')){
            
        }*/
        
        $where = array(
            "template"  => 14,  // Получаем только публичные блоги
        );
        
        $can_view_ids = array();
        
        $check_for_post = $this->getProperty('check_for_post', 0);
        
        foreach($this->modx->getCollection('SocietyBlog', array(
            'class_key' => 'SocietyBlog',
        )) as $blog){
            if(!$blog->checkPolicy('view')){
                continue;
            }
            
            if($can_view_ids && !$blog->checkPolicy('society_topic_resource_create')){
                continue;
            }
            
            
            $can_view_ids[] = $blog->id;
        }
            # print '<pre>';
            # 
            # print_r($_SESSION);
        
        if($can_view_ids){
            
            $where['id:in'] = $can_view_ids;
            
            $where[] = array(
                "OR:createdby:="   => $this->modx->user->id,
            );
            
            if($blogs = $this->getProperty('blogs')){
                $where[] = array(
                    "OR:id:in"   => (array)$blogs,
                );
                 
                $this->modx->log(1,  print_r((array)$blogs, 1));
            }  
            
        }
        else{
            $query->where(array(
                "1 = 2",
            ));
        } 
        
        if($where){
            // $this->modx->log(1,  print_r((array)$where, 1));
            $query->where($where);
        }
        
        
        /*
            if($blogs){
                $query->prepare();
                $this->modx->log(1, $query->toSQL());
            }
        */
        
        return $query;
    }
    
    
    public function setSelection(xPDOQuery $q){
        $q = parent::setSelection($q);
        
        $q->select(array(
            "CreatedBy.username as author",
            "CreatedByProfile.photo as author_avatar",
        ));
        
        return $q;
    }
    
    
    public function afterIteration(array $list){
        $list = parent::afterIteration($list);
        
        $url = $this->getSourcePath($this->modx->getOption('modavatar.default_media_source', null, 15));
        
        foreach($list as & $l){
            if($l['author_avatar']){
                $l['author_avatar'] = $url . $l['author_avatar'];
            }
        }
        
        return $list;
    }
    
}


return 'modWebSocietyBlogsGetdataProcessor';