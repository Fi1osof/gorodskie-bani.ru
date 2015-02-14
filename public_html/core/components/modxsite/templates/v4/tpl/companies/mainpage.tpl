{*
    Главная страница заведения
*}
{extends file="tpl/companies/layout.tpl"}

{block name=params}
    
    {$company_page_id = $modx->resource->id}
    
{/block}

{block name=pagetitle}{/block}

{block name=content}
    
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
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-4">
                                <a class="highslide thumb" href="images/resized/big{$image}" onclick="return hs.expand(this)">
                                    <img class="img-responsive" src="images/resized/thumb{$image}" title="{$gal_item.title}" alt="{$gal_item.title}">
                                </a>
                            </div>
                        {/foreach}
                    </div>
                    
                {/if}
                 
                [[!smarty?tpl=`companies/topics/list.tpl`]] 
            {/block}
            
        </div>
        
        
            
    </div>
    
    
    
    


{/block}


