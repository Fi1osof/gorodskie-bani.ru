<?
class content extends site{
	//Переменная шаблона
	static private $template = '';
	// Стили
	// Переменные по умолчанию
	static private $defaults = array(
		body => '',
		title => 'Управление сайтом',
		css => array(),
		js => array(),
		headers => '',
		JSCODE => '',
		base => ''
	);
	// Временные переменные
	static private $temp = array();
	// Функция инициализации
	public  static function init($params = array()){
		self::$defaults['base'] = parent::$module_base_url;
		// Обнуляем переменные
		self::clearVars();
		foreach($params as $el => $v){
			self::$temp[$el] = $v;
		}
		self::addCSS(self::$temp['css']);
		self::addJS(self::$temp['js']);
		return;
	}
	// Функция перезагрузки данных
	static public function addBody($code){
		self::$temp['body'] .= $code;
	}
	// Добавляем стили
	public static function addCSS($css){
		if(is_array($css)){
			foreach($css  as $val){
				self::addStyle($val);
			}
		}
		else{
			self::addStyle($css);
		}
	}
	static private function addStyle($css){
		if(!$css  || in_array($css, self::$temp['css'])){
			return false;
		}
		self::$temp['css'][] = $css;
		return;
	}
	static private function getCSS(){
		//print_r(parent::$modx->config);
		foreach(self::$temp['css'] as $style){
			self::$temp['headers'] .= '<link rel="stylesheet" type="text/css" href="'.parent::$rb_base_url.$style.'" />'."\n";
		}
		return;
	}
	// Добавляем Скрипты
	public static function addJS($js ){
		if(is_array($js)){
			foreach($js  as $j){
				self::addScript($j);
			}
		}
		else{
			self::addScript($js);
		}
	}
	static public function addScript($js,  $code = false){
		if(!$js){
			return false;
		}
		if($code) {
			self::$temp['JSCODE'] .= '<script type="text/javascript" >'.$js.'</script>'."\n" ;
		}
		else{
			self::$temp['JSCODE'] .= '<script type="text/javascript" src="'.parent::$rb_base_url.$js.'"></script>'."\n" ;
		}
		return;
	}
	// Получаем конечный код и обнуляем все исходные переменные
	static public  function getPage(){
		// Получаем конечный  код
		$page = self::fetchTpl();
		// Обнуляем основные переменные
		self::clearVars();
		return $page;
	}
	private static function fetchTpl(){
		self::getCSS();
		$body  = self::$temp['body'];
		$title  = self::$temp['title'];
		$headers = self::$temp['headers'];
		$headers .= self::$temp['JSCODE'];
		$base = self::$temp['base'];
		$tpl = <<<DDDD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>{$title}</title>
<base href="{$base}" />
{$headers}
</head>
<body>
{$body}
</body>
</html>
DDDD;
		return $tpl;
	}
	//  Обнуляем все исходные переменные
	private static function clearVars(){
		self::$temp = self::$defaults;
		return;
	}
}
?>