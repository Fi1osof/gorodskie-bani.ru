<?php

require_once dirname(dirname(dirname(__FILE__))) . '/_validator.class.php';

class modWebSocietyTopicsValidator extends modWebValidator{
    
    
    public function validate(){
        
        $topic = & $this->object;
        $attributes = & $topic->Attributes;
        
        /*foreach( $this->object->TopicBlogs as $o){
            print_r($o->Blog->toArray());
        }
        
        exit;*/
         
        // Проверяем блоги топика
        if(!$this->object->TopicBlogs){
            return "Не был указан ни один блог";
        }
        
        // Иначе проверяем права на блог
        foreach($this->object->TopicBlogs as $TopicBlog){
            
            $blog = $TopicBlog->Blog;
            
            //print_r($TopicBlog->toArray());
            
            if(!$blog instanceof SocietyBlog){
                return "Публиковать топики можно только в блоги";
            }
            
            $ok = $this->checkBlogAccess($blog);
            
            if($ok !== true){
                return $ok;
            }
        }
        
         
        // Проверяем теги
        // Если есть, проверяем на наличие хотя бы одного активного
        $topic_tags = array();
        if($this->object->Tags){
            foreach($this->object->Tags as $tag){
                # print_r($tag->toArray());
                if($tag->active){
                    $topic_tags[] = $tag->tag;
                }
            }
        }
        if(!$topic_tags){
            $error = "Не указан ни один тег";
            $this->addFieldError('topic_tags', $error);
            return $error;
        }
        else{
            // Иначе сохраняем активные теги в топик
            $attributes->topic_tags = implode(",", $topic_tags);
            // print $this->object->topic_tags;
        }
        
        
        // Режем контент
        $content = $topic->content;
        
        $attributes->raw_content = $content;
        
        
        /*
            Раскомментировать в бою
        */
        # $content = str_replace(array(
        #     "<?"
        # ), array(
        #     "&lt;"
        # ), $content);
        
        $content = str_replace('<!--more-->', '<cut>', $content);
        
        /*
            Раскомментировать в бою
        */
        # $content = strip_tags($content, '<strong><composite><composite><model><object><field><code><pre><cut><p><a><h4><h5><h6><img><b><em><i><s><u><hr><blockquote><table><tr><th><td><ul><li><ol>');
        
        
        // Реплейсим переносы
        # $content = preg_replace("/[\r\n]{3,}/", "<br /><br />", $content);
        # $content = preg_replace("/\r/", "<br />", $content);
        # 
        # $content = preg_replace('/<code>(.+?)<\/code>/sim', "<pre class=\"prettyprint\"><code>$1</code></pre>", $content);
        
        $topic->content = $content;
        
        $content_cut = explode("<cut>", $content, 2);
        $short_text = $content_cut[0];
        $attributes->short_text = $short_text;
        
        return parent::validate();
    }
    
    public function checkBlogAccess($blog){
        
        if(!$blog->checkPolicy('society_topic_resource_create')){
            return "У вас нет прав писать в блог {$blog->pagetitle}";
        }
        
        return true;
    }
    
}

return 'modWebSocietyTopicsValidator';