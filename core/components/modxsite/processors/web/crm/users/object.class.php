<?php


require_once __DIR__ . '/../../users/object.class.php';


class modWebCrmUsersObjectProcessor extends modWebUsersObjectProcessor{

    
    public function checkPermissions(){
        
        // if(!$this->modx->user->id){
        //     return false;
        // }
        
        return $this->modx->hasPermission("crm_users_update") && parent::checkPermissions();
    }
    
}

return 'modWebCrmUsersObjectProcessor';
