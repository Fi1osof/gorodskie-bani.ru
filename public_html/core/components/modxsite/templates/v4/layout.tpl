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
        <link rel="stylesheet" href="{$template_url}bootswatch/bower_components/font-awesome/css/font-awesome.min.css">
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
        
        <script src="{$template_url}libs/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
        <script src="{$template_url}libs/markitup/jquery.markitup.js" type="text/javascript"></script>
        <link href="{$template_url}libs/markitup/skins/synio/style.css" rel="stylesheet">
        <link href="{$template_url}libs/markitup/sets/synio/style.css" rel="stylesheet">
         
        <link rel='stylesheet' type='text/css' href='/assets/components/directresize/highslide/highslide.css' />

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
              <a href="{$site_url}" class="navbar-brand">Городские бани</a>
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
                        {snippet name=Wayfinder params="startId=`0`&level=`1`&outerClass=`nav navbar-nav pull-right nav-footer`"}
                    </div>
                    <div class="col-lg-3">
                        {include file="inc/counters/index.tpl"}
                    </div>
                </div>
                
              </div>
            </div>
        {/block}
    
        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script> 
        <script src="{$template_url}bootswatch/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="{$template_url}bootswatch/assets/js/bootswatch.js"></script>
        
        {include "inc/login/modal.tpl"}
        
        
        {block name=libs}
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
        
    </body>
{/block}
    
     
 

    
</html>