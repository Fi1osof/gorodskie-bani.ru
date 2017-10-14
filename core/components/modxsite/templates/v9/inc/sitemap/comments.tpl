{extends "society/topics/comments/index.tpl"}

{block comments_header}<?xml version="1.0" encoding="UTF-8"?>{/block}

{block name=params append}

    {$params = array_merge($params, [
        "limit" => 0,
        "start" => 0
    ])}
    
    {$site_url = $modx->getOption('site_url')}
{/block}
 

{block comments_fetch}
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {foreach $comments as $comment}
            <url>
                <loc>{$site_url}comments/comment-{$comment.id}.html</loc>
                <lastmod>{date('Y-m-d', strtotime($comment.createdon))}</lastmod>
                <changefreq>yearly</changefreq>
                <priority>0.50</priority>
            </url>
        {/foreach}
    </urlset>
{/block}


{block paging}{/block}
