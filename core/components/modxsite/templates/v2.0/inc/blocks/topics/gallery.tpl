{* Выводим галерею *}

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