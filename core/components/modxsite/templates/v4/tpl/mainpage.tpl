{extends file="layout.tpl"}
  
{block container}

    <div class="container">
        <h2 class="page-header">
            <a class="title" href="{$modx->makeUrl(1197)}">Бани в Москве</a>
        </h2>
        
        {include "companies/list/mainpage/list.tpl"}
        
    </div>

    <div class="container">
        
        <div class="row">
        
            <div class="col-lg-6">
             
                <h2 class="page-header">
                    <a class="title" href="{$modx->makeUrl(1274)}">Последние обзоры и отзывы</a>
                </h2>    
                {*include "society/topics/obzory/mainpage/list.tpl" topic_list_col_class="col-lg-12"*} 
                
                [[!smarty?tpl=`society/topics/obzory/mainpage/list.tpl`&topic_list_col_class=`col-lg-12`]]
            </div>
        
            <div class="col-lg-6">
             
                <h2 class="page-header">
                    <a class="title" href="{$modx->makeUrl(986)}">Последние комментарии</a>
                </h2>    
                {*include "society/topics/comments/mainpage/list.tpl"*} 
                
                [[!smarty?tpl=`society/topics/comments/mainpage/list.tpl`]]
            </div>
                 
        </div>
        
    </div>

{/block}