{*
    Создание нового топика
*}

{$modx->regClientCSS("{$template_url}libs/select2/select2-3.5.1/select2.css")}
{$modx->regClientStartupScript("{$template_url}libs/select2/select2-3.5.1/select2.js")}

{block name=params}

{/block}


{literal}
    <script type="text/javascript">
    	jQuery(function($){
    		// ls.lang.load({"panel_b":"\u0436\u0438\u0440\u043d\u044b\u0439","panel_i":"\u043a\u0443\u0440\u0441\u0438\u0432","panel_u":"\u043f\u043e\u0434\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439","panel_s":"\u0437\u0430\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439","panel_url":"\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443","panel_url_promt":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443","panel_code":"\u043a\u043e\u0434","panel_video":"\u0432\u0438\u0434\u0435\u043e","panel_image":"\u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435","panel_cut":"\u043a\u0430\u0442","panel_quote":"\u0446\u0438\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c","panel_list":"\u0421\u043f\u0438\u0441\u043e\u043a","panel_list_ul":"UL LI","panel_list_ol":"OL LI","panel_title":"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a","panel_clear_tags":"\u043e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043e\u0442 \u0442\u0435\u0433\u043e\u0432","panel_video_promt":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0432\u0438\u0434\u0435\u043e","panel_list_li":"\u043f\u0443\u043d\u043a\u0442 \u0441\u043f\u0438\u0441\u043a\u0430","panel_image_promt":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435","panel_user":"\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f","panel_user_promt":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043b\u043e\u0433\u0438\u043d \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"});
    		// Подключаем редактор
    		$('.markitup-editor').markItUp({
                onShiftEnter:      {keepDefault:false, replaceWith:'<br />\n'},
    			onTab:    		{keepDefault:false, replaceWith:'    '},
                markupSet:  [
        			{name:'H4', className:'editor-h4', openWith:'<h4>', closeWith:'</h4>' },
    				{name:'H5', className:'editor-h5', openWith:'<h5>', closeWith:'</h5>' },
    				{name:'H6', className:'editor-h6', openWith:'<h6>', closeWith:'</h6>' },
    				{separator:'---------------' },
    				{name: 'жирный', className:'editor-bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
    				{name: 'курсив', className:'editor-italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)'  },
    				{name: 'зачеркнутый', className:'editor-stroke', key:'S', openWith:'<s>', closeWith:'</s>' },
    				{name: "подчеркнутый", className:'editor-underline', key:'U', openWith:'<u>', closeWith:'</u>' },
    				{name: "цитировать", className:'editor-quote', key:'Q', replaceWith: function(m) { if (m.selectionOuter) return '<blockquote>'+m.selectionOuter+'</blockquote>'; else if (m.selection) return '<blockquote>'+m.selection+'</blockquote>'; else return '<blockquote></blockquote>' } },
    				{name: "код", className:'editor-code', openWith:'<code>', closeWith:'</code>' },
    				{separator:'---------------' },
    				{name: "список", className:'editor-ul', openWith:'    <li>', closeWith:'</li>', multiline: true, openBlockWith:'<ul>\n', closeBlockWith:'\n</ul>' },
    				{name: "нумерованный список", className:'editor-ol', openWith:'    <li>', closeWith:'</li>', multiline: true, openBlockWith:'<ol>\n', closeBlockWith:'\n</ol>' },
    				{name: "пункт списка", className:'editor-li', openWith:'<li>', closeWith:'</li>' },
    				{separator:'---------------' },
    				// {name: "изображение", className:'editor-picture', key:'P', beforeInsert: function(h) { jQuery('#window_upload_img').jqmShow(); } },
    				{name: "вставить ссылку", className:'editor-link', key:'L', openWith:'<a href="[![Введите ссылку:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
    				{separator:'---------------' },
    				{name: "очистить текст от тегов", className:'editor-clean', replaceWith: function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } },
    				{name: "кат", className:'editor-cut', replaceWith: function(markitup) { if (markitup.selection) return '<cut name="'+markitup.selection+'">'; else return '<cut>' }}
    			]
            
    		});
    	});
    </script>
{/literal}

{*
    				{name: ls.lang.get('panel_video'), className:'editor-video', replaceWith:'<video>[!['+ls.lang.get('panel_video_promt')+':!:http://]!]</video>' },
    				{name: ls.lang.get('panel_user'), className:'editor-user', replaceWith:'<ls user="[!['+ls.lang.get('panel_user_promt')+']!]" />' },

*}

{block name=form}
    
    {*
        Проверяем авторизован ли пользователь
    *}
    
    {if $modx->user->id}
    
        <form class="wrapper-content" id="form-topic-add" enctype="multipart/form-data" method="POST" action="">
         
    	<input type="hidden" name="pub_action" value="{$action|default:'topic/save'}" />
    	<input type="hidden" name="topic_id" value="{$topic->id}" />
        
        
    	
    	<p><label for="blogs">В какой блог публикуем?</label>
    	<select class="form-control input-width-full"  id="blogs" name="blogs">
                
            {*
                Получаем все доступные блоги
            *}
            
            {$params=[
                "check_for_post"    => 1,
                "limit" => 0
            ]}
            
            {if $blog = current($topic->TopicBlogs)}
                {$blog_id = $blog->blogid}
                {$params.blogs = $blog_id}
            {else}
                {$blog_id = 0}
        		<option value="0">Мой персональный блог</option>
            {/if} 
            
            {processor action="web/society/blogs/getdata" ns="modxsite" params=$params assign=result}
            
            {foreach $result.object as $blog}
    			<option value="{$blog.id}" {if $blog_id == $blog.id}selected{/if}>{$blog.pagetitle}</option>
                
            {/foreach}
                
    	</select>
    	<small class="note">Для того чтобы написать в определенный блог, вы должны, для начала, вступить в него.</small></p>
    
    	
    	<script type="text/javascript">
    		jQuery(document).ready(function($){
    			// ls.blog.loadInfo($('#blog_id').val());
    		});
        </script>
    	
    	
    	<div class="form-group"><label for="topic_title">Заголовок:</label>
        	<input type="text" class="form-control input-text input-width-full" value="{$topic->pagetitle}" name="pagetitle" id="topic_title">
        	<small class="note">Заголовок должен быть наполнен смыслом, чтобы можно было понять, о чем будет топик.</small>
        </div>
    
    	
    	<label for="topic_text">Текст:</label>
    	<textarea rows="20" class="mce-editor markitup-editor input-width-full" id="topic_text" name="content">{$topic->Attributes->raw_content|default:$topic->content}</textarea> 
        
        <a onclick="jQuery('#tags-help').toggle(); return false;" class="link-dotted help-link" href="javascript:;">Доступны html-теги</a>
    
    <dl id="tags-help" class="help clearfix" style="display:none;">
    	<dt class="help-col help-wide">
    		<h3>Специальные теги</h3>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;cut&gt;</a></h4>
    			Используется для больших текстов, скрывает под кат часть текста, следующую за тегом (будет написано «Читать дальше»).
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;cut name="Подробности"&gt;</a></h4>
    			Так можно превратить надпись «Читать дальше» в любой текст.
    		</div>
            
            {*
        		<div class="help-item">
        			<h4><a data-insert="&lt;video&gt;&lt;/video&gt;" class="link-dashed js-tags-help-link" href="#">&lt;video&gt;http://...&lt;/video&gt;</a></h4>
        			Добавляет в пост видео со следующих хостингов: YouTube, RuTube, Vimeo и Я.Видео. <br>Вставляйте между тегами только прямую ссылку на видеоролик.
        		</div>
        		<div class="help-item">
        			<h4><a data-insert="&lt;ls user=&quot;&quot; /&gt;" class="link-dashed js-tags-help-link" href="#">&lt;ls user="Ник" /&gt;</a></h4>
        			Выводит имя пользователя посреди текста.
        		</div>
            *}
            
    	</dt>
    	<dt style="margin-top: 20px;" class="help-col help-wide">
    		<h3>Стандартные теги</h3>
    	</dt>
    	<dt class="help-col help-left">
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;h4&gt;&lt;/h4&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;h5&gt;&lt;/h5&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;h6&gt;&lt;/h6&gt;</a></h4>
    			Заголовки разного уровня.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;img src="" /&gt;</a></h4>
    			Вставка изображения, в атрибуте src нужно указывать полный путь к изображению. Возможно выравнивание картинки атрибутом align.
    		</div>
    		<div class="help-item">
    			<h4><a data-insert="&lt;a href=&quot;&quot;&gt;&lt;/a&gt;" class="link-dashed js-tags-help-link" href="#">&lt;a href="http://..."&gt;Ссылка&lt;/a&gt;</a></h4>
    			Вставка ссылки, в атрибуте href указывается желаемый интернет-адрес или якорь (anchor) для навигации по странице.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;b&gt;&lt;/b&gt;</a></h4>
    			Выделение важного текста, на странице выделяется жирным начертанием.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;i&gt;&lt;/i&gt;</a></h4>
    			Выделение важного текста, на странице выделяется курсивом.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;s&gt;&lt;/s&gt;</a></h4>
    			Текст между этими тегами будет отображаться как зачеркнутый.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;u&gt;&lt;/u&gt;</a></h4>
    			Текст между этими тегами будет отображаться как подчеркнутый.
    		</div>
    	</dt>
    	<dd class="help-col help-right">
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;hr /&gt;</a></h4>
    			Тег для вставки горизонтальной линии.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;blockquote&gt;&lt;/blockquote&gt;</a></h4>
    			Используйте этот тег для выделения цитат.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;table&gt;&lt;/table&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;th&gt;&lt;/th&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;td&gt;&lt;/td&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;tr&gt;&lt;/tr&gt;</a></h4>
    			Набор тегов для создания таблицы. Тег &lt;td&gt; обозначает ячейку таблицы, тег &lt;th&gt; - ячейку в заголовке, &lt;tr&gt; - строчку таблицы. Все содержимое таблицы помещайте в тег &lt;table&gt;.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;ul&gt;&lt;/ul&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;li&gt;&lt;/li&gt;</a></h4>
    			Ненумерованный список; каждый элемент списка задается тегом &lt;li&gt;, набор элементов списка помещайте в тег &lt;ul&gt;.
    		</div>
    		<div class="help-item">
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;ol&gt;&lt;/ol&gt;</a></h4>
    			<h4><a class="link-dashed js-tags-help-link" href="#">&lt;li&gt;&lt;/li&gt;</a></h4>
    			Нумерованный список; каждый элемент списка задается тегом &lt;li&gt;, набор элементов списка помещайте в тег &lt;ol&gt;.
    		</div>
    	</dd>
    </dl>		<br>
    		<br>
    	
        
        {*
            Теги топика
        *}
    	<p><label for="topic_tags">Теги:</label>
        
    	<input type="text" class="input-width-full" value="{$topic->Attributes->topic_tags}" name="topic_tags" id="topic_tags">
        
        
    	<small class="note">Теги нужно разделять запятой. Например: google, вконтакте, кирпич</small></p>
        
        {*
            Получаем все теги
        *}
        {processor action="web/society/topics/topictags/getunique" ns="modxsite" assign=result}
        {$tags = (array)$result.object}
        
        <script>
            $("#topic_tags").select2({
                tags: {json_encode($tags)}
            });
        </script>
    
        {*
    	<p><label><input type="checkbox" value="1" class="input-checkbox" name="topic_forbid_comment" id="topic_forbid_comment">
    	Запретить комментировать</label>
    	<small class="note">Если отметить эту галку, то нельзя будет оставлять комментарии к топику</small></p>
    	
        <p><label><input type="checkbox" value="1" class="input-checkbox" name="topic_publish_index" id="topic_publish_index">
    	Принудительно вывести на главную</label>
    	<small class="note">Если отметить эту галку, то топик сразу попадёт на главную страницу (опция доступна только администраторам)</small></p>
    
    	<input type="hidden" value="topic" name="topic_type">
    	<input type="hidden" name="action_type" value="" />
        *}
    	
    
    	
    	
    	
    	
    	<button class="btn btn-success action" id="submit_topic_publish" name="topic_publish" value="1" type="submit">Опубликовать</button>
    	<button class="btn btn-info action" name="submit_preview">Предпросмотр</button>
        
        {*
    	    <button class="btn btn-warning action" id="submit_topic_save" name="save_draft">Сохранить в черновиках</button>
        *}
        
    </form>

    {else}
        
        <div style="margin: 30px 0 0;">
            <h5>
                <a data-target="#myModal" data-toggle="modal" href="javascript:;">Авторизуйтесь</a> или <a href="{$modx->makeUrl(991)}">зарегистрируйтесь</a> (можно через соцсети {include file="inc/blocks/social_auth_button.tpl"}), чтобы написать топик.
            </h5>
        </div>
        
    {/if}
    
{/block}
    

<div id="topik_preview"></div>


<script type="text/javascript">
    
    (function(){
        
        var D = {
            init:function(obj){
                this.form = obj;
                
                this.inRequest = false; 
                
                this.form.on('submit', this, this.onSubmit);
                
                this.form.find('input').on('focus', function(){ 
                    $(this).parents('.form-group:first').removeClass('has-error');
                });
                
                // Переключение действия
                this.form.find('.action').on('click', this, function(e){ 
                    // $(this).parents('.form-group:first').removeClass('has-error');
                    
                    var item = $(this);
                    var name = item.attr('name');
                    
                    switch(name){
                        
                        case "submit_preview":
                            
                            $("#topik_preview").html($('.markItUpEditor').val().replace(/[\n\r]+/g, '<br />'));
                            return false;
                        
                        default:
                            $("[name=action_type]").val(name);
                    }
                     
                    return true;
                });
                
                
                return this;
            } 
            
            
            ,request: function(data){
                scope = this; 
                
                if(!scope.inRequest){
                    
                    var form = scope.form; 
                    
                    scope.inRequest = true;
                    
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
                            
                                if(response.data && response.data.length){
                                    for(var i in response.data){
                                        var field, msg;
                                        field = response.data[i].id;
                                        msg = response.data[i].msg; 
                                        if(field && msg){  
                                            
                                            form.find('[name=' + field + ']')
                                                .val('')
                                                .attr('placeholder', msg)
                                                .parents('.form-group:first')
                                                .addClass('has-error');
                                        }
                                    }
                                }
                                
                                alert(response.message || "Ошибка выполнения запроса");
                                
                                return;
                            }
                            
                            // else
                            alert(response.message || "Успешно");
                            
                            window.location.replace('/?id=' + response.object.id);
                            // scope.form[0].reset();
                            
                            return;
                        }
                    });
                }
                
            }
            
            ,onSubmit: function(e){
                var scope = e.data;
                
                var form = e.data.form;
                var data = form.serialize(); 
                
                form.find('[name=action_type]').val('');
                
                scope.request(data);
                 
                return false;
            }
        }
    
        D = Object.create(D).init($('#form-topic-add'));

    })();     
    
</script>




