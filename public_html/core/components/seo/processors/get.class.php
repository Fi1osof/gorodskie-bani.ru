<?php

// return require_once dirname(dirname(__FILE__)).'/controllers/index.php';
// return json_encode(array(message => 'Файл не найден'));

class modGetProcessor extends modObjectGetlistProcessor{
    
    public $classKey = 'Visitor';
    
    
    public function initialize(){
        
        $this->setDefaultProperties(array(
            "sort"  => "{$this->classKey}.id",
            "dir"   => "DESC",
            "limit" => 500,
        ));
        
        return parent::initialize();
    }
    
    public function prepareQueryBeforeCount(xPDOQuery $c){
        $c = parent::prepareQueryBeforeCount($c);
        
        $c->leftJoin('modUser', 'user', "user.id = {$this->classKey}.user_id");
        $c->leftJoin('modUserProfile', 'user_profile', "user.id = user_profile.internalKey");
        
        $where = array();
        
        if($date = $this->getProperty('date')){
            $where[] = "DATE_FORMAT({$this->classKey}.date, '%Y-%m-%d') = '{$date}'";
        }
        
        if($where){
            $c->where($where);
        } 
        
        $c->select(array(
            "{$this->classKey}.*",
            "user.username",
            "user_profile.fullname",
        ));
        
        return $c;
    }
    
}

return 'modGetProcessor';

