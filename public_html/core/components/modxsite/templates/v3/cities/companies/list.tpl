{extends file="companies/list.tpl"}

{block name=params append}

    {$params.parent = $modx->resource->id}
    
{/block}

