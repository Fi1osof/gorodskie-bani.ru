<?php
if ( function_exists('register_sidebar') )
    register_sidebar(array(
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '<div class="title">',
        'after_title' => '</div>',
    ));




function navigation() {
global $wp_query, $wp_rewrite;
$pages = '';
$max = $wp_query->max_num_pages;
if (!$current = get_query_var('paged')) $current = 1;
$a['base'] = str_replace(999999999, '%#%', get_pagenum_link(999999999));
$a['total'] = $max;
$a['current'] = $current;
$total = 0; //1 - выводить текст "Страница N из N", 0 - не выводить
$a['mid_size'] = 2; //сколько ссылок показывать слева и справа от текущей
$a['end_size'] = 5; //сколько ссылок показывать в начале и в конце
$a['prev_text'] = '&laquo; Предыдущая '; //текст ссылки "Предыдущая страница"
$a['next_text'] = 'Следующая &raquo;'; //текст ссылки "Следующая страница"
if ($max > 1) echo '<div>';

if ($total = 1 && $max > 1) $pages = '<span class="str">Страница ' . $current . ' из ' . $max . '</span>'."\r\n";
echo $pages . paginate_links($a);

if ($max > 1) echo '</div>';
}

?>