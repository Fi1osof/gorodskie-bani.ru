{*
    Основная карточка заведения.
    Выводится в списке компаний и на странице конкретного заведения
*}

{$image = $object.image}
{$src = $modx->runSnippet('phpthumbof', [
    "input" => $image,
    "options"   => "zc=1&w=150&h=150"
])}

{$approved = $object.tvs.approved.value} 

{$site = $object.tvs.site.value}
{$title = $object.pagetitle|@escape}
{$metro = $object.tvs.metro.value}
{$city = $object.city}
{$address = $object.tvs.address.value}
{$phones = $object.tvs.phones.value} 

<div class="company-cart" itemscope itemtype="http://schema.org/Organization">
    
    <div class="head">
        <a href="images/resized/big{$image}" rel="prettyPhoto[_company{$object.id}_]">
            <img alt="{$title}" src="images/resized/thumb{$image}" title="{$title}">
        </a>
    </div>
    
    <div class="description">
        {$title = "<h1 class=\"company-title\" itemprop=\"name\">{$object.pagetitle}</h1>"}
        {if $object.id != $modx->resource->id}
            <a href="{$object.uri}">{$title}</a>
        {else}
            {$title}
        {/if} 
        
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