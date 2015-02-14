
        <!-- Modal -->
        <div class="modal fade" id="loginLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 id="entrance">Вход</h3>
              </div>
              <div class="modal-body">
                    {$assets_url = $modx->getOption('assets_url')}

                <form id="loginLoginForm" class="form" action="[[~[[*id]]]]" method="post">
                    <input type="hidden" name="pub_action" value="login" />
                    <input type="hidden" name="returnUrl" value="{$request_uri}" />
                    
                    <div class="row">
                        
                        <div class="col-md-6">
                            <div class="loginLogin">
                                        <fieldset class="loginLoginFieldset">
                                            <div class="control-group">
                                                <label class="loginUsernameLabel" for="loginUsername" >Имя пользователя</label> 
                                                <div class="controls">
                                                    <input id="loginUsername" class="form-control loginUsername" type="text" name="username" />    
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <label class="loginPasswordLabel" for="loginPassword">Пароль</label> 
                                                <div class="controls">
                                                    <input id="loginPassword" class="form-control loginPassword" type="password" name="password" />
                                                </div>
                                            </div>
                        
                             
                                            
                                            
                                            
                                        </fieldset>       
                                </div>
                        </div>
                        <div class="col-md-6">
                            
                            <label >Вход через социальные сети</label> 
                            <div> 
                                <a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Twitter&redirect_id={$modx->resource->id}" alt="Twitter" title="Войти через Twitter" class="social Twitter"></a>
                                <a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Facebook&redirect_id={$modx->resource->id}" alt="Facebook" title="Войти через Facebook" class="social Facebook"></a>
                                <a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Google&redirect_id={$modx->resource->id}" alt="Google" title="Войти через Google" class="social Google"></a>
                                <a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Yandex&redirect_id={$modx->resource->id}" alt="Yandex" title="Войти через Yandex" class="social Yandex"></a>
                            </div>  
                            
                        </div>
                        
                        
                        <div class="col-md-12">  
                            <br /> 
                            <span class="loginLoginButton">
                                <button type="submit" name="Login" class="btn btn-sm btn-success">Вход</button>
                                <a href="{$modx->makeUrl(991)}" class="btn btn-sm btn-primary">Регистрация</a>
                                <a href="{$modx->makeUrl(1008)}" class="btn btn-sm btn-info">Забыли пароль?</a> 
                            </span>
                        </div>
                        
                    </div>
                
                </form>

              </div> 
            </div>
          </div>
        </div>