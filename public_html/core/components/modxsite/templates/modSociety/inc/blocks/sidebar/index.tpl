{*
    Выводим комментарии
*}

<style>
.vk{
    background: url(/assets/components/modxsite/templates/v5/img/icons.png) -270px -217px transparent;
    width: 63px;
    height: 63px;
    display: inline-block;
    margin-right:10px;
}
</style>

<div class="aside">

    <noindex>
        

    {*
    <div class="aside_social" style="margin-top:0">
        <h6>Поддержите проект!</h6>
        ЯД: 410011716898247<br />
        WMR395117781156<br />
        WMZ360303524457<br />
        PayPal: info@modxclub.ru<br />
        Другие способы спрашивайте в личке.
        <div style="clear:left;"></div>
    </div>
    *}
    
    {*
    <div class="aside_social">
        <a href="http://vk.com/modxclub" target="_blank" class="pull-left">
            <i class="vk" alt="Присоединяйтесь к нам в ВК!"></i>        
        </a>
        <a href="http://vk.com/modxclub" target="_blank"><p>Присоединяйтесь к нам во&nbsp;Вконтакте!</p></a>
        <div style="clear:left;"></div>
    </div>
    *}
    
    <div class="aside_comments">
    [[!smarty?tpl=`inc/blocks/sidebar/comments/index.tpl`]]
    </div>
    {*
        Выводим топики
    *}
    <div class="aside_topics">
    [[!smarty?tpl=`inc/blocks/sidebar/topics/index.tpl`]]
    </div>
    {*
        Выводим блоги
    *}
    <div class="aside_blogs">
    [[!smarty?tpl=`inc/blocks/sidebar/blogs/index.tpl`]]
    </div>
    
        
    </noindex>
</div>