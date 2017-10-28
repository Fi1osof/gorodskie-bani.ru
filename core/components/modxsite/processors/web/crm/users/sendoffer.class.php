<?php


require_once __DIR__ . '/object.class.php';


class modWebCrmUsersSendofferProcessor extends modWebCrmUsersObjectProcessor{

    
    public function initialize(){
        
        $this->setDefaultProperties(array(
        ));

        $this->setProperties(array(
        	"offer_date"	=> time(),
            "new_object"   => false,        // Флаг, что это новый объект
            "save_object"   => true,       // Флаг, что объект надо сохранять
        ));

        return parent::initialize();
    }


    public function afterSave(){

    	$object = & $this->object;

    	$sender = $this->modx->user;
    	$senderProfile = $sender->Profile;

    	$site_url = $this->modx->getOption("site_url");
    	$site_name = $this->modx->getOption("site_name");

    	$offer = $this->getProperty("offer");

        if(!$subject = trim($this->getProperty("subject"))){
            $subject = "Коммерческое предложение";
        }

    	$offer = <<<HTML

			{$offer}
			<br />
			<br />
			<hr />
			С уважением, {$senderProfile->fullname}<br />
			Портал <a href="{$site_url}">{$site_name}</a>
HTML;

    	$object->sendEmail($offer, array(
    		"subject"	=> $subject,
    		"sender"	=> $senderProfile->email,
    		"from"	=> $senderProfile->email,
    		"fromName"	=> "{$senderProfile->fullname}. {$site_name}",
    	));


    	return parent::afterSave();

    }
    
}

return 'modWebCrmUsersSendofferProcessor';
