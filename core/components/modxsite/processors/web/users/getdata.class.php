<?php

/*
    Получаем данные всех пользователей
*/

require_once __DIR__ . '/../../site/web/users/getdata.class.php';

class modWebUsersGetdataProcessor extends modSiteWebUsersGetdataProcessor{
    
    public $classKey = 'modUser';
    
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "format" => "json",
            // "showinactive" => $this->modx->hasPermission("view_inactive_users"),
            // "showblocked" => $this->modx->hasPermission("view_blocked_users"),
            "showinactive" => true,
            "showblocked" => true,
            "ownProfile"   => false,
            "cache"             => true,
            'cache_prefix'      => $this->modx->context->key . "/" . get_class($this) . '/getdata/' . $this->modx->user->id. "/", 
        ));

        if($this->getProperty("ownProfile")){
            $this->setProperty("cache", false);
        }
        
        return parent::initialize();
    }

    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $alias = $c->getAlias();
        
        $where = array(
        );

        if($ids = $this->getProperty("ids")){
            
            if(!is_array($ids)){
                $ids = explode(",", $ids);
            }

            $where["{$alias}.id:in"] = $ids;

        }

        
        if($this->getProperty("ownProfile")){

            $where['id'] = $this->modx->user->id;

        }
        
        // Только представители компаний
        if($this->getProperty("delegatesOnly")){
            $where['delegate'] = "1";
        }
        
        // Только представители компаний
        if($this->getProperty("createdByMe")){
            $where['createdby'] = $this->modx->user->id;
        }


        if($where){
            $c->where($where);
        }

        // $c->prepare();
        // print $c->toSQL();

        return $c;
    }

    public function setSelection(xPDOQuery $c)
    {
        $c = parent::setSelection($c);

        $c->select(array(
            "Profile.photo as image",
        ));

        return $c;
    }

    
    public function afterIteration( array $list){
        $list = parent::afterIteration($list);
        
        $avatars_url = $this->getSourcePath(15);
         
        foreach($list as & $l){
            if(empty($l['image'])){
                $l['image'] = "anonymous.jpg";
            }
            $l['image'] = trim($avatars_url . $l['image'], '/');
        }
        
        return $list;
    }
}


return 'modWebUsersGetdataProcessor';
