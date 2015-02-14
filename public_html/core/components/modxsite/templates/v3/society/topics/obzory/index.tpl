{*
    Выводим только обзоры бань
*}

{extends file="society/topics/index.tpl"}

{block name=params append}

    {$params.where.template = 28}
    
{/block}

