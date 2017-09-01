{*
    Главная страница заведения
*}
{extends file="tpl/companies/layout.tpl"}

{block name=params}
    
    {$company_page_id = $modx->resource->id}
    
{/block}

{block name=pagetitle}{/block}

{block name=content}
    
    {include "companies/index.tpl"}

{/block}


