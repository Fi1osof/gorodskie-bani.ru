<?php

//$this->modx->loadClass('папка_polls.папка_request.имяКласса_pollsControllerRequest_{.class.php}', $this->config['modelPath'], true, true);

define('base_dir', $modx->config['core_path'].'components/seo/');
define('model_dir', base_dir.'model/');
require_once base_dir.'controllers/functions.php';
$classes = array('site', 'debug', 'content', 'mysql', 'seo');
foreach($classes as $c){
	$modx->loadClass('seo.'.$c, model_dir, true, true);
}
site::$modx = $modx;
return site::run();