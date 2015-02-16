{extends file="companies/list.tpl"}

{block name=params append}

    {$params.parent = $modx->resource->id}
    {$companies_col_class = 'col-lg-4 col-md-6 col-sm-12 col-xs-12'}
    
{/block}

