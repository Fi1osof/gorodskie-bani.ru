{*
    Сбрасываем пароль
*}

{$params = [
    "lu"    => $smarty.get.lu,
    "lp"    => $smarty.get.lp
]}

{processor action="web/society/users/password/reset" ns="modxsite" params=$params assign=result}

{if !$result.success}
    {include file="layout/text/error.tpl" message=$result.message|default:"Ошибка выполнения запроса"}
{else}
    {include file="layout/text/success.tpl" message=$result.message|default:"Пароль успешно сброшен. Теперь можете войти с паролем, указанным в вашем письме."}
{/if} 