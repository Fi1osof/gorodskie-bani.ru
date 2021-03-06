<h3>Написать нам</h3>
 
    
{$request = $smarty.post}

{if $request}
    {$modx->error->reset()}
    {processor action="web/forms/feedback" ns="modxsite" params=$request assign=form_result}
    
    {if !$form_result.success}
        <div class="alert alert-danger">
            {$form_result.message|default:"Ошибка выполнения запроса"}
        </div>
         
        {if $form_result.field_errors}
        
            <div class="alert alert-info">
                {foreach $form_result.field_errors as $msg}
                    <p>
                        {$msg}
                    </p>
                {/foreach}
            </div>
            
            
        {/if}
         
    {/if}
    
{/if}


{if !$form_result.success}
        <form name="order_form" action="{link id=$modx->resource->id}?action=submit" method="post" class="wrapper-content">
        
            <div class="form-group control-group {if $form_result.field_errors.fullname}error{/if}">
                <label for="fullname">Имя</label>
                <div class="">
                    <input id="fullname" class="form-control input-text input-width-full" placeholder="Как вас зовут?" type="text" value="{if $request.fullname}{$request.fullname}{else}{$profile.fullname}{/if}" name="fullname">
                    {if $form_result.field_errors.fullname}
                        <span class="text-danger help-inline">{$form_result.field_errors.fullname}</span>
                    {/if}
                </div>
            </div>
            
        
            <div class="form-group control-group {if $form_result.field_errors.email}error{/if}">
                <label for="email">Электронная почта</label>
                {if $profile.email}
                    <div class="">
                        <input type="hidden" value="{$profile.email}" name="email">
                        <input id="email" class="form-control input-text input-width-full " type="text" value="{$profile.email}" disabled>
                    </div>
                {else}
                    <div class="">
                        <input id="email" class="form-control input-text input-width-full" placeholder="Адрес электронной почты" type="text" value="{$request.email}" name="email">
                    </div>
                    {if $form_result.field_errors.email}
                        <span class="text-danger help-inline">{$form_result.field_errors.email}</span>
                    {/if}
                {/if}
            </div>
            
        
            <div class="form-group control-group {if $form_result.field_errors.phone}error{/if}">
                <label for="phone">Телефон</label>
                <div class="">
                    <input id="phone" class="form-control input-text input-width-full" placeholder="Номер телефона для связи" type="text" value="{if $request.phone}{$request.phone}{else}{$profile.phone}{/if}" name="phone">
                    {if $form_result.field_errors.phone}
                        <span class="text-danger help-inline">{$form_result.field_errors.phone}</span>
                    {/if}
                </div>
            </div>
            
        
            <div class="form-group control-group {if $form_result.field_errors.message}error{/if}">
                <label for="message">Текст сообщения</label>
                <div class="">
                    <textarea rows="10" id="message" class="form-control input-text input-width-full" placeholder="Ваш вопрос или пожелание" name="message">{$request.message}</textarea>
                    {if $form_result.field_errors.message}
                        <span class="text-danger help-inline">{$form_result.field_errors.message}</span>
                    {/if}
                </div>
            </div>
            
            
            {if !$request OR $form_result.field_errors.captcha OR !$request.captcha}
            
                <div class="form-group control-group {if $form_result.field_errors.captcha}error{/if}"> 
                    <label for="captcha">Введите код с картинки</label>
                    <input id="captcha" type="text" class="w125" placeholder="Проверочный код" name="captcha" value="" />
                    [[$modcaptcha]]
                    {if $form_result.field_errors.captcha}
                        <div>
                            <span class="text-danger help-inline">{$form_result.field_errors.captcha}</span>
                        </div>
                    {/if}
                </div>
                
            {else}
                <input type="hidden" name="captcha" value="{$request.captcha}" />
            {/if}
            
        
            <div class="form-group control-group">
                <input type="submit" class="btn btn-primary" name="submit" value="Отправить" />
            </div>
            
        </form> 
        
{else}
    <div class="alert alert-success">
        {$form_result.message|default:"Спасибо! Ваше сообщение принято."}
    </div>
{/if}
        