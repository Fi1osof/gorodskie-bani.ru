<?php

require_once MODX_CORE_PATH . 'components/modsociety/processors/society/web/topics/getdata.class.php';

class modWebSocietyTopicsGetdataProcessor extends modSocietyWebTopicsGetdataProcessor{
    
    
    public function initialize(){

        $request_body = file_get_contents('php://input');

        if($request_body AND $data = json_decode($request_body, 1)){
            $this->setProperties($data);
        }
        
        foreach($this->properties as $field => & $value){

            if(!is_scalar($value)){
                continue;
            }

            $v = (string)$value;

            if($v === "null"){
                $value = null;
            }
            else if($v === "true"){
                $value = true;
            }
            else if($v === "false"){
                $value = false;
            }
            else if($v === "NaN"){
                unset($this->properties[$field]);
            }
            else if($v === "undefined"){
                unset($this->properties[$field]);
            }
        }
        
        
        $this->setDefaultProperties(array(
            "showunpublished"   => $this->modx->hasPermission('view_unpublished_topics'),
            "approved"          => false,       // Показывать только все подряд
            "format"        => "json",
            "cache"             => true,
            'cache_prefix'      => $this->modx->context->key . "/" . get_class($this) . '/getdata/' . $this->modx->user->id. "/", 
        ));
        
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $q){
        $q = parent::prepareQueryBeforeCount($q);
        
        $q->innerJoin('modResource', 'Parent');
        
        $q->innerJoin('SocietyBlogTopic', 'bt', "bt.topicid = {$this->classKey}.id");
         
        // По типу заведения
        if($facility_type = (int)$this->getProperty('facility_type')){
            $q->innerJoin("modTemplateVarResource", "facility_type", "facility_type.contentid = Parent.id AND facility_type.tmplvarid = 25 AND facility_type.value = {$facility_type}");
        }
        
        return $q;
    }
    
    
    public function prepareCountQuery(xPDOQuery & $query){
        $query = parent::prepareCountQuery($query);
        
        $where = array(
            //"template"  => 14,  // Получаем только публичные блоги
        );
        
        // Получаем все блоги, к которым есть доступ на чтение
        /*$q = $this->modx->newQuery('SocietyBlog');
        $q->innerJoin('SocietyBlogTopic', 'BlogTopics');
        $q->where(array(
            "BlogTopics.topicid"    => $this->modx->resource->id,
        ));*/
        
        
        // Только одобренные
        if($this->getProperty('approved')){
            $query->innerJoin('modTemplateVarResource', "tv_approved", "tv_approved.tmplvarid = 24 AND tv_approved.contentid = {$this->classKey}.id AND tv_approved.value = '1'");
        }
        
        $can_view_ids = array();
        
        foreach($this->modx->getCollection('SocietyBlog', array(
            'class_key' => 'SocietyBlog',
        )) as $blog){
            // print "<br />$blog->id";
            if($blog->checkPolicy('view')){
                $can_view_ids[] = $blog->id;
            }
        }
        
        $where['bt.blogid:in'] = $can_view_ids;
        
        // Поиск по тегу
        if($tag = trim($this->getProperty('tag'))){
            $query->innerJoin('SocietyTopicTag', "Tags");
            $where['Tags.tag'] = $tag;
        }
        
        if($where){
            $query->where($where);
        }
        
        return $query;
    }
    
    
    public function setSelection(xPDOQuery $q){
        $q = parent::setSelection($q);
        
        $q->innerJoin('modUserProfile', 'CreatedByProfile', "CreatedBy.id = CreatedByProfile.internalKey");
        $q->innerJoin('SocietyTopicAttributes', 'Attributes');
        # $q->innerJoin('SocietyBlogTopic', 'bt', "bt.topicid = {$this->classKey}.id");
        $q->innerJoin('modResource', 'blog', "blog.id = bt.blogid");
        
        $q->select(array(
            "CreatedBy.username as author",
            "CreatedByProfile.fullname as author_fullname",
            "CreatedByProfile.photo as author_avatar",
            "Attributes.short_text",
            "Attributes.topic_tags",
            "blog.id as blog_id",
            "blog.pagetitle as blog_pagetitle",
            "blog.uri as blog_uri",
        ));
        
        /*$s = $q->prepare();
        
        $s->execute();
        
        print_r($s->errorInfo());
        
        exit;*/
        
        return $q;
    }
    
    
    public function afterIteration(array $list){
        $list = parent::afterIteration($list);
        
        $url = $this->getSourcePath($this->modx->getOption('modavatar.default_media_source', null, 15));
        
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
            if($l['author_avatar']){
                $l['author_avatar'] = $url . $l['author_avatar'];
            }
             
            $l['gallery'] = array();
            if(
                !empty($l['tvs']['gallery']['value'])
                AND $gallery = json_decode($l['tvs']['gallery']['value'], 1)
                AND is_array($gallery)
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


// return 'modWebSocietyTopicsGetdataProcessor';