{extends "society/threads/layout.tpl"}


{block name=thread_params append}
    {$params = [
        "where" => [
            "id"    => $company_page_id
        ],
        "showhidden"        => 1,
        "showunpublished"   => 1,
        "current"           => 1,
        "limit"             => 1
    ]}
    
    {$processor = "web/companies/resources/getdata"}
    
{/block}

{block thread_request}
 
    {processor action=$processor ns="modxsite" params=$params assign=result}
    {if $result.success && $result.object}
        {$object = $result.object}
    {/if}
    
    {*
    <pre>
        {print_r($object)}
    </pre>
    *}
{/block}

                        
{block thread_panel_heading}
    {$title = "<h1 class=\"company-title title\" itemprop=\"name\">{$object.pagetitle}</h1>"}
    {if $object.id != $modx->resource->id}
        <a href="{$object.uri}">{$title}</a>
    {else}
        {$title}
    {/if}
{/block}                        
                        

{block thread_object_content}
    {include file="companies/blocks/full/cart.tpl"}
    
    <div class="details">
            
        {if $object.tvs.work_time.value}
            <p class="params"><strong class="p-title">Время работы: </strong>{$object.tvs.work_time.value}</p>
        {/if}

        {if $object.tvs.phones_comments.value}
            <p class="params"><strong class="p-title">Примечания: </strong>{$object.tvs.phones_comments.value}</p>
        {/if}
        
        {if $object.tvs.prices.value}
            <p class="params"><strong class="p-title">Цены: </strong>{$object.tvs.prices.value}</p>
        {/if}
        {if $object.tvs.prices_comments.value}
            <noindex>
                <i>
                    {$object.tvs.prices_comments.value}
                </i>
            </noindex>
        {/if}
        
        {if $object.tvs.ya_map.value}
            
            <div style="margin: 20px 0;">
                {$object.tvs.ya_map.value}
            </div>
            
        {/if}
        
        
    </div>
    
    {if $object.content}
        <div style="margin: 20px 0;">
            {$object.content}
        </div>
    {/if}
    
            
{/block}

{block thread_post_content}
    [[!smarty?tpl=`companies/topics/list.tpl`]]
{/block}
                        
                        
{*
    !!! Далее старый код, который не выводится
*}


{$params = [
        "where" => [
            "id"    => $company_page_id
        ],
        "showhidden"        => 1,
        "showunpublished"   => 1,
        "current"           => 1,
        "limit"             => 1
    ]}
    
    {processor action="web/companies/resources/getdata" ns="modxsite" params=$params assign=result}
    {$object = $result.object} 
    
    <div class="company company-full panel panel-default">
        
        <div class="panel-heading">
            {$title = "<h1 class=\"company-title title\" itemprop=\"name\">{$object.pagetitle}</h1>"}
            {if $object.id != $modx->resource->id}
                <a href="{$object.uri}">{$title}</a>
            {else}
                {$title}
            {/if}
        </div>
        
        <div class="panel-body">
        
            {include file="companies/blocks/full/cart.tpl"}
            
            <div class="details">
            
                    {if $object.tvs.work_time.value}
                        <p class="params"><strong class="p-title">Время работы: </strong>{$object.tvs.work_time.value}</p>
                    {/if}
            
                    {if $object.tvs.phones_comments.value}
                        <p class="params"><strong class="p-title">Примечания: </strong>{$object.tvs.phones_comments.value}</p>
                    {/if}
                    
                    {if $object.tvs.prices.value}
                        <p class="params"><strong class="p-title">Цены: </strong>{$object.tvs.prices.value}</p>
                    {/if}
                    {if $object.tvs.prices_comments.value}
                        <noindex>
                            <i>
                                {$object.tvs.prices_comments.value}
                            </i>
                        </noindex>
                    {/if}
                    
                    {if $object.tvs.ya_map.value}
                        
                        <div style="margin: 20px 0;">
                            {$object.tvs.ya_map.value}
                        </div>
                        
                    {/if}
                    
                
            </div> 
            
            {block name=overviews}
            
                {if $object.content}
                    <div style="margin: 20px 0;">
                        {$object.content}
                    </div>
                {/if}
                
                {if $object.gallery} 
                    
                    <div class="gallery row">
                        {foreach $object.gallery as $gal_item}
                            {$image = $gal_item.image}
                            {$thumb = $modx->runSnippet('phpthumbof', [
                                "input" => $image,
                                "options" => "&q=100&w=350&h=350&zc=C"
                            ])}
                            
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                <a class="highslide thumb" href="{$image}" onclick="return hs.expand(this)">
                                    <img class="img-responsive" src="{$thumb}" title="{$gal_item.title}" alt="{$gal_item.title}">
                                </a>
                            </div>
                        {/foreach}
                    </div>
                    
                {/if}
                 
                [[!smarty?tpl=`companies/topics/list.tpl`]] 
            {/block}
            
        </div> 
        
            
    </div>