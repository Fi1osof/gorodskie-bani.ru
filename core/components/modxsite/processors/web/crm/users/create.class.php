<?php

require_once __DIR__. '/../../society/users/create.class.php';


class modWebCrmUsersCreateProcessor extends modWebSocietyUsersCreateProcessor{
    
    public $permission = 'CRM';

    
    public function initialize(){
        
        $this->setDefaultProperties(array(
        ));

        $this->setProperties(array(
            "passwordnotifymethod"  => "no",
            "passwordgenmethod"     => "g",
	        "createdby" 			=> $this->modx->user->id,
	        'active'                => false,
	        "auto_auth"             => false,   // Автоматическая авторизация пользователя
	        "delegate"              => "1",
        ));

        parent::initialize();


         
        // Отправка компредов
        // if($this->getProperty("isOffer")){

        //     // if($this->modx->hasPermission("sendOffers")){

        //         $this->setProperties(array(
        //             "createdby" => $this->modx->user->id,
        //             'active'                => false,
        //             "auto_auth"             => false,   // Автоматическая авторизация пользователя
        //             "delegate"              => "1",
        //             "mail_template"         => "messages/users/registration_offer.tpl",
        //         ));

        //     // }
        //     // else{
        //     //     $this->unsetProperty("isOffer");
        //     // }

        // }

        return true;
    }

}


return 'modWebCrmUsersCreateProcessor';