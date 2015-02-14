{extends file="layout.tpl"}
  
{block container}

    <div class="container">
        <h2 class="page-header">Бани в Москве</h2>
        
        {include "companies/list/mainpage/list.tpl"}
        
    </div>

    <div class="container">
        
        <div class="row">
        
            <div class="col-lg-6">
             
                <h2 class="page-header">Последние обзоры и отзывы</h2>    
                {include "society/topics/obzory/mainpage/list.tpl" topic_list_col_class="col-lg-12"} 
            </div>
        
            <div class="col-lg-6">
             
                <h2 class="page-header">Последние комментарии</h2>    
                {include "society/topics/comments/mainpage/list.tpl"} 
            </div>
                 
        </div>
        
    </div>

{/block}