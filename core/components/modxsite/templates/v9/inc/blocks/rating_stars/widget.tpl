{*
    $voter - виджет используется для голосования. default 0
*}

{* Округляем рейтинг для выгрузки поисковикам *}
{$rating_rounded = round((float)$rating, 1)}
<!-- rating__wrap -->
<div class="rating__wrap {if $voter}voter{/if} {if $show_meta}rating{/if}" {$wraper_attributes} {if $show_meta}itemscope itemtype="http://schema.org/Rating"{/if}> 
    {if $show_meta && $rating}
        <div class="hidden">
            <span itemprop="name">{$object.pagetitle}</span>
            
            <span>
                Рейтинг:
                <span itemprop="ratingValue">{(int)$rating}</span> из
                <span itemprop="bestRating">5</span>
            </span> 
        </div>
        

    {/if}
    <!-- rating__stars --> 
    
    <div class="rating__stars stars">
        <span class="gray-stars"><img alt="" src="{$template_url}img/gray-stars.png"></span>
        
        {$width = (float)($rating/5*100)}
        
        <span class="red-stars ruler" style="width:{$width}%">
            <img {if $show_meta}content="{$rating_rounded}" alt="{if $rating}Оценка: {$rating_rounded} {((int)$rating)|spell:'звезда':'звезды':'звезд'}. {if $rating <= 2}Не рекомендуется{else}Рекомендуется{/if}{/if}"{/if} src="{$template_url}img/red-stars.png">
        </span>
        <input type="hidden" name="vote_value" data-target_id="{$target_id}" data-type="{$type}" value="0"/>
    </div>
    <!-- /rating__stars -->
</div>
<!-- /rating__wrap -->