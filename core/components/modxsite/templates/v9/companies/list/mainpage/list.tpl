{extends "../list.tpl"}

{*
    Выводим заведения
*}

{block name=params append}
    
    {$params.page = 0}
    {$params.limit = 12}
    
    {$outer_tpl = "./outer.tpl"}
    
    
    {$companies_col_class = 'col-lg-3 col-md-4 col-sm-6 col-xs-12'}
     
{/block}

{block name=pagination}{/block}