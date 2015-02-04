<?php

if(!function_exists('getVar')){
	function getVar($el, $type = 'p'){
		switch($type){
			case 'p':
				$val = addslashes($_POST[$el]);
				break;
			case 'g' :
				$val = addslashes($_GET[$el]);
				break;
			case 'r':
				$val = addslashes($_REQUEST[$el]);
				break;
			default:
				return false;
		}
		return $val;
	}
}