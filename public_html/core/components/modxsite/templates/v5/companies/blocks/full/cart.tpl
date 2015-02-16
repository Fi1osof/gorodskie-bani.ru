{extends "../cart.tpl"}

{block cart_body}
    <div class="company-cart" itemscope itemtype="http://schema.org/Organization">
        
        <div class="head">
            <a class="highslide thumb" href="images/resized/big{$image}" onclick="return hs.expand(this)">
                <img alt="{$title}" src="images/resized/thumb{$image}" title="{$title}">
            </a>
        </div>
        
        <div class="description">
            
            {*$title = "<h1 class=\"company-title\" itemprop=\"name\">{$object.pagetitle}</h1>"}
            {if $object.id != $modx->resource->id}
                <a href="{$object.uri}">{$title}</a>
            {else}
                {$title}
            {/if*} 
            
            {if $metro}
                <p class="params"><strong class="p-title">Метро: </strong>{$metro}</p>
            {/if}
            
            <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <p class="params"><strong class="p-title">Адрес: </strong><a href="{$object.city_uri}" title="{$city}">{if !strstr($address, 'город')}<span itemprop="addressLocality">{$city}</span>{else}{$city}{/if}</a>{if $address}, <span itemprop="streetAddress">{$address}{/if}</span></p> 
            </div>
            
            {if $phones}
                <p class="params"><strong class="p-title">Телефон: </strong><span itemprop="telephone">{$phones}</span></p>
            {/if}
            
            {if $site && $approved}
                <p class="params"><strong class="p-title">Сайт: </strong>
                    <a href="http://{$site}" target="_blank" title="{$title|@escape}">{$site}</a>
                </p>
            {/if}
        </div>
        
    </div>
{/block}
