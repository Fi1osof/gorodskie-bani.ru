<?
class site{
	static public $modx;
	static $base_url = '';// Базовый УРЛ модуля
	static $rb_base_url = '';// Базовый УРЛ модуля
	static $module_url = '';// Базовый УРЛ модуля
	static $module_base_url = '';// Базовый УРЛ модуля
	static public $debug;
	static public $db;
	static public $module;
	static public $action;
	// Функция, выполняемая по умолчанию
	public static function run(){
		self::$debug = new Debug();
		self::$db = new MySQL();
		self::$module = getVar('mod', 'r');
		!self::$module ? self::$module = 'seo' : "";
		// Ставим по умолчанию статистику
		self::$action = getVar('act', 'r');
		//self::$base_url = self::modx->config['base_url'].'modules';
		self::$base_url = self::$modx->config['site_url'] ;
		self::$rb_base_url = self::$modx->config['site_url'].self::$modx->config['rb_base_url'];
		self::$module_base_url = self::$base_url.'manager/' ;
		self::$module_url = self::$module_base_url."index.php?a=".$_GET['a']."&id=".$_GET['id'];
		// Список подключаемых модулей
		$modules = array(
			'seo'
		);
		// Если передан параметр модуля
		if(self::$module){
			// Проверяем наличие модуля
			if(in_array(self::$module, $modules)){
				eval('$result = '.self::$module.'::run();');
				return $result;
			}
			else{
				// Выводим ошибку
				print self::print_err('Модуль не установлен');
				return false;
			}
		}
		else{
			content::init();
			content::addBody( '<a href="'.self::$module_url.'&mod=seo">Модуль оптимизации</a>');
			return content::getPage();
		}
		return;
	}
	public static function print_err($msg){
		return '<p style="color: red; font-size:110%; font-weight:bold;">'.$msg.'</p>';
	}
}
?>