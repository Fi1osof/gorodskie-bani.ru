{*
    Выводим список заведений.
*}

{extends "common/list/list.tpl"}

{block name=params append}
    
    {$params = array_merge($params, [  
        "limit"     => 0,
        "page"      => 0,
        "parent"    => 1197,
        "sort"      => "modResource.publishedon",
        "dir"       => "DESC",
        "facility_type" => 1298
    ])}
    
    {$processor = "web/companies/resources/getdata"} 
     
    {$outer_tpl = "companies/list/outer.tpl"}
    {$inner_tpl = "companies/list/inner.tpl"}
    
    {$companies_col_class = $companies_col_class|default:'col-lg-4 col-md-6 col-sm-12 col-xs-12'}
    
{/block}