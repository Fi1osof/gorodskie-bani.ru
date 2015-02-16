{*
    Акцтивация пользователя
*}

{$user_id = $smarty.get.u}
{$key = $smarty.get.k}

{if !$user_id || !$key}
    
    {include file="layout/text/error.tpl" message="Не были указаны данные для активации"}
    
{else}
    
    {$params = [
        "user_id"   => $user_id,
        "key"       => $key,
        "auto_auth" => 1
    ]}
    
    {processor action="web/society/users/activate" ns="modxsite" params=$params assign=result}
    
    {if !$result.success}
        {include file="layout/text/error.tpl" message=$result.message|default:"Ошибка активации пользователя"}
    {else}
        {include file="layout/text/success.tpl" message=$result.message|default:"Пользователь успешно активирован"}
    {/if} 

{/if}

