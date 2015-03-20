{*
    Основная карточка заведения.
    Выводится в списке компаний и на странице конкретного заведения
*}

{$image = $object.image}
{$src = $modx->runSnippet('phpthumbof', [
    "input" => $image,
    "options"   => "&q=40&far=T&zc=1&w=500&h=350&f=jpg"
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

{$companies_col_class = $companies_col_class|default:'col-lg-4 col-md-6 col-sm-12 col-xs-12'}
{block cart_body}
    <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress" class="{$companies_col_class} company-cart overlay-wrapper nopadding">
        
        {*
        <h3 class="company-title toggled" itemprop="name">{$object.pagetitle}</h3>
        *}
        <img alt="{$title}" src="{$src}" title="{$title}" class="img-responsive">
        <div class="overlay description large">
            
            <a href="{$object.uri}" class="overlay-inner link" title="{($object.longtitle|default:$object.pagetitle)|@escape}">
                <h3 class="company-title" itemprop="name">{$object.pagetitle}</h3>
                
                <div class="toggled">
                    {if $metro}
                        <p class="params"><strong class="p-title">Метро: </strong>{$metro}</p>
                    {/if}
                    
                    <div>
                        <p class="params">
                            <strong class="p-title">Адрес: </strong>{if !strstr($address, 'город')}<span itemprop="addressLocality">{$city}</span>{else}{$city}{/if}{if $address}, <span itemprop="streetAddress">{$address}{/if}</span>
                        </p> 
                    </div>
                </div>
            </a>
            
            {include "society/ratings/companies/widget.tpl"}
            
        </div>
         
    </div>
{/block}
