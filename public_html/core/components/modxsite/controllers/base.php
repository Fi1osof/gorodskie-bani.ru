<?php
// ini_set('display_errors', 1);
        
# if($modx->hasPermission('frame')){
# 
# }
        
return require __DIR__ . '/bani_base.php';    
        
$properties = $modx->resource->getOne('Template')->getProperties();


if ($modx->resource->cacheable != '1') {
    $modx->smarty->caching = false;
}

if(!empty($properties['phptemplates.non-cached'])){
    $modx->smarty->compile_check = false;
    $modx->smarty->force_compile = true;
}
        
if(!empty($properties['view'])){
    $path = $properties['view'];
}
else{
    $path = 'view';
}

$class = '';
$arr = explode('/', $path);

foreach($arr as $a){
    $l = mb_convert_case(mb_substr($a, 0, 1, 'utf-8'), MB_CASE_UPPER, 'utf-8');
    $class .= $l;
    $class .= mb_substr($a, 1, null, 'utf-8');
}

/*print $class;
exit;*/
require_once dirname(__FILE__) . '/view/'.$path.'.class.php';
$view = new $class($modx, $properties);
return $view ->process();

/*
require_once dirname(__FILE__) . '/view/view.class.php';
$view = new View($modx);
return $view ->process();
*/

/*
$properties = $modx->resource->getOne('Template')->getProperties();

if(!empty($properties['tpl'])){
    $tpl = $properties['tpl'];
}
else{
    $tpl = 'index.tpl';
}

if ($modx->resource->cacheable != '1') {
    $modx->smarty->caching = false;
}

return $modx->smarty->fetch("tpl/{$tpl}");
*/