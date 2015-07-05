{block thread_header}{/block}
{*
    Общий шаблон для страниц, у которых могут быть комментарии
*}

{block thread_params}
    {$canReply = (bool)$modx->user->id}
    {$users_url = $modx->makeUrl(626)}
    
    {block name=params}{/block}
{/block}

{block thread_request}{/block}

{block thread_body}

    {if $object}
        
    
        {if $object.thread_id}
        
            {$params = [
                "thread_id" => $object.thread_id,
                "limit"         => 0
            ]}
            
            {processor action="web/society/threads/comments/getdata" ns="modxsite" params=$params assign=comments_result}
              
        {/if}
        
        
        <div id="topic_list_{$modx->resource->id}" class="topic_list">
            
            <div class="panel panel-default">
                
                <div class="panel-heading">
                    {block thread_panel_heading}
                        <h2 class="title">{block thread_panel_title}{$object.pagetitle}{/block}</h2>
                    {/block}
                </div>
                
                
                <div class="panel-body">
                
                    {block thread_content}
                        {$title = $object.longtitle|default:$object.pagetitle}
                        
                        {if $image = $object.image}
                            {*$thumb = $modx->runSnippet('phpthumbof', [
                                'input' => $image,
                                "options"   => "w=150"
                            ])*}
                            
                            <div class="head">
                                <a class="highslide thumb" onclick="return hs.expand(this)" href="{$image}">
                                    <img class="pull-left topic-thumb" title="{$title|@escape}" alt="{$title|@escape}" src="/images/resized/thumb{$image}"/>
                                </a>
                            </div>
                        {/if}
                        
                         
                        {block thread_object_content}
                            {$object.content}
                        {/block}
                        
                        
                        {block thread_object_gallery}
                            {if $object.gallery} 
                                {include "inc/blocks/topics/gallery.tpl"}
                            {/if}
                        {/block}
                        
                        {block thread_post_content}{/block}
                        
                        {*
                            Ссылка на оригинал
                            Array
                            (
                                [scheme] => http
                                [host] => svpressa.ru
                                [path] => /post/article/114240/
                            )
        
                        *}
                        {if $original_source = $object.tvs.original_source.value}
                            {$parsed_url = parse_url($original_source)}
                            <noindex>
                                <p>
                                    <i>
                                        Источник: <a href="{$original_source}" target="_blank" rel="nofollow">{$parsed_url.host}</a>
                                    </i>
                                </p>
                            </noindex>
                        {/if}
                    {/block}
                
                    
                </div>
                
                <div class="panel-footer">
                    {include file="society/topics/layouts/info.tpl"}
                </div>
                  
                
                
            </div>
            
            {block thread_comments}
                <a name="comments"></a>
                <div class="panel panel-default">
                    
                    <div class="panel-heading">
                        <h3>{(int)$object.comments_count} {((int)$object.comments_count)|spell:"комментарий":"комментария":"комментариев"}</h3>
                    </div>
                    {*if $object.comments_count}
                    {/if*}
                    
                    <div class="panel-body">
                        {*
                            Если ветка была получена, получаем имеющиеся комменты
                        *} 
                        
                        {if !$modx->user->id}
                            {include "society/threads/comments/auth.tpl"}
                        {/if}
                        
                        <div id="comments-wrapper">
                        
                            {if $object.thread_id}
                                
                                {if $comments_result.success && $comments_result.object}
                                    
                                    {$comments = $comments_result.object}
                                    
                                    {* Выводим комментарии *}
                                    {include file="society/threads/comments/outer.tpl"}
                                     
                                {/if}
                                
                            {/if}
                        
                        </div>
                        
                        {if $modx->user->id}
                            <div class="comment-reply">
                                
                                <h4 id="comment_id_0" data-comment-id="0" class="reply-header">
                                    <a class="btn btn-primary btn-sm" href="javascript:;"><i class="glyphicon glyphicon-save"></i> Оставить комментарий</a>
                                </h4>
                                
                            </div>
                            
                        
                            <div id="reply" class="reply">		
                    			<form method="post" id="form_comment" onsubmit="return false;" enctype="multipart/form-data">
                    				
                    				
                    				<textarea name="text" id="form_comment_text" class="mce-editor markitup-editor input-width-full"></textarea>
                    				
                    				
                    				
                    				<button type="submit"  name="submit_comment" 
                    						id="comment-button-submit"  
                    						class="btn btn-success"><i class="glyphicon glyphicon-ok"></i> Опубликовать комментарий</button>
                    				
                                    {*
                                        <button type="button" onclick="ls.comments.preview();" class="button">предпросмотр</button>
                                    *}
                    				
                    				<input type="hidden" name="parent" value="0" id="form_comment_reply" />
                    				<input type="hidden" name="target_id" value="{$object.id}" />
                    				<input type="hidden" name="pub_action" value="topics/comments/save" />
                    			</form>
                    		</div>
                        
                        {else if $object.comments_count}
                            {include "society/threads/comments/auth.tpl"}
                        {/if} 
                        
                    </div>
                    
                </div>
            {/block}
            
        </div>
            
        
        
        
        {*
        
            				{name: ls.lang.get('panel_b'), className:'editor-bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
            				{name: ls.lang.get('panel_i'), className:'editor-italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)'  },
            				{name: ls.lang.get('panel_s'), className:'editor-stroke', key:'S', openWith:'<s>', closeWith:'</s>' },
            				{name: ls.lang.get('panel_u'), className:'editor-underline', key:'U', openWith:'<u>', closeWith:'</u>' },
            				{separator:'---------------' },
            				{name: ls.lang.get('panel_quote'), className:'editor-quote', key:'Q', replaceWith: function(m) { if (m.selectionOuter) return '<blockquote>'+m.selectionOuter+'</blockquote>'; else if (m.selection) return '<blockquote>'+m.selection+'</blockquote>'; else return '<blockquote></blockquote>' } },
            				{name: ls.lang.get('panel_code'), className:'editor-code', openWith:'<code>', closeWith:'</code>' },
            				{name: ls.lang.get('panel_image'), className:'editor-picture', key:'P', beforeInsert: function(h) { jQuery('#window_upload_img').jqmShow(); } },
            				{name: ls.lang.get('panel_url'), className:'editor-link', key:'L', openWith:'<a href="[!['+ls.lang.get('panel_url_promt')+':!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
            				{name: ls.lang.get('panel_user'), className:'editor-user', replaceWith:'<ls user="[!['+ls.lang.get('panel_user_promt')+']!]" />' },
            				{separator:'---------------' },
            				{name: ls.lang.get('panel_clear_tags'), className:'editor-clean', replaceWith: function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } }
            
        *}
        
        
        
    {else}
        <h4 class="error">{$result.message|default:"Не были получены данные топика"}</h4>
    {/if}


    
    
{/block}

{block thread_footer}{/block}
