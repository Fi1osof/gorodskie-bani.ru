<?php
/**
 * Smarty plugin
 *
 * @package    Smarty
 * @subpackage PluginsFunction
 */

function spellindex($num){
	if($num<10 || $num>20){
		switch($num%10){
			case 1: return 0; //минута
			case 2:
			case 3:
			case 4: return 1; //минуты
		}
	}
	return 2; //минут
}

function prettyDate($ts) {
    $mins=array(" минуту"," минуты"," минут");
    $hours=array(" час"," часа"," часов");
    $days=array(" день"," дня"," дней");
    $weeks=array(" неделю"," недели"," недель");
    $months=array(" месяц"," месяца"," месяцев");

	$s = date("m.d.Y", $ts);
	$now = time();
	
	if ($now > $ts) {
		$diff = round($now-$ts);
		$numMins = round($diff/60);
		$numHours = round($numMins/60);
		$numDays = round($numHours/24);
		$numWeeks = round($numDays/7);
		$numMonths = round($numWeeks/4.33);

		if (($diff < 60) || ($numMins <= 1)) {
			$s = "Минуту назад";
		} elseif ($numHours == 0) {
			$s = $numMins . $mins[spellindex($numMins)]." назад";
		} elseif ($numDays == 0) {
			if ($numHours > 1) {
				$s = $numHours . $hours[spellindex($numHours)]." назад";
			} else {
				$s = "Час назад";
			}
		} elseif ($numWeeks == 0) {
			if ($numDays > 1) {
				$s = $numDays . $days[spellindex($numDays)] . " назад";
			} else {
				$s = "Вчера";
			}
		} elseif ($numMonths == 0) {
			if ($numWeeks > 1) {
				$s = $numWeeks . $weeks[spellindex($numWeeks)]." назад";
			} else {
				$s = "Неделю назад";
			}
		} else {
			if ($numMonths <= 6) {
				$s = $numMonths . $months[spellindex($numMonths)]." назад";
			} else {
				$s = "Более полугода назад";
			}
		}
	}
	return $s;
}


function smarty_function_prettydate($params, & $smarty)
{
    if (!isset($params['date'])) {
        return;
    }
    
	$output = prettyDate($params['date']);

    return !empty($assign) ? $smarty->assign($assign, $output) : $output;
}
