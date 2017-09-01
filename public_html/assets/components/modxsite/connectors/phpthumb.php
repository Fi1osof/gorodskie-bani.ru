<?php

ini_set("display_errors", 1);

define('MODX_REQP', false);

require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
# require_once MODX_CONNECTORS_PATH.'index.php';

# $_SERVER['HTTP_MODAUTH']= $modx->user->getUserToken($modx->context->get('key'));

return require_once MODX_CONNECTORS_PATH . 'system/phpthumb.php';
