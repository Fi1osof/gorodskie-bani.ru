{*
    Выводим оплаченные сауны. Пока только по Москве
*}

{extends "companies/list.tpl"}


{block name=params append}
    
    {$params = array_merge($params, [
        "facility_type" => 1299,
        "approved_only" => 1
    ])} 
    
{/block}
