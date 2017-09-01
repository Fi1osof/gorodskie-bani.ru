{$assets_url = $modx->getOption('assets_url')}
{$resource_id = $modx->resource->id}
<a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Twitter&redirect_id={$resource_id}" alt="Twitter" title="Войти через Twitter" class="social Twitter"></a>
<a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Facebook&redirect_id={$resource_id}" alt="Facebook" title="Войти через Facebook" class="social Facebook"></a>
<a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Google&redirect_id={$resource_id}" alt="Google" title="Войти через Google" class="social Google"></a>
<a href="{$assets_url}components/modhybridauth/connectors/profile/auth.php?provider=Yandex&redirect_id={$resource_id}" alt="Yandex" title="Войти через Yandex" class="social Yandex"></a>