<div class="col-md-2 col-sm-3">
    {if !$modx->user->id}
        <h5 class="title">Вы можете:</h5>
        <ul class="bottom-links">
            {* <li><a href="#" title="">Зарегистрироваться</a></li> *}
            <li><a data-target="#myModal" data-toggle="modal" href="#">Войти</a></li>
        </ul>
    {else}
        <h5 class="title">{$modx->user->username}</h5>
        <ul class="bottom-links">
            {*<li><a href="{link id=626}" title="">Мой профиль</a></li>
            <li><a href="#" title="">Настройки</a></li>
            <li><a href="#" title="">Создать</a></li>*}
            <li><a href="{$modx->resource->uri}?service=logout" title="">Выход</a></li>
        </ul>
    {/if}
</div>