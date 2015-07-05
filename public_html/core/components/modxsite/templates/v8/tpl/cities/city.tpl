{extends file="layout.tpl"}
  

{block container prepend}
        {*
            Если это Москва, выводим карту
        *}
        
        {if $modx->resource->id == 1197}
            {include "companies/list/map/mainpage/list.tpl"}
            
            <div class="container type_buttons">
                <div class="row">
                    <div class="col-md-5"><a class="btn btn-success btn-lg btn-block" href="{$modx->resource->uri}"><i class="glyphicon glyphicon-ok"></i> Общественные бани</a></div>
                    <div class="col-md-5 col-md-offset-2"><a class="btn btn-info btn-lg btn-block" href="{$modx->makeUrl(1468)}">Сауны и частные бани</a></div>
                </div>
            </div>
        {/if}
{/block}

{block name=content}
    
    {*
        Сейчас в городе выводятся все заведения без постраничности, так что можно заинключить с кешированием
        [[!smarty?tpl=`cities/companies/list.tpl`]]
    *}
    
    {include "cities/companies/list.tpl"}
    
{/block}

