{*
    Выводим сауны. Пока только по Москве
*}
{extends "tpl/index.tpl"}


{block container prepend}
        {*
            Выводим карту
        *}
        
        {include "companies/list/map/saunas/list.tpl"}
        
        <div class="container type_buttons">
            <div class="row">
                <div class="col-md-5"><a class="btn btn-info btn-lg btn-block" href="/">Общественные бани</a></div>
                <div class="col-md-5 col-md-offset-2"><a class="btn btn-success btn-lg btn-block" href="{$modx->makeUrl(1468)}"><i class="glyphicon glyphicon-ok"></i> Сауны и частные бани</a></div>
            </div>
        </div>
        
{/block}

{block content}
    {include "companies/saunas/list.tpl"}
{/block}
