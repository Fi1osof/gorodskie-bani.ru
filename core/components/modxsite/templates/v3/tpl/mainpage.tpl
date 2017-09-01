{extends file="layout.tpl"}
  


{block name=content}
    [[!smarty?tpl=`companies/list.tpl`]]
    
    <div>
        {$modx->resource->content}
    </div>
    
{/block}

