{extends file="society/topics/comments/index.tpl"}

{block name=params append}
    {$params = array_merge($params, [
        "limit" => 7,
        "start" => 0,
        "one_comment_per_thread"    => 1
    ])}
    {$comments_inner_tpl = $comments_inner_tpl|default:"society/threads/comments/sidebar/inner.tpl"}
    
{/block}

{block name="pre_content"}
    <h6>Комментарии</h6>
{/block}

{block name=paging}
    <p><a href="{$modx->makeUrl(986)}" title="Все комментарии">Все комментарии</a></p>
{/block}