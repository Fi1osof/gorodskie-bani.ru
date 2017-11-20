{extends file="tpl/ratings/layout.tpl"}

{block name=params append}
    {$pagetitle = "Лучшие бани по рейтингу \"{$modx->resource->pagetitle}\""}
{/block}

{block meta_title}{$pagetitle}{/block}

{block pagetitle_text}{$pagetitle}{/block}


{block content}
    {include "companies/by_rating/list.tpl" sort_value=$modx->resource->id rating_field="{$modx->resource->id}_rating"}
{/block}
