
    <div id="topic_list_{$object.id}" class="topic_list">
        
        {$title = "<h4><a href=\"{$object.uri}\">{$object.pagetitle}</a></h4>"}
        
        {if !$object.published}
            {$title = "<s>{$title}</s>"}
        {/if}
    
        
        {$title}
       
            
        {*
            Получаем блоги
        *}
        <p>
            <a href="{$object.blog_uri}" >{$object.blog_pagetitle}</a>
        </p>
        
        <div class="topic-body">
            {$object.short_text}
        </div>
        
        <p>
            <a href="{$object.uri}">Читать дальше...</a>
        </p>
        
        
        {include file="society/topics/layouts/info.tpl"}
        
    </div>