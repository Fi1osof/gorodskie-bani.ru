{*
    Список всех пользователей
*}

{$params = [
    "getPage"   => 1,
    "page"      => $smarty.get.page,
    "showinactive"  => $modx->hasPermission('view_inactive_users'),
    "showblocked"  => $modx->hasPermission('view_blocked_users')
]}

{processor action="web/society/users/getdata" ns="modxsite" params=$params assign=result}

{$can_view_profile = $modx->hasPermission('modxclub.view_profile')}

<table class="users">
    <tbody>
    
        {foreach $result.object as $object}
            
            <tr>
                
                <td class="w10">
                    <a href="profile/{$object.username}" title="{$object.fullname|default:$object.username}"><img src="{$object.photo}"/></a>
                </td>
            
                <td class="w10">
                    {if !$object.active}
                        <a href="profile/{$object.username}" style="color:#CCC;">{$object.username}</a>
                    {else if $object.blocked}
                        <s><a href="profile/{$object.username}">{$object.username}</a></s>
                    {else}
                        <a href="profile/{$object.username}">{$object.username}</a>
                    {/if}
                    <p class="realname">{$object.fullname}</p>
                </td>
                
                <td>
                    {if $object.regdate}
                        <h5>Зарегистрирован</h5>
                        {date('Y-m-d', $object.regdate)}
                    {/if}
                </td>
                
                <td>
                    {if $object.blockeduntil && $object.blockeduntil > time()}
                        <h5>Заблокирован до</h5>
                        {date('Y-m-d H:i:s', $object.blockeduntil)}
                    {/if}
                </td>
                
                <td>
                    {if $can_view_profile} 
                        {$object.email}
                    {/if}
                </td>
                
            </tr>
            
            
        {/foreach}
        
    </tbody>
</table>

{ph name="page.nav"}
