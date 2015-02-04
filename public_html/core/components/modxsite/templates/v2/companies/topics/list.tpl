{*
    Выводим топики-обзоры заведений
*}

{extends file="society/topics/index.tpl"}

{block name=params append}

    {$params.parent = $modx->resource->id}
    
{/block}


{block name=topics_list}
    
    {if $result.success && $result.object}
        
        <h2 class="title overviews">Обзоры заведения</h2>
        
        {$smarty.block.parent}
    {/if} 
    
{/block}