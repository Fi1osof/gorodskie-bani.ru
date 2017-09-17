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
            "showinactive" => $this->modx->hasPermission("view_inactive_users"),
            "showblocked" => $this->modx->hasPermission("view_blocked_users"),
        ));
        
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

        if($where){
            $c->where($where);
        }

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
