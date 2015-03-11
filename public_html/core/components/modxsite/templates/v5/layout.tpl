<!doctype html>
{$site_name = $modx->getOption('site_name')}
{$site_url = $modx->getOption('site_url')}
{$site_start = $modx->getOption('site_start')}

{$keywords = $modx->resource->Attributes->topic_tags|default:$modx->resource->getTVValue('keywords')}

{block name=params}{/block}

<html>
    <head>
        
        <!-- base xhtml4 -->
        <base href="{$site_url}" />
        <link rel="shortcut icon" href="/favicon.ico"/> 
        <meta name="robots" content="{$meta_robots}" />
    	<link rel="canonical" href="{$meta_canonical}" />
    	<meta http-equiv="content-language" content="{$modx->getOption('cultureKey')}" />
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    	<meta http-equiv="pragma" content="cache" />
    	<meta http-equiv="cache-control" content="cache" />
    	<meta http-equiv="Content-Style-Type" content="text/css" />
    	<meta http-equiv="Content-Script-Type" content="text/javascript" />
    <!-- meta -->
    	<meta name="keywords" content="{$keywords}" />
    	<meta name="description" content="{$modx->resource->description}" />
    	
        {$last_modified = $last_modified|default:$modx->resource->editedon}
    	<meta http-equiv="last-modified" content="{gmdate('D, d M Y H:i:s \M\S\K', $last_modified)}" />
    	<meta name="author" content="{$site_name}" />
    	<meta name="copyright" content="Copyright (c) {date('Y', $modx->resource->createdon)} by {$site_name}" />
    	<meta name="generator" content="MODX CMS" />
        
        <link rel="alternate" type="application/rss+xml" href="{$modx->makeUrl(1160, '', '', 'full')}"> 
        
        <title>{block name=title_wrapper}{block name=title}{if $modx->getOption('site_start') != $modx->resource->id}{$meta_title} | {/if}{$site_name}{/block} | Обзоры, отзывы{/block}</title>
        
         
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="{$template_url}bootswatch/cerulean/bootstrap.css" media="screen">
        <link rel="stylesheet" href="{$template_url}bootswatch/assets/css/bootswatch.min.css">
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="{$template_url}bootswatch/bower_components/html5shiv/dist/html5shiv.js"></script>
          <script src="{$template_url}bootswatch/bower_components/respond/dest/respond.min.js"></script>
        <![endif]-->
        
        {*
        
        <script>
            // alert($.noConflict());
            // $.noConflict();
            jQuery.noConflict();
        </script>
        *}
        

        <link rel="stylesheet" href="{$template_url}bundle/styles/styles.css">
        
        {*
        <link rel="stylesheet" href="{$template_url}css/style.css">
        *}
         
    {literal}
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        
          ga('create', 'UA-39491207-3', 'auto');
          ga('send', 'pageview');
        
        </script>
    {/literal}
    
         
