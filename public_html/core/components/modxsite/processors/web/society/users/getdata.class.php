<?php

/*
    Получаем данные всех пользователей
*/

require_once dirname(dirname(dirname(__FILE__))) . '/getdata.class.php';

class modWebSocietyUsersGetdataProcessor extends modWebGetdataProcessor{
    
    public $classKey = 'modUser';
    
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "sort"  => "SocietyProfile.createdon",
            "dir"   => "ASC",
            "showinactive"  => false,
            "showblocked"   => false,
        ));
        
        return parent::initialize();
    }
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $c->innerJoin('modUserProfile', "Profile");
        $c->leftJoin('SocietyUserProfile', "SocietyProfile");
        
        $where = array(
            // "SocietyProfile.id:!=" => null,
        );
        
        if(!$this->getProperty('showinactive')){
            $where['active'] = 1;
        }
        
        if(!$this->getProperty('showblocked')){
            $where['Profile.blocked'] = 0;
            $c->where(array(
                "Profile.blockeduntil"   => 0,
                "OR:Profile.blockeduntil:<" => time(),
            ));
        }
        if($where){
            $c->where($where);
        }
        
        /*
        
        $c->prepare();
        
        print $c->toSQL();
        
        exit;
        
        */
        return $c;
    }
    
    
    public function setSelection(xPDOQuery $c){
        $c = parent::setSelection($c);
        
        $c->select(array(
            "Profile.fullname",
            "Profile.blocked",
            "Profile.blockeduntil",
            "Profile.photo",
            "Profile.email",
            "SocietyProfile.createdon as regdate",
        ));
        
        return $c;
    }
    
    public function afterIteration( array $list){
        $list = parent::afterIteration($list);
        
        $avatars_url = $this->getSourcePath(15);
         
        foreach($list as & $l){
            if(empty($l['photo'])){
                $l['photo'] = "anonymous.jpg";
            }
            $l['photo'] = $avatars_url . $l['photo'];
        }
        
        return $list;
    }
    
}


return 'modWebSocietyUsersGetdataProcessor';
