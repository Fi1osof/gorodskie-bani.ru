<div id="sidebar">

    [[!smarty?tpl=`inc/blocks/sidebar/login/index.tpl`]]
            
    <div class="title">Справочник</div>      
    <div class="">  
        [[!Wayfinder?startId=`1296`&level=`1`&outerClass=`menu`]] 
    </div>
     
    <div class="title">Разделы</div>  	
    <div class="">  
        [[!Wayfinder?startId=`0`&level=`1`&outerClass=`menu`&where=`{ "template:!=":26, "id:not in":[1296]}`]] 
    </div>
    
    <div style="margin: 0 0 20px;">
        <div class="title" style="margin: 0 0 10px;">Поиск по сайту</div>
        
        {literal}
        <div class="ya-site-form ya-site-form_inited_no" onclick="return {'action':'http://gorodskie-bani.ru/search.html','arrow':false,'bg':'#ffffff','fontsize':12,'fg':'#000000','language':'ru','logo':'rb','publicname':'Поиск по сайту Городские и общественные бани','suggest':true,'target':'_self','tld':'ru','type':2,'usebigdictionary':true,'searchid':2182161,'webopt':false,'websearch':false,'input_fg':'#000000','input_bg':'#ffffff','input_fontStyle':'normal','input_fontWeight':'normal','input_placeholder':null,'input_placeholderColor':'#000000','input_borderColor':'#7f9db9'}"><form action="http://yandex.ru/sitesearch" method="get" target="_self"><input type="hidden" name="searchid" value="2182161"/><input type="hidden" name="l10n" value="ru"/><input type="hidden" name="reqenc" value=""/><input type="search" name="text" value=""/><input type="submit" value="Найти"/></form></div><style type="text/css">.ya-page_js_yes .ya-site-form_inited_no { display: none; }</style><script type="text/javascript">(function(w,d,c){var s=d.createElement('script'),h=d.getElementsByTagName('script')[0],e=d.documentElement;if((' '+e.className+' ').indexOf(' ya-page_js_yes ')===-1){e.className+=' ya-page_js_yes';}s.type='text/javascript';s.async=true;s.charset='utf-8';s.src=(d.location.protocol==='https:'?'https:':'http:')+'//site.yandex.net/v2.0/js/all.js';h.parentNode.insertBefore(s,h);(w[c]||(w[c]=[])).push(function(){Ya.Site.Form.init()})})(window,document,'yandex_site_callbacks');</script>
        {/literal}
        
    </div>
    
    [[!smarty?tpl=`inc/blocks/topics/new.tpl`]]
    
    
    <div class="img-block"> 
        <a href="http://www.radimax.ru/" title="Чугунные радиаторы в стиле РЕТРО" target="_blank"><img src="assets/images/side/radimax_220.jpg" /></a> 
    </div> 
    
    <div class="img-block"> 
        <a href="http://www.drovyanka.ru/?r=gb" title="Строительство саун. Печи для бани и сауны Harvia, Kastor, Helo. Дымоходы Schiedel. Канадский кедр. Гималайская соль." target="_blank"><img src="assets/images/side/drovyanka.jpg" /></a> 
    </div> 
              
</div>