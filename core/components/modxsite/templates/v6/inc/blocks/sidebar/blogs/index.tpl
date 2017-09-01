{extends file="society/blogs/index.tpl"}

{block name=params append}
    {$params=array_merge($params,[
        "limit" => 10,
        "getPage"   => 0,
        "page"      => 0,
        "sort"  => "id",
        "dir"   => "ASC"
    ])}
{/block}

{block name=pre_content}<h6>Блоги</h6>{/block}


{block name=pageing}
    <p><a href="{$modx->makeUrl(23)}" title="Все блоги">Все блоги</a></p>
{/block}

{block name=blog_tpl}
        <a href="{$object.uri}" title="{$object.pagetitle}">{$object.pagetitle}</a>
{*
        <p class="author">
            <a href="{$users_url}{$object.author}/">
                {$object.author}
            </a>
        </p>
*}
{/block}