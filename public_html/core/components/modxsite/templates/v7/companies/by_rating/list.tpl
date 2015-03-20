{extends "companies/list/list.tpl"}

{block params append}
    {$params = array_merge((array)$params, [
        "sort_type" => rating
    ])}
{/block}
