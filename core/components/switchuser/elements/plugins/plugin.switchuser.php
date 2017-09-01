<?php
switch($modx->event->name) {

    case 'OnMODXInit':
        
        /*
            Проверяем, чтобы контекст был не mgr,
            и чтобы был авторизованный пользователь
        */
        
        if(
            !empty($_REQUEST['switch_user'])
            AND $_REQUEST['switch_user'] == -1
        ){
            $manager_user = $modx->getAuthenticatedUser('mgr');        
            if ($user = $modx->getObject('modUser', $manager_user->id)) {
                $modx->user = $user;
                $modx->user->addSessionContext($modx->context->key);
                $modx->getUser($modx->context->key, true);
                $modx->setPlaceholders($modx->config, '+');
            }
            
            if(
                !empty($_GET['resource'])
                AND $url = $modx->makeURL((int)$_GET['resource'])
            ){
                $modx->sendRedirect($url);
            }
        }
            
        if(
            !empty($_REQUEST['switch_user'])
            AND $modx->context->key != 'mgr'
            AND $modx->user->id
            AND $user_id = (int)$_REQUEST['switch_user']
        ){
            
            if(
                $modx->hasPermission('save_user')
                OR (
                    $manager_user = $modx->getAuthenticatedUser('mgr')
                    AND $modx->context->checkPolicy('save_user', '', $manager_user)
                    AND $modx->user = $manager_user
                )
            ){
                if ($user = $modx->getObject('modUser', $user_id)) {
                    // $user->set('OriginalUser', $modx->user);
                    $modx->user = $user;
                    
                    // Инициализируем сессию пользователя
                    $modx->user->addSessionContext($modx->context->key);
                    
                    // Получаем настройки пользователя
                    $modx->getUser($modx->context->key, true);
                    
                    // Устанавливаем новые глобальные плейсхолдеры
                    $modx->setPlaceholders($modx->config, '+');
                }
                
                // Перебрасываем на старую страницу
                if(
                    !empty($_GET['resource'])
                    AND $url = $modx->makeURL((int)$_GET['resource'])
                ){
                    $modx->sendRedirect($url);
                }
            }
        }
        break;
        
    case 'OnWebPagePrerender':
        $manager_user = $modx->getAuthenticatedUser('mgr');
        if (
            ($modx->hasPermission('save_user')
            OR (
                $manager_user
                AND $modx->context->checkPolicy('save_user', '', $manager_user)
            ))
            AND
            $modx->getOption('switchuser_show_on_front')
        ){
            $modx->getService('switchuser','switchUser', MODX_CORE_PATH.'components/switchuser/model/');
            $html = '<style>
            .switch_user_bar {
                position: fixed;
                bottom: 0;
                left: 0;
                padding: 10px;
                background: rgba(20,20,20,0.8);
                color: #fff;
            }
            .switch_user_bar a {
                color: #fff;
                text-decoration: underline;
            }
            .switch_user_bar a:hover {
                color: #fff;
                text-decoration: none;
            }
            </style>';
            
            if($manager_user AND $manager_user->id != $modx->user->id){
                $url = $modx->makeUrl($modx->resource->id,'',array('switch_user' => -1, 'resource' => $modx->resource->id),'full');
                $html .= "<div class='switch_user_bar'>
                {$modx->lexicon('switchuser_authorized')} <b>{$modx->user->username}</b><br/>
                <a href='$url'>{$modx->lexicon('switchuser_exit')}</a>
                </div>"; 
            }else{
                $url = $modx->getOption('manager_url').'?a=security/user&resource='.$modx->resource->id;
                $html .= "<div class='switch_user_bar'><a href='$url'>{$modx->lexicon('switchuser_change_user')}</a></div>";
            }
            
            $output = &$modx->resource->_output;
            $output = preg_replace("/(<\/body>)/i","{$html}$1",$output);
        }
        break;
        
    case 'OnBeforeManagerPageInit':
        if ($modx->hasPermission('save_user')){
            $modx->getService('switchuser','switchUser', MODX_CORE_PATH.'components/switchuser/model/');
            $modx->lexicon->load('switchuser');
            $lang = $modx->lexicon('switchuser_menu_auth');
            $config = json_encode($modx->switchuser->pubconfig);
            $modx->regClientStartupScript("<script>var SwitchUser = $config;</script>", true);
            $modx->regClientStartupScript("<script>MODx.lang['switchuser_menu_auth'] = '$lang';</script>", true); // Лексикон чот не подгружался
            $modx->regClientStartupScript($modx->switchuser->config['jsUrl']."mgr/switchuser.js");
        }
        break;
    default:
        break;
}