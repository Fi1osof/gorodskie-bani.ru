{*
    Выводим список заведений.
*}

{block name=params}

    {$params = [
        "getPage"   => 1,
        "page"      => $smarty.get.page,
        "limit"     => 10,
        "parent"    => 1197,
        "sort"      => "modResource.publishedon",
        "dir"       => "DESC"
    ]}
    
{/block}


{processor action="web/companies/resources/getdata" ns="modxsite" params=$params assign=result}

<div class="companies-list">
    
    {foreach $result.object as $object}
        {include file="companies/blocks/cart.tpl"}
    {/foreach}
    
</div>

{ph name="page.nav"}