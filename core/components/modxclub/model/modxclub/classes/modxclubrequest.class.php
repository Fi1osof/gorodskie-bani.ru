<?php

class modxclubRequest extends modRequest{
    
    public function handleRequest() {
        $this->loadErrorHandler();

        $this->beforeSanitizeRequest();
        
        $this->sanitizeRequest();
        $this->modx->invokeEvent('OnHandleRequest');
        if (!$this->modx->checkSiteStatus()) {
            header('HTTP/1.1 503 Service Unavailable');
            if (!$this->modx->getOption('site_unavailable_page',null,1)) {
                $this->modx->resource = $this->modx->newObject('modDocument');
                $this->modx->resource->template = 0;
                $this->modx->resource->content = $this->modx->getOption('site_unavailable_message');
            } else {
                $this->modx->resourceMethod = "id";
                $this->modx->resourceIdentifier = $this->modx->getOption('site_unavailable_page',null,1);
            }
        } else {
            $this->checkPublishStatus();
            $this->modx->resourceMethod = $this->getResourceMethod();
            $this->modx->resourceIdentifier = $this->getResourceIdentifier($this->modx->resourceMethod);
            if ($this->modx->resourceMethod == 'id' && $this->modx->getOption('friendly_urls', null, false) && !$this->modx->getOption('request_method_strict', null, false)) {
                $uri = array_search($this->modx->resourceIdentifier, $this->modx->aliasMap);
                if (!empty($uri)) {
                    if ($this->modx->resourceIdentifier == $this->modx->getOption('site_start', null, 1)) {
                        $url = $this->modx->getOption('site_url', null, MODX_SITE_URL);
                    } else {
                        $url = $this->modx->getOption('site_url', null, MODX_SITE_URL) . $uri;
                    }
                    $this->modx->sendRedirect($url, array('responseCode' => 'HTTP/1.1 301 Moved Permanently'));
                }
            }
        }
        if (empty ($this->modx->resourceMethod)) {
            $this->modx->resourceMethod = "id";
        }
        if ($this->modx->resourceMethod == "alias") {
            $this->modx->resourceIdentifier = $this->_cleanResourceIdentifier($this->modx->resourceIdentifier);
        }
        
        $this->beforeRequest();
        
        if ($this->modx->resourceMethod == "alias") {
            if (isset ($this->modx->aliasMap[$this->modx->resourceIdentifier])) {
                $this->modx->resourceIdentifier = $this->modx->aliasMap[$this->modx->resourceIdentifier];
                $this->modx->resourceMethod = 'id';
            } else {
                $this->modx->sendErrorPage();
            }
        }
        
        
        $this->modx->beforeRequest();
        $this->modx->invokeEvent("OnWebPageInit");

        if (!is_object($this->modx->resource)) {
            if (!$this->modx->resource = $this->getResource($this->modx->resourceMethod, $this->modx->resourceIdentifier)) {
                $this->modx->sendErrorPage();
                return true;
            }
        }

        return $this->prepareResponse();
    }
    
    protected function beforeSanitizeRequest(){
        
        if(!preg_match('/^(\/ajax\/|\/blog\/|\/topic\/)/', $_SERVER['REQUEST_URI'])){
            return false;
        }
        $this->modx->setOption('allow_tags_in_post', true);
    }
    
    
    protected function beforeRequest(){
        switch($this->modx->resourceMethod){
            case 'alias':
                /*
                * Провеяем, если запрос на пользователя и нет прав, то шлем
                */
                /*if(strpos($this->modx->resourceIdentifier, 'profile/')===0){
                    return $this->checkViewProfilePagePolicy();
                }*/
                /*if(preg_match('/^profile\/|\/users(\/|$)/', $this->modx->resourceIdentifier)){
                    $this->checkViewProfilePagePolicy();
                }*/
                break;
            default:;
        }
        
    }
    
    protected function sendError(){
        $this->modx->sendUnauthorizedPage();
    }
    
    
/*    protected function checkViewProfilePagePolicy(){
        // Проверяем право просматривать профили
        if(!$this->modx->hasPermission('modxclub.view_profile')){
            // Если нет права, проверяем страницу на принадлежность текущему пользователю
            if($this->modx->user->isAuthenticated()){
                if(preg_match('/^profile\/(.+?)(\/|$)/', $this->modx->resourceIdentifier, $match)
                   and $username = $match[1]
                   and $username ==  $this->modx->user->username
                ){
                    return true;
                }
            }
            return $this->sendError();
        }
    }*/
    
    // Проверка запроса
    /*public function sanitizeRequest() {
        
        return parent::sanitizeRequest();
    }*/
    
}