{if !$modx->user->id}
    <li>
        <a href="javascript:;" data-toggle="modal" data-target="#loginLoginForm" rel="nofollow"><i class="glyphicon glyphicon-log-in"></i> Войти</a>
    </li> 
{else}
    <li class="dropdown">
        <a id="office" href="#" data-toggle="dropdown" class="dropdown-toggle"><i class="glyphicon glyphicon-user"></i><span class="caret"></span></a>
        <ul aria-labelledby="office" class="dropdown-menu">
            <li><a href="[[~626]]">Профиль</a></li>
            <li class="divider"></li>
            <li><a href="{$modx->resource->uri}?service=logout"><i class="glyphicon glyphicon-log-out"></i> Выйти</a></li>
        </ul>
    </li>
{/if}
