<?php

/**
 * The base class for switchUser.
 */
class switchUser {
	/* @var modX $modx */
	public $modx;


	/**
	 * @param modX $modx
	 * @param array $config
	 */
	function __construct(modX &$modx, array $config = array(), array $pubconfig = array()) {
		$this->modx =& $modx;

		$corePath = $this->modx->getOption('switchuser_core_path', $config, $this->modx->getOption('core_path') . 'components/switchuser/');
		$assetsUrl = $this->modx->getOption('switchuser_assets_url', $config, $this->modx->getOption('assets_url') . 'components/switchuser/');
		$connectorUrl = $assetsUrl . 'connector.php';

		$this->config = array_merge(array(
			'assetsUrl' => $assetsUrl,
			'cssUrl' => $assetsUrl . 'css/',
			'jsUrl' => $assetsUrl . 'js/',
			'connectorUrl' => $connectorUrl,
			'corePath' => $corePath,
			'processorsPath' => $corePath . 'processors/'
		), $config);

		$this->pubconfig = array_merge(array(
			'connectorUrl' => $connectorUrl,
		));

		$this->modx->lexicon->load('switchuser:default');
	}

}