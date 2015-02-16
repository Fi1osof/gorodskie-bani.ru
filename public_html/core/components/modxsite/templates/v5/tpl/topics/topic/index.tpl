{*
    Шаблон топика
*}
{extends file="layout.tpl"}

{block name=content}
    [[!smarty?tpl=`society/topics/topic/index.tpl`]]
    
    <style>
        .outer-tpl .outer-tpl {
            margin-left: 20px;
        }
        
        .outer-tpl.level-7 .outer-tpl {
            margin-left: 0px;
        }
        .comment.inner-tpl {
            margin: 20px 0;
        }
    </style>
{/block}