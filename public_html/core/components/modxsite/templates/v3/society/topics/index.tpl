{*
    Получаем все топики
*}

{block name=params}

    {$params=[
        "limit" => 10,
        "getPage"   => 1,
        "page"      => $smarty.get.page,
        "sort"  => "createdon",
        "dir"   => "DESC"
    ]}
    
    {$processor = "web/society/topics/getdata"}
    
    {$topics_list_tpl = $topics_list_tpl|default:"society/topics/layouts/list.tpl"}
     
    
{/block}

{block name=pre_content}{/block}

{processor action=$processor ns="modxsite" params=$params assign=result}

{$users_url = $modx->makeUrl(626)} 


{block name=topics_list}

    {foreach $result.object as $object}
        {include file=$topics_list_tpl}
    {/foreach}
    
    {block name=pageing}
        {ph name="page.nav"}
    {/block}

{/block}


