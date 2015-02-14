{*
    Основная карточка заведения.
    Выводится в списке компаний и на странице конкретного заведения
*}

{$image = $object.image}
{$src = $modx->runSnippet('phpthumbof', [
    "input" => $image,
    "options"   => "&far=T&zc=1&w=600&h=400"
])}

{$approved = $object.tvs.approved.value} 

{$site = $object.tvs.site.value}
{$title = $object.pagetitle|@escape}
{$metro = $object.tvs.metro.value}
{$city = $object.city}
{$address = $object.tvs.address.value}
{$phones = $object.tvs.phones.value} 

{*
        <img alt="{$title}" src="images/resized/middle/{$image}" title="{$title}" class="img-responsive">
*}

{block cart_body}
    <a href="{$object.uri}" title="{($object.longtitle|default:$object.pagetitle)|@escape}" class="col-lg-3 col-md-4 col-sm-6 col-xs-12 company-cart overlay-wrapper nopadding" itemscope itemtype="http://schema.org/Organization">
        
        <img alt="{$title}" src="{$src}" title="{$title}" class="img-responsive">
        
        <div class="overlay description large">
            
            <h3 class="company-title" itemprop="name">{$object.pagetitle}</h3>
            
            {if $metro}
                <p class="params"><strong class="p-title">Метро: </strong>{$metro}</p>
            {/if}
            
            <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                <p class="params">
                    <strong class="p-title">Адрес: </strong>{if !strstr($address, 'город')}<span itemprop="addressLocality">{$city}</span>{else}{$city}{/if}{if $address}, <span itemprop="streetAddress">{$address}{/if}</span>
                </p> 
            </div>
             
        </div>
         
    </a>
{/block}
