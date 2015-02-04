<?php

require_once MODX_CORE_PATH . 'components/modsociety/processors/society/web/topics/getdata.class.php';

class modWebSocietyTopicsGetdataProcessor extends modSocietyWebTopicsGetdataProcessor{
    
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "showunpublished"   => $this->modx->hasPermission('view_unpublished_topics'),
        ));
        
        return parent::initialize();
    }
    
    
    public function prepareQueryBeforeCount(xPDOQuery $q){
        $q = parent::prepareQueryBeforeCount($q);
        
        //$q->innerJoin('modUser', 'CreatedBy');
        
        $q->innerJoin('SocietyBlogTopic', 'bt', "bt.topicid = {$this->classKey}.id");
        
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
        
        foreach($list as & $l){
            if($l['author_avatar']){
                $l['author_avatar'] = $url . $l['author_avatar'];
            }
        }
        
        return $list;
    }
    
}


// return 'modWebSocietyTopicsGetdataProcessor';