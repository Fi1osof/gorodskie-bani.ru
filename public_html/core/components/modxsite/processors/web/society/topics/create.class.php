<?php

/*
    Создание топика.
    Если не указан блог вообще, то создаем личный блог
*/

require_once MODX_CORE_PATH . 'components/modsociety/processors/society/web/topics/create.class.php';

require_once dirname(__FILE__) . '/_validator.class.php';

class modWebSocietyTopicsCreateProcessor extends SocietyTopicCreateProcessor{
    
    
    public function checkPermissions(){
        
        if(!$this->modx->user->id){
            return false;
        }
        
        return parent::checkPermissions();
    }
    
    
    public function initialize(){
        
        $this->setProperties(array(
            "parent" => 309,
            "template"  => 15,
            "tv23"       => $this->modx->hasPermission('society.approve_topics') ? '1' : '',
            "show_in_tree"  => 1,
        ));
        
        return parent::initialize();
    }
    
    
    public function beforeSet(){
        
        
        
        // Если не был указан ни один блог, то добавяем пользовательский блог
        if(!$blogs = $this->getProperty('blogs')){
             
            
            // Пытаемся получить собственный блог
            $data = array(
                "parent"    => 23,
                "createdby" => $this->modx->user->id,
            );
            
            if(!$blogs = $this->getProperty('blogs')){
                // Пытаемся получить собственный блог
                $data = array(
                    "parent"    => 23,
                    "createdby" => $this->modx->user->id,
                    "template"  => 16,
                );
                if(!$blog = $this->modx->getObject("SocietyBlog", $data)){
                    
                    // Если блог не был получен, то создаем новый, если есть права
                    if($this->modx->hasPermission('modxclub.create_own_blog')){
                        
                        $username = $this->modx->user->username;
                        
                        $data = array_merge($data, array(
                            "published" => 1,
                            "class_key" => "SocietyBlog",
                            "pagetitle" => "Блог им. {$username}",
                        ));
                        
                        $blog = $this->modx->newObject("SocietyBlog", $data); 
                        
                        $blog->alias = $blog->cleanAlias($blog->pagetitle);
                        
                    }
                    // Иначе получаем песочницу
                    else{
                        $blog = $this->modx->getObject("SocietyBlog", 637);
                    } 
                    
                    // print_r($blog);
                     
                }
                
                // Устанавливаем связку Блог-Топик
                $TopicBlogs = $this->modx->newObject('SocietyBlogTopic');
                $TopicBlogs->Blog = $blog; 
                $this->object->TopicBlogs = array($TopicBlogs); 
                
            }
        }
        
        
        return parent::beforeSet();
    }
    
