<?php
class MySQL{
	private $prefix;
	private $db;
	private $tables;
	private $result;
	private $conn;
	function MySQL(){
		global $modx;
		//error_reporting(false);
		$this->db = $modx->db;
		$this->debug = site::$debug;
		$this->t_prefix = $this->db->config['table_prefix'];
		// $this->prefix = $this->t_prefix.'_engine_';	// Префикс таблиц
		$this->prefix = $this->t_prefix ;	// Префикс таблиц
		// Все таблицы по теме
		$this->tbl_firms = $this->getTableName('firms');				// Таблица с фирмами
		$this->tbl_firms_hist = $this->getTableName('firm_history');	// История фирм
		$this->tbl_firms_users = $this->getTableName('firms_users');	// Связка фирма-пользователь
		$this->tbl_user_hist = $this->getTableName('users_hist');	// История пользователей
		$this->tbl_orders = $this->getTableName('orders');				// Заявки на пропуск
		$this->tbl_orders_history = $this->getTableName('orders_history');	// История заявок
		$this->tbl_weekend_orders = $this->getTableName('weekend_orders');				// Заявки на пропуск на выходные
		$this->tbl_weekend_orders_history = $this->getTableName('weekend_orders_history');	// История заявок на пропуск на выходные
		$this->stbl_web_users = $this->getModxTableName('web_users');	// Системная таблица пользователей
		$this->stbl_web_user_attrs = $this->getModxTableName('web_user_attributes');	// Системная таблица атрибутов
		$this->stbl_web_groups = $this->getModxTableName('web_groups');	// Системная таблица групп пользователей
		$this->stbl_webgroup_names = $this->getModxTableName('webgroup_names');	// Системная таблица имен групп пользователей
		$this->tbl_engine_messages = $this->getTableName('messages');				// Внутренние сообщения
		$this->tbl_msg_attributes = $this->getTableName('msg_attributes');				// Внутренние сообщения
		$this->tbl_actions_history = $this->getTableName('actions_history');			// Статистика пользования программой
		$this->tbl_visitors = $this->getTableName('visitors');			//  Посетители
	}
	//  Connect
	private function connect($host='', $user='', $pass='', $db=''){
		!$host ? $host 	= $this->db->config['host'] : "";
		!$user? $user 	= $this->db->config['user'] : "";
		!$pass ? $pass 	= $this->db->config['pass'] : "";
		!$db ? $db 		= $this->db->config['dbase'] : "";
		if(!$this->conn || !is_resource($this->conn)){
			if(!$this->conn = mysql_connect($host, $user, $pass)){
				return false;
			}
			if(!mysql_select_db($db) ){
				return false;
			}
		}
		return $this->conn;
	}
	// Выполнение запроса
	public function query($sql, $file, $line){
		if(!$this->conn) $this->connect();
		if(!$this->result =  mysql_query($sql, $this->conn)){
			$this->debug->addLog("Не удалось выполнить запрос.
			\n\t Запрос: \"$sql\"
			", $file, $line, 'DB');
			return false;
		}
		//print_r($this->db);
		return $this->result;
	}
	// Запрос с возвратом массива результата
	public function select($sql, $file, $line){
		if(!$this->result = $this->query($sql, $file, $line)){
			return false;
		}
		$array = $this->fetchArray();
		//print_r($array);
		return (is_array($array)?$array:true);
	}
	// Набиваем результат в массив
	public function fetchArray(){
		if(!$this->result || !is_resource($this->result)) return false;
		while($row = mysql_fetch_array($this->result, MYSQL_ASSOC)){
			$array[] = $row;
		}
		return $array;
	}
	// Получаем полное имя таблицы
	function getTableName($table){
		//if(array_key_exists($table,$this->tables)) return $this->db->config['dbase'].".`".$this->prefix."$table`";
		//else return false;
		return "`".$this->prefix.$table."`";
	}
	// Получаем полное имя системной таблицы движка
	function getModxTableName($table){
		//if(array_key_exists($table,$this->tables)) return $this->db->config['dbase'].".`".$this->prefix."$table`";
		//else return false;
		return "`".$this->t_prefix.$table."`";
	}
	// Подсчет извлеченных строк
	public function countSelectedRows(){
		if(!$this->result) return false;
		$this->selectedRows = mysql_num_rows($this->result);
		return $this->selectedRows;
	}
	// Проверяем установлены ли нужные таблицы
	public function checkTablesExists(){
		foreach($this->tables as $table => $description){
			$sql = "SHOW TABLES FROM ".$this->db->config['dbase']." LIKE '".$this->prefix.$table."';";
			$this->query($sql, __FILE__, __LINE__);
			if(($this->countSelectedRows()) != 1 ) return false ;
		}
		return 'true';
	}
	/* Функции с транзакциями.  Если тип базы не InnoDB, будет игнорироваться */
	public function startTransaction(){
		$this->query('START TRANSACTION;', __FILE__, __LINE__);
		return;
	}
	public function rollback(){
		$this->query('ROLLBACK;', __FILE__, __LINE__);
		return;
	}
	public function commit(){
		$this->query('COMMIT;', __FILE__, __LINE__);
		return;
	}
	// Последний вставленный автоинкриментированный ключ
	public function getInsertId(){
		return $this->db->getInsertId();
	}
	/*************************************************/
}

?>