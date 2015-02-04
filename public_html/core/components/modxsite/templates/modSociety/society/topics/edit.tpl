{extends file="society/topics/create.tpl"}


{block name=form}
    
    {$action = 'topic/update'}
    
    {if $topic_id = (int)$smarty.get.tid}
        {*
            Пытаемся получить данные топика.
            Редактировать можно только личные топики или только если есть права модератора
        *}
        
        {$c = [
            "id"    => $topic_id,
            "parent"    => 309
        ]}
        
        {*
            Если нет прав модератора, то добавляем условие автора
        *}
        {if !$modx->hasPermission('moderate_topics')}
            {$c.createdby = $modx->user->id}
        {/if}
        
        {if $topic = $modx->getObject('SocietyTopic', $c)}
            {$smarty.block.parent}
        {else}
            {include file="layout/text/error.tpl" message="Не были получены данные топика"}
        {/if}
        
        
        
    {else}
        {include file="layout/text/error.tpl" message="Не был указан ID топика"}
    {/if}
    
    
{/block}