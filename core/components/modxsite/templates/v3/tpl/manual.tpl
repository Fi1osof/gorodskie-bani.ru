{extends file="layout.tpl"}

{block name=body}
    {$modx->resource->content}
{/block}

{block name=libs}{/block}

{block name=page}
    <script data-main="{$template_url}js/pages/manual" src="{$template_url}libs/require/require.js"></script>
{/block}