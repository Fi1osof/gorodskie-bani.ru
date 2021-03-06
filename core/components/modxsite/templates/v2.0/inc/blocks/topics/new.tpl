<div class="panel panel-default">
        
    <div class="panel-heading">
        <h4 class="title">Свежие записи</h4>
    </div>
    
    <div class="panel-body">
        {$params = [
            "limit" => 10,
            "sort"  => "publishedon",
            "dir"   => "DESC",
            "cache" => 1,
            'cache_prefix'      => "getdata/{$modx->user->id}/"
        ]}
        
        {processor action="web/society/topics/getdata" ns="modxsite" params=$params assign=result}
        
        <ul class="menu">
            {foreach $result.object as $object}
                <li><a href="{$object.uri}" title="{$object.longtitle|default:$object.pagetitle}">{$object.menutitle|default:$object.pagetitle}</a></li>
            {/foreach}
        </ul>
    </div>
</div>
