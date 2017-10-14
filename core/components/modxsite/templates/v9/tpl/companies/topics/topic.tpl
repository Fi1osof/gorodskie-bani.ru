{*
    Шаблон обзора заведения. 
    Важно - должен расширять шаблон блога компании, чтобы информация компании всегда была перед глазами в топике
*}
{extends file="tpl/companies/mainpage.tpl"}

{block name=title}{$modx->resource->longtitle|default:$modx->resource->pagetitle} | {$modx->resource->Parent->pagetitle}, {$modx->resource->Parent->Parent->pagetitle}{if $address = $modx->resource->Parent->getTVValue(14)}, {$address}{/if} | {$site_name}{/block}

{block name=params}
    
    {$company_page_id = $modx->resource->parent}
    
{/block}

{block name=content}
    
    {include "companies/overview/index.tpl"}

{/block}
 