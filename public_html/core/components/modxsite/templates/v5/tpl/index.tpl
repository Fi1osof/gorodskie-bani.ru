{extends file="layout.tpl"}

{block pagetitle}{/block}

{block name=content}
    
    <div class="panel panel-default">
        
        <div class="panel-heading">
            <h1 class="title">{$modx->resource->longtitle|default:$modx->resource->pagetitle}</h1>
        </div>
        
        <div class="panel-body">
            {$smarty.block.parent}
        </div>
    
    </div>
    
{/block}