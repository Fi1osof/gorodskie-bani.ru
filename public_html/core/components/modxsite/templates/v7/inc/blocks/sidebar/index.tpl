<div id="sidebar" class="">


    <div class="panel panel-default">
        
        <div class="panel-heading">
            <h4 class="title">Поиск по сайту</h4>
        </div>
        
        <div class="panel-body">
            {literal}
            <div class="ya-site-form ya-site-form_inited_no" onclick="return {'action':'http://gorodskie-bani.ru/search.html','arrow':false,'bg':'#ffffff','fontsize':12,'fg':'#000000','language':'ru','logo':'rb','publicname':'Поиск по сайту Городские и общественные бани','suggest':true,'target':'_self','tld':'ru','type':2,'usebigdictionary':true,'searchid':2182161,'webopt':false,'websearch':false,'input_fg':'#000000','input_bg':'#ffffff','input_fontStyle':'normal','input_fontWeight':'normal','input_placeholder':null,'input_placeholderColor':'#000000','input_borderColor':'#7f9db9'}"><form action="http://yandex.ru/sitesearch" method="get" target="_self"><input type="hidden" name="searchid" value="2182161"/><input type="hidden" name="l10n" value="ru"/><input type="hidden" name="reqenc" value=""/><input class="form-control" type="search" name="text" value=""/><input type="submit" class="btn btn-primary btn-sm" value="Найти"/></form></div><style type="text/css">.ya-page_js_yes .ya-site-form_inited_no { display: none; }</style><script type="text/javascript">(function(w,d,c){var s=d.createElement('script'),h=d.getElementsByTagName('script')[0],e=d.documentElement;if((' '+e.className+' ').indexOf(' ya-page_js_yes ')===-1){e.className+=' ya-page_js_yes';}s.type='text/javascript';s.async=true;s.charset='utf-8';s.src=(d.location.protocol==='https:'?'https:':'http:')+'//site.yandex.net/v2.0/js/all.js';h.parentNode.insertBefore(s,h);(w[c]||(w[c]=[])).push(function(){Ya.Site.Form.init()})})(window,document,'yandex_site_callbacks');</script>
            {/literal}
        </div>
    </div>
    
    {*
        <noindex>
            <div class="img-block"> 
                <a href="http://www.jadebest.ru/" title="Интернет-магазин товаров для бани и сауны - ЖадеБест" target="_blank" rel="nofollow">
                    <img src="assets/images/side/2015/jadebest.jpg" class="img-responsive" style="width: 100%;margin-bottom: 20px;"/>
                </a> 
            </div> 
        </noindex>
    *}
    
    
    <div class="img-block"> 
        <a href="[[~1375]]" title="Зубовские бани">
            <img src="assets/images/side/2015/zubovskie-bani.jpg" class="img-responsive" style="width: 100%;margin-bottom: 20px;"/>
        </a> 
    </div> 

    <div class="panel panel-default">
        
        <div class="panel-heading">
            <h4 class="title">Разделы</h4>
        </div>
        
        <div class="panel-body">
            {*
                [[!Wayfinder?startId=`0`&level=`1`&outerClass=`menu`&where=`{ "id:not in":[1296] }`]] 
            *}
            
            {$params = [
                "startId" => 0,
                "level"     => 1,
                "outerClass"    => "menu",
                "where"     => json_encode([
                    "id:not in" => [1296, 1159]
                ])
            ]}
            
            {snippet name=Wayfinder params=$params}
        </div>
    </div>
    
    {*
    <div class="panel panel-default">
        
        <div class="panel-heading">
            <h4 class="title">Справочник</h4>
        </div>
        
        <div class="panel-body">
            
            {$params = [
                "parent"    => 1296,
                "limit"     => 0
            ]}
            
            {processor action="web/resources/getdata" ns=modxsite params=$params assign=result}
            
            <ul class="menu">
                {foreach $result.object as $object}
                    {$title = $object.longtitle|default:$object.pagetitle}
                    <li><a title="{$title|@escape}" href="{$object.uri}">{$title}</a></li>
                {/foreach}
            </ul> 
            
        </div>
    </div>
    *}
  
    <noindex>
        [[!smarty?tpl=`inc/blocks/topics/new.tpl`]]
    </noindex>    
        
        
    <div class="img-block"> 
        <a href="http://www.radimax.ru/" title="Чугунные радиаторы в стиле РЕТРО" target="_blank">
            <img src="assets/images/side/radimax_220.jpg" class="img-responsive"/>
        </a> 
    </div> 
    

    <noindex>
        <div class="img-block"> 
            <a href="http://www.drovyanka.ru/?r=gb" title="Строительство саун. Печи для бани и сауны Harvia, Kastor, Helo. Дымоходы Schiedel. Канадский кедр. Гималайская соль." target="_blank" rel="nofollow">
                <img src="assets/images/side/drovyanka.jpg" class="img-responsive" style="width: 100%;margin-bottom: 20px;"/>
            </a> 
        </div> 
    </noindex>
        
              
</div>