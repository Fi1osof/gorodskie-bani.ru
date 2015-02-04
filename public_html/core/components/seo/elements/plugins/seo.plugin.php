<?php
// PageStatus

if($modx->context->key == 'mgr'){
    return;
}

switch($modx->event->name){
	case 'OnPageNotFound':
		$modx->setOption('pageStatus', 404);
		break;
	case 'OnPageUnauthorized':
		$modx->setOption('pageStatus', 403);
		break;
	case 'OnWebPagePrerender':
        
        if(!function_exists('get_ip')){
            function get_ip(){
                if(!empty($_SERVER['HTTP_X_REAL_IP'])){
                    $ip = $_SERVER['HTTP_X_REAL_IP'];
                }
                else if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
                    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                }
                else{
                    $ip = $_SERVER['REMOTE_ADDR'];
                }
                return $ip;
            }
        }
        
        
        if(!$modx->checkSiteStatus()) $modx->setOption('pageStatus', 503);
		 
		// Проверяем кукисы
		if(empty($_COOKIE['y'])){
			$cookie = md5(microtime());
			setcookie('y', $cookie , mktime(0,0,0,1,1, (date('Y') + 10)));
		}
        else{
            $cookie = $_COOKIE['y'];
        } 
        
        if($visitor = $modx->newObject('Visitor', array(
            "date"  => time(),
            "url"   => $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'],
            "referer"   => $_SERVER['HTTP_REFERER'],
            "userAgent" => $_SERVER['HTTP_USER_AGENT'],
            "user_id"   => $modx->user->id ? $modx->user->id : null,
            "ip"        => get_ip(),
            "status"    => $modx->getOption('pageStatus', null, 200),
            "cookie"    => $cookie,
        ))){
            $visitor->save();
        }

		break;
	default: !$modx->pageStatus ? $modx->pageStatus = 200 : "";
}
////////////////////////////////