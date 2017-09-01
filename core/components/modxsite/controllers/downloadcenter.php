<?php
require_once dirname(__FILE__).'/inc/init.php';

$content = '';

$c = $modx->newQuery('modResource', array(
    'parent'    => $resource->id,
    'deleted'   => 0,
    'hidemenu'  => 0,
    'published' => 1,
));
$c->sortby('menuindex', 'DESC');
$docs = $modx->getCollection('modResource', $c);

foreach($docs as $doc){
    $smarty->assign('document', $doc->toArray());
    $content .= $smarty->fetch('downloadcenter/list/row.tpl');
}

$smarty->assign('content', $content);

$resource->content = $smarty->fetch('downloadcenter/index.tpl');
return $modx->runSnippet('modLivestreet.run', array(
    'request_uri' => '/modx/'
));
// [[!Downloadcenter.Section]]