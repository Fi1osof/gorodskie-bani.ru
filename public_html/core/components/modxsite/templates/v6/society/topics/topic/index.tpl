{*
    Выводим содержимое топика
*}

{extends "society/threads/layout.tpl"}


{block name=params append}
    
    {$params=[
        "limit" => 1,
        "showhidden"   => 1,
        "showunpublished"   => 1,
        "current"   => 1,
        "where" => [
            "id"    => $modx->resource->id
        ]
    ]}
    
    {$processor = "web/society/topics/getdata"}
    
{/block}

{block thread_request}
    {processor action=$processor ns="modxsite" params=$params assign=result}
    {if $result.success && $result.object}
        {$object = $result.object}
    {/if}
{/block}

{block thread_body___}
    {if $result.success && $result.object}
        {$users_url = $modx->makeUrl(626)}
        
        {$object = $result.object}
        
    
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
                    <h2 class="title">{$object.pagetitle}</h2>
                </div>
                
                
                <div class="panel-body">
                    {$title = $object.longtitle|default:$object.pagetitle}
                    
                    {if $image = $object.image}
                        {$thumb = $modx->runSnippet('phpthumbof', [
                            'input' => $image,
                            "options"   => "w=150"
                        ])}
                        
                        <div class="head">
                            <a class="highslide thumb" onclick="return hs.expand(this)" href="{$image}">
                                <img class="pull-left topic-thumb" title="{$title|@escape}" alt="{$title|@escape}" src="{$thumb}"/>
                            </a>
                        </div>
                    {/if}
                    
                     
                    {$object.content} 
                    
                    {if $object.gallery} 
                        {include "inc/blocks/topics/gallery.tpl"}
                    {/if}
                    
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
                    
                </div>
                
                <div class="panel-footer">
                    {include file="society/topics/layouts/info.tpl"}
                </div>
                  
                
                
            </div>
            
            
            <a name="comments"></a>
            <div class="panel panel-default">
                
                {if $object.comments_count}
                    <div class="panel-heading">
                        <h3>{(int)$object.comments_count} {((int)$object.comments_count)|spell:"комментарий":"комментария":"комментариев"}</h3>
                    </div>
                {/if}
                
                <div class="panel-body">
                    {*
                        Если ветка была получена, получаем имеющиеся комменты
                    *} 
                    
                    {if !$modx->user->id}
                        <noindex>
                            <div style="margin: 30px 0 0;">
                                <h5>
                                    <a rel="nofollow" data-target="#loginLoginForm" data-toggle="modal" href="javascript:;">Авторизуйтесь</a> или <a href="{$modx->makeUrl(991)}">зарегистрируйтесь</a> (можно через соцсети {include file="inc/blocks/social_auth_button.tpl"}), чтобы оставлять комментарии.
                                </h5>
                            </div>
                        </noindex>
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
                                <a class="link-dotted comment-button" href="javascript:;">Оставить комментарий</a>
                            </h4>
                            
                        </div>
                        
                    
                    	<div id="reply" class="reply">		
                			<form method="post" id="form_comment" onsubmit="return false;" enctype="multipart/form-data">
                				
                				
                				<textarea name="text" id="form_comment_text" class="mce-editor markitup-editor input-width-full"></textarea>
                				
                				
                				
                				<button type="submit"  name="submit_comment" 
                						id="comment-button-submit"  
                						class="btn btn-success">Опубликовать комментарий</button>
                				
                                {*
                                    <button type="button" onclick="ls.comments.preview();" class="button">предпросмотр</button>
                                *}
                				
                				<input type="hidden" name="parent" value="0" id="form_comment_reply" />
                				<input type="hidden" name="target_id" value="{$object.id}" />
                				<input type="hidden" name="pub_action" value="topics/comments/save" />
                			</form>
                		</div>
                    
                    {else if $object.comments_count}
                        <noindex>
                            <div style="margin: 30px 0 0;">
                                <h5>
                                    <a rel="nofollow" data-target="#loginLoginForm" data-toggle="modal" href="javascript:;">Авторизуйтесь</a> или <a href="{$modx->makeUrl(991)}">зарегистрируйтесь</a> (можно через соцсети {include file="inc/blocks/social_auth_button.tpl"}), чтобы оставлять комментарии.
                                </h5>
                            </div>
                        </noindex>
                    {/if} 
                    
                </div>
                
            </div>
            
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




