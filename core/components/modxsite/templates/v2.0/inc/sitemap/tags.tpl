{extends "common/list/list.tpl"}

{block list_headers}<?xml version="1.0" encoding="UTF-8"?>{/block}
 

{block params append}
    {$params = array_merge($params,[
        "getPage"   => 0,
        "page"      => 0,
        "limit"     => 1
    ])}
    {$site_url = $modx->getOption('site_url')}
    
    {$processor = 'web/society/topics/topictags/get_last_modified'}
{/block}

{block name=fetch}

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {foreach $result.object as $object}
            {$modified = $object.max_publishedon|default:$object.max_createdon}
            <url>
                <loc>{$site_url}tag/{$object.tag}</loc>
                <lastmod>{date('Y-m-d', $modified)}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.50</priority>
            </url>
        {/foreach}
    </urlset>
    
{/block}
 


{block pagination}{/block}
