{*
    Выводим лучшие заведения по рейтингам
*}

{$params = [
    "parent"    => 1349
    ,"showunpublished" => 1
    ,"includeTvs"   => 0
    ,"limit"   => 0
    ,"cache"    => 1
]}

{processor action="web/resources/getdata" ns="modxsite" params=$params assign=result}

{foreach $result.object as $rating_object}

    <div class="panel panel-default">
        <div class="panel-heading">
            {*
            <h4 class="page-header">{$rating_object.pagetitle}</h4>
            *}
            <h4><a href="{$rating_object.uri}">{$rating_object.pagetitle}</a></h4>
            
        </div>
        <div class="panel-body">
            {include "companies/by_rating/list.tpl" sort_value=$rating_object.id limit=6 rating_field="{$rating_object.id}_rating"}
        </div>
    </div>

{/foreach}