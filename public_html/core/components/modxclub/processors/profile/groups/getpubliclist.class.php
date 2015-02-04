<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of getpubliclist
 *
 * @author Fi1osof
 */
class getpubliclist extends modObjectGetListProcessor{
    public $classKey = 'modUserGroup';
    protected $user_login = null;
    public $defaultSortField = 'rank';


    public function initialize() {
        if(!$this->user_login = $this->getProperty('user_login', false)){
            return $this->failure('Не был получен login пользователя');
        }
        return parent::initialize();
    }
    
    public function outputArray(array $array, $count = false) {
        return $this->success('', $array);
    }



    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->innerJoin('modUserGroupMember', 'UserGroupMembers');
        $c->innerJoin('modUser', 'User', 'User.id=UserGroupMembers.member');
        $c->where(array(
            'parent' => $this->modx->getOption('modxclub.privilegy_group_root'),
            'User.username' => $this->user_login,   
        ));
        return parent::prepareQueryBeforeCount($c);
    }
    
    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->leftJoin('MembergroupTemplate', 'template', "template.group={$this->classKey}.id");
        $c->select(array(
            "{$this->classKey}.*",
            'template.template',
        ));
        //$c->prepare();
        //$this->modx->log(1, $c->toSQL());
        return parent::prepareQueryAfterCount($c);
    }
}
return 'getpubliclist';
?>
