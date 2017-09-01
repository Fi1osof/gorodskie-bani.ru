<?php
if(IN_MANAGER_MODE != "true" && IN_PARSER_MODE != "true") return false;
class Debug{
 	private $dir;
	function Debug(){
		//error_reporting(false);
		$this->dir = dirname(dirname(dirname(__FILE__))).'/logs/';
		if(!$this->checkDir()){
			return false;
		}
		return true;
	}
	private function checkDir(){
		$dir = $this->dir;
		if(file_exists($dir)){
			if(is_dir($dir)){
				if(is_writable($dir)) return true;
				else{
					if(function_exists('chmod') && (chmod($dir,0777))) return true;
					else return false;
				}
			}
			else return false;
		}
		else{
			if(!mkdir($dir)) return false;
			else if(is_writable($dir)){
					$fo = fopen($dir.'.htaccess',"w+");
						fwrite($fo,"deny from all");
					$fo?fclose($fo):"";
					return true;
				}
				else{
					if(function_exists('chmod') && (chmod($dir,0777))) return true;
					else return false;
				}
		}
		return true;
	}
	public function addLog($msg, $file, $line, $type='error'){
		$f = $this->dir."log_$type.".date('Ymd_H').'.log';
		$data = "\n\n
/***********Время ".date('H-i-s')."*******************/\n\t
	Сообщение: $msg \n\t
	Файл: $file \n\t
	Линия: $line \n
	Пользователь: ".USER."\n
/*****************************************************/
		\n\n";
		if(!$fo = fopen($f, "a+")) return false;
		fwrite($fo, $data);
		$fo?fclose($fo):"";
		return true;
	}
}
?>