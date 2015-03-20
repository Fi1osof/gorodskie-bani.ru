{extends file="society/topics/index.tpl"}

{block name=params append}

    {$params= array_merge($params, [
        "limit" => 7,
        "getPage"   => 0,
        "page"      => 0,
        "sort"  => "createdon",
        "dir"   => "DESC"
    ])}
    
    {$topics_list_tpl = "society/topics/layouts/sidebar/list.tpl"}
{/block}


{block name=pageing}
    <p><a href="{$modx->makeUrl(1)}" title="Все топики">Все топики</a></p>
{/block}

{block name=pre_content}<h6>Публикации</h6>{/block}
