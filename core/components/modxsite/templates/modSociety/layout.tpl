<!doctype html>
{$site_name = $modx->getOption('site_name')}
{$site_url = $modx->getOption('site_url')}
{$site_start = $modx->getOption('site_start')}

{block name=params}{/block}

<html>
    <head>
        
        <!-- base xhtml4 -->
        <base href="{$site_url}" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta name="robots" content="{$meta_robots}" />
    	<link rel="canonical" href="{$meta_canonical}" />
    	<meta http-equiv="content-language" content="{$modx->getOption('cultureKey')}" />
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    	<meta http-equiv="pragma" content="cache" />
    	<meta http-equiv="cache-control" content="cache" />
    	<meta http-equiv="Content-Style-Type" content="text/css" />
    	<meta http-equiv="Content-Script-Type" content="text/javascript" />
    <!-- meta -->
    	<meta name="keywords" content="[[*keywords]]" />
    	<meta name="description" content="{$modx->resource->description}" />
    	
        {$last_modified = $last_modified|default:$modx->resource->editedon}
    	<meta http-equiv="last-modified" content="{gmdate('D, d M Y H:i:s \M\S\K', $last_modified)}" />
    	<meta name="author" content="{$site_name}" />
    	<meta name="copyright" content="Copyright (c) {date('Y', $modx->resource->createdon)} by {$site_name}" />
    	<meta name="generator" content="MODX CMS" />
        
        <link rel="alternate" type="application/rss+xml" href="{$modx->makeUrl(1160, '', '', 'full')}"> 
        
        <title>{block name=title}{$meta_title} | {$site_name}{/block}</title>
        
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="{$template_url}libs/bootstrap/css/bootstrap.css" rel="stylesheet">
        
        <script src="{$template_url}libs/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
        
        <script src="{$template_url}libs/markitup/jquery.markitup.js" type="text/javascript"></script>
        <link href="{$template_url}libs/markitup/skins/synio/style.css" rel="stylesheet">
        <link href="{$template_url}libs/markitup/sets/synio/style.css" rel="stylesheet">
         
        <script src="{$template_url}libs/prettify/prettify.js" type="text/javascript"></script>
        <link href="{$template_url}libs/prettify/prettify.css" rel="stylesheet">
        <script type="text/javascript">
            $(function(){
                prettyPrint();    
            });
        </script>
        
        <link href="{$template_url}css/style.css" rel="stylesheet">
         
    </head>
    


<body>
        
        
        
        {block name=body}
        <div id="body">
            
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="container navbar-inner">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="{$site_url}" title="{$site_name}">
                            {$site_name}
                        </a>
                    </div>
                
                    [[!smarty?tpl=`inc/blocks/login.tpl`]]
                    
                </div>
                    
            </nav>

        
        <div class="container">
            <div class="row">
                <div class="col-md-9 v-delim">
                
                    {block name=pagetitle}
                        {if $site_start != $modx->resource->id}
                            <h1>{$modx->resource->longtitle|default:$modx->resource->pagetitle}</h1>
                        {/if}
                    {/block}
                    {block name=content}
                        {$modx->resource->content}
                    {/block} 
                    
                </div>
                <div class="col-md-3">
                    {include file="inc/blocks/sidebar/index.tpl"}
                </div>
            </div>
        </div>
        
        
        </div>
        {/block}
        <footer class="bottom-menu bottom-menu-inverse bottom-menu-large">
            <div class="container">
                <div class="row">
                    <div class="col-md-2 col-sm-3 navbar-brand">
                    <a href="{$site_url}">{$site_name}</a><br/>
                    </div>
                    
                    [[!smarty?tpl=`inc/blocks/footer/usermenu.tpl`]]
                    
                    <div class="col-md-2 col-sm-3">
                        <h5 class="title">Разделы</h5>
                        <ul class="bottom-links">
                            <li><a href="{link id=23}" title="Категории">Категории</a></li>
                            <li><a href="{link id=2}" title="Люди">Люди</a></li>
                            <li><a href="{link id=986}" title="Комментарии">Комментарии</a></li>
                            {* 
                            <li><a href="{link id=309}" title="Топики">Топики</a></li>
                            <li><a href="#" title="Активность">Активность</a></li>
                            *}
                        </ul>
                    </div>
                    <div class="col-md-2 col-sm-3">
                        
                    </div>
                    <div class="col-md-1 visible-md visible-lg"></div>
                    <div class="clearfix visible-sm"></div>
                    <div class="col-md-3 col-sm-12">
                        <h5 class="title">Copyright &copy; {date('Y')} {$site_name}</h5>
                        <div style="">
                            {literal}
                                <!-- Yandex.Metrika informer -->
                                <!-- /Yandex.Metrika informer -->
                            {/literal}
                		</div> 
                    </div>
                </div>
            </div>
        </footer>
        
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
{*
<script>
//опустить подвал вниз экрана при маленьком body
    function resizeBody(){
        $('#body').css('min-height',$(window).innerHeight()-$('footer').height()-80);
    }
        
    $(document).ready(function(){
        resizeBody();
        $(window).resize(resizeBody);
    })
</script>        
*}
        {/block}
        {block name=page}
            <script data-main="{$template_url}js/pages/layout" src="{$template_url}libs/require/require.js"></script>
        {/block}
    
    </body>
    
</html>