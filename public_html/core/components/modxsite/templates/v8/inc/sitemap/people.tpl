{extends "society/profiles/list.tpl"}

{block profiles_header}<?xml version="1.0" encoding="UTF-8"?>{/block}

{block profiles_params append}
    {$params = array_merge($params,[
        "getPage"   => 0,
        "page"      => 0,
        "showinactive"  => 0,
        "showblocked"  => 0,
        "limit"     => 0
    ])}
    {$site_url = $modx->getOption('site_url')}
{/block}

{block profiles_fetch}
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {foreach $result.object as $object}
            <url>
                <loc>{$site_url}profile/{$object.username}</loc>
                <lastmod>{if $object.regdate}{date('Y-m-d', $object.regdate)}{else}2012-01-01{/if}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.50</priority>
            </url>
        {/foreach}
    </urlset>
{/block}


{block profiles_pagination}{/block}
