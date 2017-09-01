{*
    Выводим на карту оплаченные сауны. Пока только Москва
*}

{extends "companies/list/map/list.tpl"}


{block params append}
    {$params = array_merge((array)$params, [
        "parent"    => 1197,
        "facility_type" => 1299,
        "approved_only" => 1
    ])}
{/block}
