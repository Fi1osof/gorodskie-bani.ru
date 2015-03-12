{extends "companies/index.tpl"}


{block thread_post_content}
    [[!smarty?tpl=`society/topics/topic/index.tpl`]]
{/block}

{block thread_comments}{/block}

{block thread_object_gallery}{/block}

{block name=overviews}
    
    <a name="overview"></a>
    <div style="margin:60px 0 0;">
        
        {*
        <h2 class="title">Обзор {$modx->resource->pagetitle}</h2>
        *}
        
        [[!smarty?tpl=`society/topics/topic/index.tpl`]]
        
    </div>

    
{/block}