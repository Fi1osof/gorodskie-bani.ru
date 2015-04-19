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
    
    {*if !$modx->hasPermission('sdfsdf')}
    
        {include "companies/index.tpl"}
    {else}
        {$params = [
            'tpl'   => 'companies/index.tpl',
            'company_page_id' => $company_page_id
        ]} 
        
        {snippet name=smarty params=$params as_tag=1}
    
    {/if*}
    
    {$params = [
        'tpl'   => 'companies/index.tpl',
        'company_page_id' => $company_page_id
    ]} 
    
    {snippet name=smarty params=$params as_tag=1}
    

{/block}


