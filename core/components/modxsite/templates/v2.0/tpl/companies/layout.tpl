{extends file="layout.tpl"}

{block name=title}{$modx->resource->longtitle|default:$modx->resource->pagetitle}, {$modx->resource->Parent->pagetitle}{if $address = $modx->resource->getTVValue(14)}, {$address}{/if} | {$site_name}{/block}

