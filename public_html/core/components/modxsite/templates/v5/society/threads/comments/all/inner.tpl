{*
    Выводится на странице всех комментариев
*}

{extends file="society/threads/comments/inner.tpl"}


{block name=added}
    <div class="detail_link">
        <a href="{$comments_link}comment-{$comment.id}.html">Детальный просмотр комментария</a>
    </div>
{/block}  
