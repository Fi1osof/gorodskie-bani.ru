<?php

/*
 * Проверяем права на просмотр контактных данных
 */

class ModxclubCanViewContactsProcessor extends modProcessor{
    public function process(){
        $can = false;
        //   print "dfd";
        if($this->modx->hasPermission('modxclub.view_profile')){
            $can = true;
        }
        // Если нет права, проверяем страницу на принадлежность текущему пользователю
        else if($this->modx->user->isAuthenticated()){
            if(preg_match('/^\/profile\/(.+?)(\/|$)/', $_SERVER['REQUEST_URI'], $match)
            and $username = $match[1]
            and $username ==  $this->modx->user->username
            ){
                $can = true;
            }
        }
        // print $this->modx->resourceIdentifier;
        // print_r($match);
        if(!$can){
            return $this->failure('Нет прав на просмотр контактных данных');
        }
        return $this->success();
    }
}

return 'ModxclubCanViewContactsProcessor';