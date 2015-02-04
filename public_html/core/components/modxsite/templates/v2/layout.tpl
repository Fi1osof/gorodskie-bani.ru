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
        
        <script src="{$template_url}libs/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
        
        <script src="{$template_url}libs/markitup/jquery.markitup.js" type="text/javascript"></script>
        <link href="{$template_url}libs/markitup/skins/synio/style.css" rel="stylesheet">
        <link href="{$template_url}libs/markitup/sets/synio/style.css" rel="stylesheet">
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="{$template_url}libs/bootstrap/css/bootstrap.css" rel="stylesheet">
        
        {*
             
            <script src="{$template_url}libs/prettify/prettify.js" type="text/javascript"></script>
            <link href="{$template_url}libs/prettify/prettify.css" rel="stylesheet">
            <script type="text/javascript">
                $(function(){
                    prettyPrint();    
                });
            </script>
            
            <link href="{$template_url}css/style.css" rel="stylesheet">
        *}
        
        
        
        {* Original CSS and JS *}
         
        <link type="text/css" rel="stylesheet" href="{$template_url}original/style.css" /> 
        
        <!--[if IE]>
    		<link rel="stylesheet" type="text/css" href="{$template_url}original/ie.css" />
    	<![endif]-->	 
        
        <link rel="stylesheet" type="text/css" href="{$template_url}original/plugins/Viva-ThumbZoom/lib/v-zoom/viva-zoom.css"  />

		<script type='text/javascript' src='{$template_url}original/plugins/Viva-ThumbZoom/lib/v-zoom/viva-zoom-mini.js'></script>

		<script type='text/javascript'>
       // 26f2c0bd88ed1fe0be78a57439b97490
 		vz.graphicsDir = '{$template_url}original/plugins/Viva-ThumbZoom/lib/v-zoom/graphics/';

		vz.outlineType = 'rounded-white';

	</script>
        
        {* Eof Original CSS and JS *}
        
        
        
    <link type="text/css" rel="stylesheet" href="{$template_url}css/style.css" /> 
        
    
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


<body>
        
        
        
{block name=body}
      
      
<a href="{$site_url}" title="{$site_name}">
    <div id="venik">
        {*
            <!-- <img src="{$template_url}original/images/venik.png" /> -->
        *} 
    </div>  
</a>
        
<div id="start">
    
    {*
    {$height = 300}
	<object height="{$height}" width="860">
		<param value="{$template_url}original/images/05.swf" name="movie"></param>
		<param name="quality" value="high">
 		<param name="wmode" value="window" />
		<embed src="{$template_url}original/images/05.swf" height="{$height}" width="860"></embed>
	</object>  
    *}

</div>
            
        
<div id="container">
    
    
    <div id="header">  </div>
            
  	<br class="clear" />
              
	<div id="content">
    
		<div id="main">
			<div id="post">	
			  	   
                {block name=pagetitle}
                    <h1 class="title">{$modx->resource->longtitle|default:$modx->resource->pagetitle}</h1>
                {/block}
                     
                {block name=content}
                    {$modx->resource->content}
                {/block}
                  
			</div>
    	</div>
     
             
             
             
        {include file="inc/blocks/sidebar/index.tpl"}
             
             
        
    	<!-- <br class="clear" /> -->
    
    </div>
        
    
    <div id="foo"></div>
    
    <div id="extra"></div>

    <div id="footer" style="position:relative;">
    
    	<noindex>
        	<div class="copy" style="width: 85%;">По вопросам размещения рекламы обращаться по email: info@gorodskie-bani.ru
            	<p>Запрещается полное или частичное копирование информации без письменного разрешения администрации сайта gorodskie-bani.ru. Несанкционированно копируя материалы</br> с этого ресурса Вы нарушаете статью 146 Уголовного Кодекса Российской Федерации.</p> 
        	    <p><a href="http://koza-2015.ru/">Подарки на новый год</a></p>   
        	</div> 
    	</noindex>
        
        {include file="inc/counters/index.tpl"}

	</div> 
        
</div>

<div id="end"></div>

    
    
    
    {/block}
    
    
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Вход</h4>
        </div>
        <div class="modal-body">
            [[!login?loginTpl=`LoginTpl`]]
        </div>
    </div>
  </div>
</div>
    
    <script src="{$template_url}js/config.js"></script>
    
    {block name=libs}
        
        
        <script src="{$template_url}libs/jquery/jquery-ui-1.10.3.custom.min.js"></script>
        <script src="{$template_url}libs/jquery/jquery.ui.touch-punch.min.js"></script>
        <script src="{$template_url}libs/bootstrap/js/bootstrap.min.js"></script>
        <script src="{$template_url}libs/bootstrap/js/bootstrap-select.js"></script>
        <script src="{$template_url}libs/bootstrap/js/bootstrap-switch.js"></script>
        <script src="{$template_url}libs/ui/js/checkbox.js"></script>
        <script src="{$template_url}libs/ui/js/radio.js"></script>
        <script src="{$template_url}libs/jquery/jquery.tagsinput.js"></script>
        <script src="{$template_url}libs/jquery/jquery.placeholder.js"></script>
    

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
                    var topic_list = a.parents('.topic_list');
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

    {/block}
    
    {block name=page}
        <script data-main="{$template_url}js/pages/layout" src="{$template_url}libs/require/require.js"></script>
    {/block}
 

</body>
    
</html>