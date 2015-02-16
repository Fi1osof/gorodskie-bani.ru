{*
    Шаблон обзора заведения. 
    Важно - должен расширять шаблон блога компании, чтобы информация компании всегда была перед глазами в топике
*}
{extends file="tpl/companies/mainpage.tpl"}


{block name=params}
    
    {$company_page_id = $modx->resource->parent}
    
{/block}


{block name=overviews}
    
    <a name="overview"></a>
    <div style="margin:60px 0 0;">
        
        {*
        <h2 class="title">Обзор {$modx->resource->pagetitle}</h2>
        *}
        
        [[!smarty?tpl=`society/topics/topic/index.tpl`]]
        
    </div>

    
{/block}