</head> 


        
        
        
{block name=body}
    <body id="doc_{$modx->resource->id}">
    
    
        <div class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a href="{$site_url}" class="navbar-brand"><div class="logo"><i class="str leaf leaf-l"></i><span class="str">Городские бани</span></div></a>
              <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            
            [[!Wayfinder@BootstrapTopMenu]]
            
          </div>
        </div>
        
        {block container}
        
            <div id="main" class="container">
            
                <div class="row">
                    <div class="col-md-9 col-sm-8 col-xs-12">
                    
                        {block pagetitle}
                            <h1 class="page-header"><span class="title">{$modx->resource->longtitle|default:$modx->resource->pagetitle}</span></h1>
                        {/block}
                    
                        {block content}
                            {$modx->resource->content}
                        {/block}
                    </div>
                
                    <div class="col-md-3 col-sm-4 col-xs-12">
                        {block sidebar}
                            {include "inc/blocks/sidebar/index.tpl"}
                        {/block}
                    </div>
                </div>
            
            </div>
        
        {/block}
        
        
        {block footer}
            <div class="navbar-default">
              <div class="container">
                  
                <div class="row">
                    <div class="pull-right col-lg-9">
                        {$menuParams = [
                            startId => 0,
                            level => 1,
                            outerClass => "nav navbar-nav pull-right nav-footer",
                            where => json_encode([
                                "id:not in" => [  239, 2, 1296]
                            ])
                        ]}
                        {snippet name=Wayfinder params=$menuParams as_tag=1}
                    </div>
                    <div class="col-lg-3">
                        {include file="inc/counters/index.tpl"}
                    </div>
                </div>
                
              </div>
            </div>
        {/block}
        
        
        {block markitup}
            <script src="{$template_url}libs/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
            <script src="{$template_url}libs/markitup/jquery.markitup.js" type="text/javascript"></script>
            <link href="{$template_url}libs/markitup/skins/synio/style.css" rel="stylesheet">
            <link href="{$template_url}libs/markitup/sets/synio/style.css" rel="stylesheet">
        {/block}
        
        
        {block editors}
        
            
            {*
                Написать топик
            *}
            
            {if in_array($modx->resource->id, [999, 1140])}
                {include "inc/blocks/scripts/topics/create.tpl"}
            {else}
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
                        
                        var a = $(this);
                        var wrapper = a.parent();
                        var reply_form = $('#reply');
                        var comment_id = wrapper.attr('data-comment-id');
                        
                        reply_form.find('#form_comment_reply').val(comment_id);
                        // 
                        // console.log(a);
                        // console.log(wrapper);
                        // console.log(comment_id);
                        
                        
                        
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

        
        {/block}
        
        
    
        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script> 
        <script src="{$template_url}bootswatch/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="{$template_url}bootswatch/assets/js/bootswatch.js"></script>
        
        {include "inc/login/modal.tpl"}
        
        {block name=libs}
        
            <link rel="stylesheet" href="{$template_url}bootswatch/bower_components/font-awesome/css/font-awesome.min.css">
             
            <link rel='stylesheet' type='text/css' href='/assets/components/directresize/highslide/highslide.css' />
        
        
            <script type='text/javascript' src='/assets/components/directresize/js/highslide-with-gallery.min.js'></script>
            <script type='text/javascript'>
                hs.graphicsDir = '/assets/components/directresize/highslide/graphics/';
                hs.outlineType = 'rounded-white';
                hs.captionEval = 'this.thumb.title';
                hs.captionOverlay.position = 'below';
                hs.dimmingOpacity = 0.40;
                hs.numberPosition = 'caption';
                hs.lang.number = 'Image %1 of %2';
                hs.maxWidth = '800';
                hs.maxHeight = '600';
                hs.lang.creditsText = 'Highslide JS';
            </script>
        {/block}
        
        {block name=footers}    
            <script src="{$template_url}vendor/AlertifyJS/build/alertify.min.js"></script>
            <script src="{$template_url}bundle/app.js"></script>
        {/block}
        
        {block society_scripts}
        
            
    
            <script type="text/javascript">
                
                (new function(){
                    
                    this.inRequest = false;
                    
                    this.init = function(){
                        this.addListeners();
                    } 
                    
                    this.addListeners = function(){
                        $('.topic_vote').on('click', this, this.doVote);
                    }
                    
                    this.doVote = function(obj){
                        
                        var scope = obj.data;
                        
                        
                        if(scope.inRequest){
                            return false;
                        }
                        
                        // else
                        scope.inRequest = true;
                        
                        var a = $(this);
                        var topic_list = a.parents('.topic_list:first');
                        console.log(topic_list);
                        var target_id = topic_list.attr('id').replace('topic_list_', '');
                        var vote_direction = a.attr('vote_direction');
                        
                        $.ajax({
                            "url":"assets/components/modxsite/connectors/society.php",
                            "type": "POST",
                            "dataType": "json",
                            "data":{
                                "pub_action": "topics/votes/create",
                                "target_id"  : target_id,
                                "vote_direction": vote_direction
                            },
                            "error": function(response){
                                scope.inRequest = false;
                                alert('Ошибка выполнения запроса');
                            },
                            "success": function(response){
                                scope.inRequest = false;
                                response = response || {};
                                
                                if(!response.success){
                                    alert(response.message || 'Ошибка выполнения запроса');
                                    return;
                                }
                                
                                // else
                                alert(response.message || 'Ваш голос успешно принят');
                                
                                // Обновляем значение рейтинга
                                var rating = topic_list.find('.rating:first');
                                rating.text( (parseInt(rating.text()) || 0)*1 + response.object.vote_value*1);
                                
                                return;
                            }
                        });
                        return false;
                    }
                }).init();
                
                
                (new function(){
                    
                    this.inRequest = false;
                    
                    this.init = function(){
                        this.addListeners();
                    } 
                    
                    this.addListeners = function(){
                        $('.comment_vote').on('click', this, this.doVote);
                    }
                    
                    this.doVote = function(obj){
                        
                        var scope = obj.data;
                        
                        
                        if(scope.inRequest){
                            return false;
                        }
                        
                        // else
                        scope.inRequest = true;
                        
                        var a = $(this);
                        var comment = a.parents('.comment:first');
                        var target_id = comment.attr('id').replace('comment-', '');
                        var vote_direction = a.attr('vote_direction');
                        
                        $.ajax({
                            "url":"assets/components/modxsite/connectors/society.php",
                            "type": "POST",
                            "dataType": "json",
                            "data":{
                                "pub_action": "topics/comments/votes/create",
                                "target_id"  : target_id,
                                "vote_direction": vote_direction
                            },
                            "error": function(response){
                                scope.inRequest = false;
                                alert('Ошибка выполнения запроса');
                            },
                            "success": function(response){
                                scope.inRequest = false;
                                response = response || {};
                                
                                if(!response.success){
                                    alert(response.message || 'Ошибка выполнения запроса');
                                    return;
                                }
                                
                                // else
                                alert(response.message || 'Ваш голос успешно принят');
                                
                                // Обновляем значение рейтинга
                                var rating = comment.find('.rating:first');
                                rating.text( (parseInt(rating.text()) || 0)*1 + response.object.vote_value*1 );
                                
                                return;
                            }
                        });
                        return false;
                    }
                }).init();
                
            </script>
            
            {if in_array($modx->resource->id, [999, 1140])}
                {$modx->regClientCSS("{$template_url}libs/select2/select2-3.5.1/select2.css")}
                <script type="text/javascript" src="{$template_url}libs/select2/select2-3.5.1/select2.js"></script>
                
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
            {/if}
            
        
        {/block}
        
    </body>
{/block}
    
     
 

    
</html>