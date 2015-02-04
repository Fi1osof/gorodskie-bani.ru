{*
    Выводим список заведений.
*}

{block name=params}

    {$params = [
        "getPage"   => 1
    ]}
    
{/block}


{processor action="web/companies/resources/getdata" ns="modxsite" params=$params assign=result}

<div class="companies-list">
    
    {foreach $result.object as $object}
        {include file="companies/blocks/cart.tpl"}
    {/foreach}
    
</div>

{ph name="page.nav"}