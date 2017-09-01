<div class="title">Свежие записи</div>		 
        		
        <div class="">
        
            {$params = [
                "limit" => 10,
                "sort"  => "publishedon",
                "dir"   => "DESC"
            ]}
            
            {processor action="web/society/topics/getdata" ns="modxsite" params=$params assign=result}
            
            <ul class="menu">
                {foreach $result.object as $object}
                    <li><a href="{$object.uri}" title="{$object.longtitle|default:$object.pagetitle}">{$object.menutitle|default:$object.pagetitle}</a></li>
                {/foreach}
            </ul>
             
        
        </div>