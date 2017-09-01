{*
    Выводим заведения на карту
*}

{extends "companies/list.tpl"}

{block params append}
    {$params = array_merge((array)$params, [
        "with_coors_only" => 1,
        "limit" => 0,
        "page"  => 0
    ])}
{/block}

{block fetch}
    
    {if $result.success && $result.object}
        
        <style>
            .YMaps-b-balloon-content{
                white-space: nowrap;
            }
        </style>
        
        <div id="YMapsID" class="container" style="width:100%;"></div>
            
        <script type="text/javascript">
            // Создает обработчик события window.onLoad
            addEventListener('DOMContentLoaded', function () {
                var container = $('#YMapsID');
                // return;
                
                var window_height = $(window).height();
                // var top_menu_height = $('#navbar-main').height();
                // var height = window_height - top_menu_height;
                var height = window_height * 0.67;
                if(height < 300){
                    height = 300;
                }
                
                container.height(height);
                
                // Создает экземпляр карты и привязывает его к созданному контейнеру
                var map = new YMaps.Map(container[0]);
                    
                // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
                map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 11);
                
                 
                // Создает объект YMaps.Zoom с пользовательскими подсказками и добавляет его на карту.
                // Коэффициенту масштабирования 1 соответствует подсказка "Мелко",
                // коэффициенту масштабирования 9 - "Средне",
                // коэффициенту масштабирования 16 - "Крупно".
                var zoom = new YMaps.Zoom({
                    customTips: [
                        { index: 1, value: "Мелко" },
                        { index: 9, value: "Средне" },
                        { index: 16, value: "Крупно" }
                    ]
                });
                map.addControl(zoom);
                
                /*var placemark = new YMaps.Placemark(new YMaps.GeoPoint(37.64, 55.76));
                placemark.name = "Имя метки";
                placemark.description = "Описание метки";
                map.addOverlay(placemark);*/
                
                {foreach $result.object as $object}
                
                    {*if preg_match("/Placemark\(\[([0-9\.]+), ?([0-9\.]+)\]/i", $object.tvs.ya_map.value, $match)}
                        // Создает метку в центре Москвы
                        var placemark = new YMaps.Placemark(new YMaps.GeoPoint({$match[1]}, {$match[2]}));
                        
                        // Устанавливает содержимое балуна
                        placemark.name = "{$object.pagetitle|escape}";
                        placemark.description = "<a href='{$object.uri}'>Открыть страницу заведения</a>";
                        placemark.setIconContent("{$object.pagetitle|escape}");
                        
                        // Добавляет метку на карту
                        map.addOverlay(placemark);
                        
                    {/if*}
                
                    {if $ya_coords = $object.tvs.ya_coords.value}
                        {$icon = $object.menutitle|default:$object.pagetitle}
                        {$icon = str_replace(' ', '_', $icon)}
                        
                        // Создает метку
                        var placemark = new YMaps.Placemark(new YMaps.GeoPoint({$ya_coords}));
                        
                        // Устанавливает содержимое балуна
                        placemark.name = "{$object.pagetitle|escape}";
                        placemark.description = "<a href='{$object.uri}'>Открыть страницу заведения</a>";
                        
                        {* Добавляем пробел в конце иконки, так как Яша не корректно ширину задает *}
                        placemark.setIconContent("{$icon|escape}&nbsp;");
                        
                        // Добавляет метку на карту
                        map.addOverlay(placemark);
                        
                    {/if}
                    
                {/foreach}
            });
        </script>
        
    {/if}
    
{/block}

    
    