{*
    Создание нового топика
*}
 

{block name=params}

{/block}



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
        
        	
        	
        	<div class="form-group"><label for="topic_title">Заголовок:</label>
            	<input type="text" class="form-control input-text input-width-full" value="{$topic->pagetitle}" name="pagetitle" id="topic_title">
            	<small class="note">Заголовок должен быть наполнен смыслом, чтобы можно было понять, о чем будет топик.</small>
            </div>
        
        	
        	<label for="topic_text">Текст:</label>
        	<textarea rows="20" class="mce-editor markitup-editor input-width-full" id="topic_text" name="content">{$topic->Attributes->raw_content|default:$topic->content}</textarea> 
            
            <a onclick="$('#tags-help').toggle(); return false;" class="link-dotted help-link" href="javascript:;">Доступны html-теги</a>
        
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
        
        <div>
        	<label for="topic_tags">Теги:</label>
            
        	<input type="text" class="input-width-full" value="{$topic->Attributes->topic_tags}" name="topic_tags" id="topic_tags" style="width:90%;">
        	<small class="note">Теги нужно разделять запятой. Например: google, вконтакте, кирпич</small>
        </div>
        
        {*
            Источник
        *}
        {if $topic->id} 
            {$original_source = $topic->getTVValue('original_source')}
        {/if}
        <div>
        	<label for="original_source">Источник:</label>
            
        	<input type="text" class="input-width-full" value="{$original_source}" name="original_source" id="original_source" style="width:90%;" placeholder="Начинаться должна с http:// или https:// и вести на конечную страницу">
        	<small class="note">Ссылка на оригинал статьи (полная)</small>
        </div>
        
        
        
        
        {*
            Не отправлять
        *}
        {block no_send_mails_field}
            <div>
                <input type="checkbox" id="no_send_emails" value="1" name="no_send_emails"/>
                <label for="no_send_emails">Не отправлять емейл-рассылку</label>
            </div>
        {/block}
    
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



