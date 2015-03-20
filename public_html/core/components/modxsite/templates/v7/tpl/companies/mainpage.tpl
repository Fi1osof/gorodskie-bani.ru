{*
    Главная страница заведения
*}
{extends file="tpl/companies/layout.tpl"}

{block name=params}
    
    {$company_page_id = $modx->resource->id}
    
{/block}

{block name=pagetitle}{/block}

{block name=content}
    
    {*
        <div xmlns:v="http://rdf.data-vocabulary.org/#" typeof="v:Review-aggregate">
            <div rel="v:itemreviewed">
                <div typeof="v:Organization">
                </div>
            </div>
        </div>
    *}
    {include "companies/index.tpl"}

{/block}