    public function beforeSave(){
        $topic = & $this->object;
        $topic->fromArray(array(
            "published" => 1,    
            "publishedon"   => time(),
            "createdby"     => $this->modx->user->id,
        ));
        
        
        // Проверяем наличие публикаций за сегодняшний день.
        if(!$this->modx->hasPermission('modxclub.create_unlimited_topics')){
            $time = strtotime(date('Y-m-d'));
            $q = $this->modx->newQuery($this->classKey);
            $q->where(array(
                "createdby"     => $this->modx->user->id,
                "createdon:>"   => $time,
            ));
            if($this->modx->getCount($this->classKey, $q)){
                return "Вам нельзя публиковать более одного топика в день";
            }
        }
        
        
        // Устанавливаем теги
        if($topic_tags = $this->getProperty('topic_tags', array())){
            $tags = array();
            
            if(!is_array($topic_tags)){
                $topic_tags = array_map('trim', explode(',', $topic_tags));
            }
            
            foreach($topic_tags as & $tag){
                $newTag = $this->modx->newObject('SocietyTopicTag', array(
                    "tag"       => $tag,
                    "active"    => 1,
                ));
                $tags[] = $newTag;
            }
            
            $topic->Tags = $tags;
        }
         
        
        parent::beforeSave();
        
        $validator = new modWebSocietyTopicsValidator($this);
        $ok = $validator->validate();
        if($ok !== true){
            return $ok;
        }
        
        
        /*
            Ниже все изменено
        */
         
        
        
        /*
            Если указан блог компании, то меняем родителя и шаблон
        */
        foreach($topic->TopicBlogs as $TopicBlog){
            
            $blog = $TopicBlog->Blog;
            
            if($blog->template == 27){
                $topic->fromArray(array(
                    "parent"    => $blog->id,
                    "template"  => 28,
                    
                ));
            } 
        }
        
        
        return !$this->hasErrors();
    }
    
    
    public function afterSave(){
        $topic = & $this->object;
        $can_send_notices = $this->modx->hasPermission('modxclub.send_notices');
        $site_name = $this->modx->getOption('site_name');
        $use_delayed_emails = $this->modx->getOption('modsociety.use_delayed_emails', null, false);
        
        // Обновляем псевдоним
        $topic->alias .= " " . $topic->id;
        $topic->save();
        
        $this->modx->cacheManager->refresh();
        
        /*
            Рассылаем уведомления
        */
        if(empty($this->modx->smarty)){
            $this->modx->invokeEvent('OnHandleRequest');
        } 
        
        $this->modx->smarty->assign('topic', $topic->toArray());
        
        
        
        
        // Кому уже отправлялось, чтобы не отправлять повторно
        // Сразу добавляем и того, кто пишет
        $sended_to = array(
            $this->modx->user->id,
        );   
        
        // Не используем этот объект запроса, а только его клоны
        $users_query = $this->modx->newQuery('modUser');
        $users_query->innerJoin('modUserProfile', 'Profile');
        $users_query->where(array(
            "active"    => 1,
            "Profile.blocked"   => 0,
            "id:not in" => $sended_to,
        ));
        $users_query->leftJoin('SocietyNoticeUser', 'Notices');
        $users_query->leftJoin('SocietyNoticeType', 'NoticeType', "NoticeType.id = Notices.notice_id");
        $users_query->where(array(
            "Profile.blockeduntil"    => 0,
            "OR:Profile.blockeduntil:<" => time(),
        ));
        
        
        // Отправляем всем, кто подписан на топики
        if($can_send_notices){
            $sended_to = array_unique($sended_to);
            $q = clone($users_query);
            
            if($sended_to){
                $q->where(array(
                    "id:not in"    => $sended_to,
                ));
            }
            $q->where(array(
                "NoticeType.type"   => "new_topic",
            ));
            
            # if($users = $this->modx->getCollection('modUser', $q)){
                # foreach($users as $user){
                foreach($this->modx->getIterator('modUser', $q) as $user){
                    if($topic->checkPolicy('view', null, $user)){
                        $this->modx->smarty->assign('auth_user_id', $user->id);
                        $message = $this->modx->smarty->fetch('messages/society/new_topic/subscribers.tpl');
                        $subject = "Новый топик на сайте MODX-Клуба";
                        /*
                            Пытаемся записать в отложенную рассылку
                        */
                        if(
                            !$use_delayed_emails
                            OR !$emailmessage = $this->modx->newObject('SocietyEmailMessage', array(
                                "user_id"   => $user->id,
                                "subject"   => $subject,
                                "message"   => $message,
                            ))
                            OR !$emailmessage->save()
                        ){
                            $user->sendEmail($message, array(
                                "subject"   => $subject,
                            ));
                            $this->modx->mail->reset();
                        }
                        
                        $sended_to[] = $user->id;
                    }
                    # else{
                    #     // Если нет права на топик, сразу добавляем в исключения
                    #     $sended_to[] = $user->id;
                    # }
                }
                $this->modx->smarty->assign('auth_user_id', false);
            # }
        }
        
        // 1. Администрации
        $q = $this->modx->newQuery('modUser');
        $q->innerJoin('modUserProfile', 'Profile');
        $q->innerJoin('modUserGroupMember', 'UserGroupMembers');
        $q->where(array(
            "active"    => 1,
            "Profile.blocked"   => 0,
            "UserGroupMembers.user_group"    => 20,
            "id:not in" => $sended_to,
        ));
        
        if($users = $this->modx->getCollection('modUser', $q)){
            $message = $this->modx->smarty->fetch('messages/society/new_topic/administration.tpl');
             
            foreach($users as $user){
                $user->sendEmail($message, array(
                    "subject"   => "Новый топик на сайте {$site_name}",
                ));
                $this->modx->mail->reset();
            }
        }
        
        return parent::afterSave();
    }
    
    public function cleanup(){
        
        # return $this->success('Топик успешно создан', array(
        return $this->success($this->modx->lexicon('topic_post.success'), array(
            "id"    => $this->object->id,
        ));
    }
    
}

return 'modWebSocietyTopicsCreateProcessor';
