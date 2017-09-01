<?php
/** @noinspection PhpIncludeInspection */
require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var switchUser $switchUser */
$switchUser = $modx->getService('switchuser', 'switchUser', $modx->getOption('switchuser_core_path', null, $modx->getOption('core_path') . 'components/switchuser/') . 'model/switchuser/');
$modx->lexicon->load('switchuser:default');

// handle request
$corePath = $modx->getOption('switchuser_core_path', null, $modx->getOption('core_path') . 'components/switchuser/');
$path = $modx->getOption('processorsPath', $switchUser->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
	'processors_path' => $path,
	'location' => '',
));