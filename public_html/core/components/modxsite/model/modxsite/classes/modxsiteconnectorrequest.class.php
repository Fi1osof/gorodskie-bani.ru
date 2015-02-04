<?php

require_once MODX_CORE_PATH . 'model/modx/modconnectorrequest.class.php';

class modxsiteConnectorRequest extends modConnectorRequest{
     
    
    // Проверка запроса
    public function sanitizeRequest() {
        
        /*print '<pre>';
        print_r($_POST);*/
        
        $this->clear_post_data($_GET);
        $_REQUEST = array_merge($_REQUEST, $_GET);
        
        $this->clear_post_data($_POST);
        $_REQUEST = array_merge($_REQUEST, $_POST);
        
        //print_r($_POST);
        
        // Иначе вырезает сущности зачем-то
        unset($this->modx->sanitizePatterns['entities']);
         
        //print_r($_POST);
        
        return parent::sanitizeRequest();
        
    }
    
    
    function clear_post_data(&$data){
        if(is_array($data)){
            foreach($data as $r_name => &$r_val){
                $this->clear_post_data($r_val);
                continue;
            }
        }
        else{
            $data =  str_replace(array('[', ']', '%5B', '%5D'), array('&#91;', '&#93;', '&#91;','&#93;',), $data);
        }
    }
    
}