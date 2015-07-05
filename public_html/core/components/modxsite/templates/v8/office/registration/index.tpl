{*
    Регистрация нового пользователя
*}

{if $modx->user->hasSessionContext($modx->context->key)}
    {include file="layout/text/success.tpl" message="Вы уже авторизованы"}
{else}
    
    {$request = []}
    
    {if $smarty.session.social_profile && $smarty.session.social_profile.provider && $smarty.session.social_profile.profile}
        {$social_profile = $modx->newObject('modHybridAuthUserProfile', $smarty.session.social_profile.profile)}
        {$request.email = $social_profile->email}
        {$request.fullname = trim("{$social_profile->firstName} {$social_profile->lastName}")}
        {$request.username = $social_profile->displayName}
    {/if}
    
    {if $smarty.post.reg_submit}
        {$request = array_merge($request, [
            "username"  => $smarty.post.username,
            "fullname"  => $smarty.post.fullname,
            "email"     => $smarty.post.email,
            "captcha"   => $smarty.post.captcha
        ])}
        
        {processor action="web/society/users/create" ns="modxsite" params=$request assign=reg_result} 
    {/if}
    
    
    {if !$reg_result.success}
    
        <div class="form-group ">
            {if $social_profile}
                {*
                    Если пользователь авторизован в соцсети, сообщаем ему об этом, чтобы меньше путаницы было
                *}
                <p class="text-primary">Вы успешно авторизованы в социальной сети, осталось для регистрации заполнить пару полей.</p>
            {else}
                {*
                    Иначе выводим иконки для регистрации через соцсети
                *}
                <div>
                    <span class="text-primary">Регистрация через социальную сеть: </span>
                    
                    {include file="inc/blocks/social_auth_button.tpl"}
                    
                </div>
            {/if}
        </div>
    
    {/if}
      
    {*
        Результат выполнения процессора
    *}
    {if $reg_result}
        {if $reg_result.success}
            {include file="layout/text/success.tpl" message=$reg_result.message|default:"Вы успешно зарегистрированы"}
        {else}
            {include file="layout/text/error.tpl" message=$reg_result.message|default:"Ошибка выполнения запроса"}
        {/if}
    {/if}
    
    
    {*
        Если процессор не был успешно выполнен, выводим форму для регистрации
    *}
    {if !$reg_result.success}
        
        <form id="reg_form" method="post" action="">
            {*
                <input type="hidden" name="pub_action" value="registration" />
            *}
            
            <div class="row"> 
                
                <div class="col-xs-8">
                    
                    <div class="form-group {if $reg_result.field_errors.username}has-error{/if}">
                        <input type="text" class="form-control input-hg" placeholder="Логин" name="username" value="{$request.username}" autocomplete="off">
                        {if $reg_result.field_errors.username}
                            <p class="text-danger">{$reg_result.field_errors.username}</p>
                        {/if}
                    </div>
                    
                    <div class="form-group {if $reg_result.field_errors.fullname}has-error{/if}">
                        <input type="text" class="form-control input-hg" placeholder="ФИО" name="fullname" value="{$request.fullname}" autocomplete="off">
                        {if $reg_result.field_errors.fullname}
                            <p class="text-danger">{$reg_result.field_errors.fullname}</p>
                        {/if}
                    </div>
                    
                    <div class="form-group {if $reg_result.field_errors.email}has-error{/if}">
                        <input type="email" class="form-control input-hg" placeholder="Емейл" name="email" value="{$request.email}" autocomplete="off">
                        {if $reg_result.field_errors.email}
                            <p class="text-danger">{$reg_result.field_errors.email}</p>
                        {/if}
                    </div> 
                    
                    
                    {if !$social_profile}
                        {if !$request OR $reg_result.field_errors.captcha OR !$request.captcha}
                            <div class="row">
                                
                                <div class="col-xs-8">
                                     
                                    <div class="form-group {if $reg_result.field_errors.captcha}has-error{/if}">
                                        <input type="text" class="form-control input-hg" placeholder="Код с картинки" name="captcha" value="" autocomplete="off">
                                        {if $reg_result.field_errors.captcha}
                                            <p class="text-danger">{$reg_result.field_errors.captcha}</p>
                                        {/if}
                                    </div>
                                    
                                </div>
                                
                                <div class="col-xs-4">
                                    {chunk name=modcaptcha}
                                </div>
                                
                            </div>
                        {else}
                            <input type="hidden" name="captcha" value="{$request.captcha}" />
                        {/if}
                    {/if}
                    
                    
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group"> 
                                <input type="submit" class="btn btn-success btn-wide" name="reg_submit" value="Зарегистрироваться" />
                            </div>
                        </div>
                    </div>
                    
                    <hr />
                    <p>Если вы были зарегистрированы ранее, можете попробовать <a href="[[~1008]]">восстановить пароль</a></p>
                    
                </div>
                
            </div>
            
        </form>
    
    {/if}
    
    {*
    
    <script type="text/javascript">
        (function(){
            
            var D = {
                init:function(obj){
                    this.form = obj;
                    
                    this.inRequest = false; 
                    
                    this.form.on('submit', this, this.onSubmit);
                    
                    this.form.find('input').on('focus', function(){ 
                        $(this).parents('.form-group:first').removeClass('has-error');
                    });
                    
                    
                    return this;
                } 
                
                
                ,onSubmit: function(e){
                    var scope = e.data;
                    
                    if(!scope.inRequest){
                        scope.inRequest = true;
                        
                        scope.form.find('.has-error').removeClass('has-error');
                        
                        var form = e.data.form;
                        var data = form.serialize(); 
                        
                        
                        $.ajax({
                            url: "assets/components/modxsite/connectors/connector.php"
                            ,dataType: "json"
                            ,data: data
                            ,error: function(){
                                scope.inRequest = false;
                                
                                alert("Ошибка выполнения запроса");
                                
                                return false;
                            }
                            ,success: function(response){ 
                                scope.inRequest = false;
                                
                                if(!response.success){
                                
                                    if(response.data && response.data.length){
                                        for(var i in response.data){
                                            var field, msg;
                                            field = response.data[i].id;
                                            msg = response.data[i].msg; 
                                            if(field && msg){ 
                                                form.find('[name=' + field + ']')
                                                    .val('')
                                                    .attr('placeholder', msg)
                                                    .parents('.form-group:first')
                                                    .addClass('has-error');
                                            }
                                        }
                                    }
                                    
                                    alert(response.message || "Ошибка выполнения запроса");
                                    
                                    return;
                                }
                                
                                // else
                                alert(response.message || "Пользователь успешно зарегистрирован");
                                scope.form[0].reset();
                                
                                return;
                            }
                        });
                        
                    }
        
                    return false;
                }
            }
        
            D = Object.create(D).init($('#reg_form'));
    
        })();    
    
        
    </script>
    *}
    
{/if}    
    


