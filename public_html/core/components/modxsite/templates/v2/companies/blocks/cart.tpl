{*
    Основная карточка заведения.
    Выводится в списке компаний и на странице конкретного заведения
*}

{$image = $object.image}
{$src = $modx->runSnippet('phpthumbof', [
    "input" => $image,
    "options"   => "zc=1&w=150&h=150"
])}

{$title = $object.pagetitle|@escape}
{$metro = $object.tvs.metro.value}
{$city = $object.city}
{$address = $object.tvs.address.value}
{$phones = $object.tvs.phones.value} 

<div class="company-cart">
    
    <div class="head">
        <a href="{$image}" onclick="return vz.expand(this)">
            <img alt="{$title}" src="{$src}" title="{$title}">
        </a>
    </div>
    
    <div class="description">
    
        {if $object.id != $modx->resource->id}
            <a href="{$object.uri}">
                <h1 class="company-title">{$object.pagetitle}</h1>
            </a>
        {else}
            <h1 class="company-title">{$object.pagetitle}</h1>
        {/if}
         
        
        {if $metro}
            <p class="params"><strong class="p-title">Метро: </strong>{$metro}</p>
        {/if}
         
        <p class="params"><strong class="p-title">Адрес: </strong><a href="{$object.city_uri}" title="{$city}">{$city}</a>{if $address}, {$address}{/if}</p> 
        
        {if $phones}
            <p class="params"><strong class="p-title">Телефон: </strong>{$phones}</p>
        {/if}
    </div>
    
</div>