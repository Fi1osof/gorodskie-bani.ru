{extends file="layout.tpl"}


{block name=params}
    {$comment = $comments|@current}
    
    {$last_modified = strtotime($comment.createdon)}
    
    {$title = $comment.text|@truncate}
    
    {$pagetitle = "{$title} | {$comment.resource_pagetitle} | {$site_name}"} 
    
{/block}

{block name=title}{$pagetitle}{/block}

{block name=pagetitle}<h1>{$title}</h1>{/block}

{block name=content}

    {include file="society/threads/comments/outer.tpl"} 
    
    <hr />
    <div>
        <a href="{$comment.resource_uri}#comment-{$comment.id}">Комментарий</a> к топику <a href="{$comment.resource_uri}">{$comment.resource_pagetitle}</a>
    </div>
    
{/block}
