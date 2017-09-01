<?
class seo extends site{
	static public function run(){
		$functions = array(
			'getStatistic'	// Получаем статистику
		);
		/// Если есть действие
		if($action = parent::$action){
			if( in_array($action, $functions)){
				return self::$action();
			}
			else{
				print 'Access denied';
				return false;
			}
		}
		// Если нет действия, вызываем функцию по умолчанию
		else{
			//return 'asdasdasd';
			//return self::default__();
			//return self::content::getPage();
			return self::getPanel();
		}
	}
 	// Получаем код панели
 	static private function getPanel(){
		$code = '<div  id="statisticsPanel"></div>';
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/prototypes.js"></script>'."\n";
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/seo.js"></script>'."\n";
		$code .='<script type="text/javascript">seo.module_url="'.parent::$modx->config['site_url'].'"</script>'."\n";
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/face.js"></script>'."\n";
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/statistics.js"></script>'."\n";
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/messages.js"></script>'."\n";
		$code .='<script type="text/javascript" src="/assets/components/seo/files/js/debug.js"></script>'."\n";
		return $code;
	}
	// Получаем статистику
	static private function getStatistic(){
		global $modx;
		$err = '';
		if(!$date = getVar('date', 'r')) $date = date('Y-m-d');
		// print $date;
		$resp=array();
		/*
			Что меня интересует:
			1) реферальный сайт
			2) реферальный запрос
			3) целевая страница
			4) поисковая система
			5) поисковый запрос
			6) номер страницы поисковой системы
			7) ip зашедшего
			8) UserAgent
			9) Дата и время визита
		*/

		$sql = "SELECT
		m.`vstr_id`,
		m.`date`,
		m.`url`  ,
	  	m.`referer`
		,m.`userAgent`,
		m.`ip`,
		m.`status`,
		m.`cookie`
	FROM ".parent::$db->tbl_visitors." m
	WHERE
 --  ip != '78.24.4.34'
--  and referer like '%yandex%'
--   and referer like '%google%'
-- and date > NOW() - interval 48 hour
  date_format(date, '%Y-%m-%d') = '{$date}'
 --  and `vstr_id` = 33914
order by  vstr_id desc
--   limit  50
;";
		if(!$result = parent::$db->select($sql, __FILE__, __LINE__)){
			$err = 'Не удалось выполнить запрос';
		}
		else{
			if(is_array($result)){
				foreach($result as $el => $val){
					$referer = urldecode($result[$el]['referer']);
					// Если в запросе присутствуют символи  кодировки CP-1251, то перекодируем
					if(preg_match('/\%[FE][FE0-9]/i', $result[$el]['referer'], $match )){
					 	//print_r($match);
						$referer = mb_convert_encoding(	$referer, 'utf-8', 'windows-1251');
					}
					/*print "<br /><br />";
					print $referer;*/
					// print "<br />". $referer;
					//continue;
					$referer = str_replace('&amp;', '&',$referer);		// Реферальная ссылка
					$referer =  str_replace(array('"', '<'), array('\"', '&lt;'), $referer) ;
					$url = urldecode($result[$el]['url']);				// Целевая страница
					$url =  str_replace(array('"', '<'), array('\"', '&lt;'), $url) ;
					$searcher = '';										// Поисковая система
					$searchword = '';									// Поисковый запрос
					$searchpage = '';									// Страница результата
					// Определяем сайт, с которого пришли
					preg_match('/^https?\:\/\/(.+?)(\/.*)/', $referer, $ref_arr);
					$ref_host=$ref_arr[1];
					$ref_request=$ref_arr[2];
					/*********************************************/
					/* Ищем поисковые системы 					 */
					// Яндекс
					if(preg_match('/^(|.*\.)(yandex|ya)\./', $ref_host)){
						/*$ref_request  = mb_convert_encoding( $ref_request , 'utf-8' , 'windows-1251');
						$referer  = mb_convert_encoding( $referer , 'utf-8' , 'windows-1251');*/
						$searcher = $ref_host;
						// Определяем запрос
						preg_match('/(\?|\&)text\=([^\&]*)/',  $ref_request, $match);
						$searchword = $match[2];
						// Определяем страницу
						if(preg_match('/(\?|\&)p\=([0-9]+)/',  $ref_request, $match)){
							$searchpage = 	$match[2]+1;
						}
						else{
							$searchpage = 1;
						}
					}
					// Гугль
					elseif(preg_match('/^(|.*\.)(google)\./', $ref_host)){
						if(!preg_match('/otvety/',$ref_host )){
							$searcher = $ref_host;
							$start = false;
							$num = false;
							// Определяем запрос
							preg_match('/(\?|\&)q\=([^\&]*)/',  $ref_request, $match);
								$searchword = $match[2];
								// Определяем страницу
								if(preg_match('/(\?|\&)start\=([0-9]+)/',  $ref_request, $match)){
									$start = 	$match[2];
									// Если указано сколько выводит
									if(preg_match('/(\?|\&)num\=([0-9]+)/',  $ref_request, $match)){
										$num = 	$match[2];
									}
									else{
										$num = 10;
									}
									$searchpage = ($start / $num) + 1;
								}
								else{
									$searchpage = 1;
								}
							}
							//return;
					}
					// Rambler
					elseif(preg_match('/^(|.*\.)(rambler)\./', $ref_host)){
						$searcher = $ref_host;
						// Определяем запрос
						preg_match('/(\?|\&)query\=([^\&]*)/',  $ref_request, $match);
						$searchword = $match[2];
						// Определяем страницу
						if(preg_match('/(\?|\&)page\=([0-9]+)/',  $ref_request, $match)){
							$searchpage = $match[2];
						}
						else{
							$searchpage = 1;
						}
					}
					// Nigma
					elseif(preg_match('/^(|.*\.)(nigma)\./', $ref_host)){
						$searcher = $ref_host;
						// Определяем запрос
						preg_match('/(\?|\&)s\=([^\&]*)/',  $ref_request, $match);
						$searchword = $match[2];
						// Определяем страницу
						if(preg_match('/(\?|\&)startpos\=([0-9]+)/',  $ref_request, $match)){
							$searchpage = 	$match[2];
						}
						else{
							$searchpage = 1;
						}
					}
					// Mail.ru
					elseif(preg_match('/^(|.*\.)(mail)\./', $ref_host)){
							$searcher = $ref_host;
							$start = false;
							$num = false;
							// Определяем запрос
							preg_match('/(\?|\&)q\=([^\&]*)/',  $ref_request, $match);
								$searchword = $match[2];
								// Определяем страницу
								if(preg_match('/(\?|\&)sf\=([0-9]+)/',  $ref_request, $match)){
									$start = 	$match[2];
									// Если указано сколько выводит
									if(preg_match('/(\?|\&)num\=([0-9]+)/',  $ref_request, $match)){
										$num = 	$match[2];
									}
									else{
										$num = 10;
									}
									$searchpage = ($start / $num) + 1;
								}
								else{
									$searchpage = 1;
								}
					}
					// start.vhod
					elseif(preg_match('/^(|.*\.)start.vhod\./', $ref_host)){
						$searcher = $ref_host;
						// Определяем запрос
						preg_match('/(\?|\&)query\=([^\&]*)/',  $ref_request, $match);
						$searchword = $match[2];
						// Определяем страницу
						if(preg_match('/(\?|\&)page\=([0-9]+)/',  $ref_request, $match)){
							$searchpage = 	$match[2];
						}
						else{
							$searchpage = 1;
						}
					}
					/*********************************************/
					// Понять какой поисковик
					$resp[] = array(
						vstr_id => $result[$el]['vstr_id'],
						referer => $referer,
						url => $url,
						ref_host => $ref_host,
						ref_request => $ref_request,
						searcher => $searcher,
						searchword => $searchword,
						searchpage => $searchpage,
						ip => $result[$el]['ip'],
						userAgent => $result[$el]['userAgent'],
						'date' => $result[$el]['date'],
						cookie => $result[$el]['cookie'],
						status => $result[$el]['status'] ? $result[$el]['status'] : '0'
					);
				}
			}
		}
		$r = array(
			err => $err,
			success =>  !$err ? "true" : 'false',
			message =>  $err,
			data => $resp
		);
		//print_r($r);
		print json_encode($r);
		return;
	}
}


?>