<?php

/* /assets/components/seo/connector.php */

$basePath = dirname(dirname(dirname(dirname(__FILE__))));

// Убираем проверку на право загрузки:
// define('MODX_REQP', false); // работает для всех
// $_REQUEST['ctx'] = 'profnastil'; // работает для контекста в котором домен из запроса

require_once $basePath . '/config.core.php';  
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';  
require_once MODX_CONNECTORS_PATH . 'index.php';

// Обязательно для  авторизации!!!!
// $_SERVER['HTTP_MODAUTH'] = $modx->site_id;

// Выполнение непосредственно запросов
// За запрос отвечает файл /core/model/modxmodconnectorrequest.class.php
// За ответ отвечает файл /core/model/modconnectorresponse.class.php  (он вызывается  где-то в глубине API)

$modx->request->handleRequest( array(  
   'processors_path'   => $modx->getOption( 'core_path' ) . 'components/seo/processors/',  
   'location'          => ''
) );  

return;
	
?>