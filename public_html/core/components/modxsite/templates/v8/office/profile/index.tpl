{*
    Просмотр и редактирование профиля
*}

{$user = $modx->user}
{$profile = $user->Profile}



{if $smarty.post.update_profile}
    {$request = $smarty.post}
    
    {processor action="web/society/users/own_profile/update" ns="modxsite" params=$request assign=update_result}
    
    {if !$update_result.success}
        {include file="layout/text/error.tpl" message=$update_result.message|default:"Ошибка выполнения запроса"}
    {else}
        {include file="layout/text/success.tpl" message=$update_result.message|default:"Профиль успешно обновлен"}
    {/if}
    
    {*
    <pre>
        {print_r($update_result, 1)}
    </pre>
    *}
    
{else}
    {$request = []}
    
    {$request.fullname = $profile->fullname}
    
    {$notices = []}
    {foreach $modx->user->Notices as $Notice}
        {if $Notice->active}
            {$notices[] = $Notice->notice_id}
        {/if}
    {/foreach}
    {$request.notices = $notices}
    
    
{/if}


<form id="profile_form" action="" method="post">
    
    <input type="hidden" value="profile/update" name="pub_action">
    
    <div class="row"> 
        
        <div class="col-xs-8">
            
            <div class="form-group">
                <input type="text" autocomplete="off" value="{$request.fullname}" name="fullname" placeholder="ФИО" class="form-control input-hg">
            </div>
            
            <div class="form-group {if $update_result.field_errors.new_password}has-error{/if}">
                <input type="password" autocomplete="off" value="" name="new_password" placeholder="{if $update_result.field_errors.new_password}{$update_result.field_errors.new_password}{else}Новый пароль{/if}" class="form-control input-hg">
            </div>
            
            {*
                <div class="form-group">
                    <textarea name="content" class="form-control mce-editor markitup-editor input-width-full" rows="5" >{$profile->comment|strip_tags}</textarea>
                </div> 
            *}
            
            
            <h4>Уведомления</h4> 
            
            {*
                Получаем текущие настройки уведомлений пользователя
            *}
            {$notices = $request.notices}
            
            {*
                Выводим настройки для редактирования
            *}
            
            {$q = $modx->newQuery('SocietyNoticeType')}
            {$ok = $q->sortby('rank')}
            {foreach $modx->getCollection('SocietyNoticeType', $q) as $SocietyNoticeType}
                {$field_id = "notice_type_{$SocietyNoticeType->id}"}
                <div class="form-group">   
                    <input type="checkbox" data-toggle="checkbox" id="{$field_id}" name="notices[]" value="{$SocietyNoticeType->id}" {if in_array($SocietyNoticeType->id, $notices)}checked="checked"{/if}>
                    {$SocietyNoticeType->comment} 
                </div> 
            {/foreach}
            
            
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group"> 
                        <input class="btn btn-success btn-wide" name="update_profile" type="submit" value="Сохранить" />
                    </div>
                </div>
            </div>
            
            
        </div>
        
    </div>
    
</form>

<script>
    $('#profile_form input').on('focus', function(){
        $(this).parent().removeClass('has-error');
    });
</script>

