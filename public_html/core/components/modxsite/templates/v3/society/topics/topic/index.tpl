{*
    Выводим содержимое топика
*}

{$canReply = (bool)$modx->user->id}

{block name=params}
    
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

{processor action=$processor ns="modxsite" params=$params assign=result}

{if $result.success && $result.object}
    
    <div id="topic_list_{$modx->resource->id}" class="topic_list">
        
        {$users_url = $modx->makeUrl(626)}
        
        {$object = $result.object}
        
        {$modx->resource->content} 
        
        <hr/> 
        {include file="society/topics/layouts/info.tpl"}
        
        
        {*
            Если ветка была получена, получаем имеющиеся комменты
        *} 
        <a name="comments"></a>
        
        {if !$modx->user->id}
            <noindex>
                <div style="margin: 30px 0 0;">
                    <h5>
                        <a data-target="#myModal" data-toggle="modal" href="javascript:;">Авторизуйтесь</a> или <a href="{$modx->makeUrl(991)}">зарегистрируйтесь</a> (можно через соцсети {include file="inc/blocks/social_auth_button.tpl"}), чтобы оставлять комментарии.
                    </h5>
                </div>
            </noindex>
        {/if}
        
        <div id="comments-wrapper">
        
            {if $object.thread_id}
            
                {$params = [
                    "thread_id" => $object.thread_id,
                    "limit"         => 0
                ]}
                
                {processor action="web/society/threads/comments/getdata" ns="modxsite" params=$params assign=comments_result}
                    {if $object.comments_count}
                        <h3>{(int)$object.comments_count} {(int)$object.comments_count|spell:"комментарий":"комментария":"комментариев"}</h3>
                    {/if}
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
                        <a data-target="#myModal" data-toggle="modal" href="javascript:;">Авторизуйтесь</a> или <a href="{$modx->makeUrl(991)}">зарегистрируйтесь</a> (можно через соцсети {include file="inc/blocks/social_auth_button.tpl"}), чтобы оставлять комментарии.
                    </h5>
                </div>
            </noindex>
        {/if} 
        
        
        {literal}
            <script type="text/javascript">
            	jQuery(function($){
        			// Подключаем редактор
        			$('.markitup-editor').markItUp({
                		onShiftEnter:  	{keepDefault:false, replaceWith:'<br />\n'},
            			onTab:    		{keepDefault:false, replaceWith:'    '},
            			markupSet:  [
                            {name: 'жирный', className:'editor-bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
                			{name: 'курсив', className:'editor-italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)'  },
            				{name: 'зачеркнутый', className:'editor-stroke', key:'S', openWith:'<s>', closeWith:'</s>' },
            				{name: "подчеркнутый", className:'editor-underline', key:'U', openWith:'<u>', closeWith:'</u>' },
            				{separator:'---------------' },
            				{name: "цитировать", className:'editor-quote', key:'Q', replaceWith: function(m) { if (m.selectionOuter) return '<blockquote>'+m.selectionOuter+'</blockquote>'; else if (m.selection) return '<blockquote>'+m.selection+'</blockquote>'; else return '<blockquote></blockquote>' } },
            				{name: "код", className:'editor-code', openWith:'<code>', closeWith:'</code>' },
                            {name: "вставить ссылку", className:'editor-link', key:'L', openWith:'<a href="[![Введите ссылку:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' }
        			    ]
            		});
        		});
        	</script>
        {/literal}
        
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
        
    </div>
    
    
    
    
{else}
    <h4 class="error">{$result.message|default:"Не были получены данные топика"}</h4>
{/if}


<script type="text/javascript">
    
    var D = {
        
        inRequest: false
        
        ,init: function(block){
            this.block = block;
            
            this.block.on('click', '.comment-button', this, this.onClick);
            
            this.form = $('#reply form');
            
            this.form.on('submit', this, this.onSubmit);
        }
        
        ,onClick: function(e){
            /*console.log(e);
            console.log(this);*/
            
            var a = $(this);
            var wrapper = a.parent();
            var reply_form = $('#reply');
            var comment_id = wrapper.attr('data-comment-id');
            
            reply_form.find('#form_comment_reply').val(comment_id);
            
            console.log(a);
            console.log(wrapper);
            console.log(comment_id);
            
            
            
            wrapper.after(reply_form);
            
            $('#reply').show();
            return false;
        }
        
        ,onSubmit: function(e){
            
            var scope = e.data;
            
            var form = $(this);
            
            
            if(!scope.inRequest){ 
                
                scope.inRequest = true;
                var data = form.serialize();
                var comment_parent = form.find("[name=parent]").val();
                
                scope.form.find('.has-error').removeClass('has-error');
                
                $.ajax({
                    url: "assets/components/modxsite/connectors/connector.php"
                    ,type: "post"
                    ,dataType: "json"
                    ,data: data
                    ,error: function(){
                        scope.inRequest = false;
                        
                        alert("Ошибка выполнения запроса");
                        
                        return false;
                    }
                    ,success: function(response){ 
                        scope.inRequest = false;
                        
                        if(!response.success){
                            
                            alert(response.message || "Ошибка выполнения запроса");
                            
                            return;
                        }
                        
                        // else
                        alert(response.message || "Успешно");
                        scope.form[0].reset();
                        
                        $('#reply').hide();
                        
                        
                        // Подставляем код комментария
                        if(response.object && response.object.comment_html){
                            
                            // Подставляем или в ответ, или новым блоком
                            
                            var outer_block, inner_block;
                            
                            if(comment_parent > 0){
                                inner_block = $('#comment-' + comment_parent);
                                
                                outer_block = inner_block.find('.outer-tpl:first');
                                
                                if(!outer_block.length){
                                    outer_block = $('<div class="comment-list outer-tpl"></div>');
                                }
                            }
                            else{
                                
                                inner_block = $('#comments-wrapper');
                            }
                            
                            
                            if(!outer_block || !outer_block.length){
                                outer_block = $('<div class="comment-list outer-tpl"></div>');
                            }
                            
                            outer_block.append(response.object.comment_html);
                            
                            inner_block.append(outer_block);
                            
                        }
                        
                        return;
                    }
                });
            } 
            
            return false;
        }
         
    };
    
    D = Object.create(D)
        .init($('.topic_list'));
    
</script>




