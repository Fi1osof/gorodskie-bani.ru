{extends "../index.tpl"}

{block name=params append}

    {$params = array_merge($params, [
        "limit" => 4,
        "page"  => 0
    ])}
     
    
{/block}

{block name=paging}{/block}
