{extends file="layout.tpl"}
  
{block container}
    
    {include "companies/list/map/mainpage/list.tpl"}
    
    <div class="container type_buttons">
        <div class="row">
            <div class="col-md-5"><a class="btn btn-success btn-lg btn-block" href="/"><i class="glyphicon glyphicon-ok"></i> Общественные бани</a></div>
            <div class="col-md-5 col-md-offset-2"><a class="btn btn-info btn-lg btn-block" href="{$modx->makeUrl(1468)}">Сауны и частные бани</a></div>
        </div>
    </div>
    
    {*
    <noindex>
        
        <div class="container block">
            <a href="http://sokolinka33.ru/">
                <img class="img img-responsive" src="assets/images/site/sb_1024 (1).jpg" style="width:100%;">
            </a>
        </div>
    </noindex>
    *}
    
    <div class="container block">
        <h2 class="page-header">
            <a class="title" href="{$modx->makeUrl(1197)}">Бани в Москве</a>
        </h2>
        
        {include "companies/list/mainpage/list.tpl"}
        
    </div>
     
    
    
    <div class="container block">
        
        <div class="row">
        
            <div class="col-md-6">
             
                <h2 class="page-header">
                    <a class="title" href="{$modx->makeUrl(1274)}">Последние обзоры и отзывы</a>
                </h2>    
                {*include "society/topics/obzory/mainpage/list.tpl" topic_list_col_class="col-lg-12" as_tag=1*}
                
                {$params = [
                    tpl => "society/topics/obzory/mainpage/list.tpl",
                    topic_list_col_class => "col-lg-12"
                ]}
                
                {snippet name=smarty params=$params as_tag=1}
            </div>
        
            <div class="col-md-6">
             
                <h2 class="page-header">
                    <a class="title" href="{$modx->makeUrl(986)}">Последние комментарии</a>
                </h2>    
                {*include "society/topics/comments/mainpage/list.tpl" as_tag=1*}
                
                {$params = [
                    tpl => "society/topics/comments/mainpage/list.tpl"
                ]}
                {snippet name=smarty params=$params as_tag=1}
            </div>
                 
        </div>
        
        <div class="row">
        
            <div class="col-md-12">
             
                <h2 class="page-header">
                    <a class="title" href="{$modx->makeUrl(309)}">Последние новости и публикации</a>
                </h2>    
                {*include "society/topics/mainpage/list.tpl" topic_list_col_class="col-lg-12" as_tag=1*} 
                
                {$params = [
                    tpl => "society/topics/mainpage/list.tpl",
                    topic_list_col_class => "col-lg-12"
                ]}
                {snippet name=smarty params=$params as_tag=1}
            </div>
                 
        </div>
        
    </div>

{/block}