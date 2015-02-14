<div id="sidebar">

<!-- <div><div class="title">Поиск по сайту:</div> <?php include (TEMPLATEPATH . '/searchform.php'); ?> </div> 
 -->
<?php if ( !function_exists('dynamic_sidebar')
        || !dynamic_sidebar() ) : ?>
			
				<ul class="category">
				<?php list_cats(0, '', 'name', 'ASC', '/', true, 0, 1);    ?>
				</ul>		
				<?php /* If this is a single post */ if (is_single()) { ?>  						
				<h2><?php _e('Архивы'); ?></h2>	
				<ul class="menu">
				<?php wp_get_archives('type=monthly&show_post_count=0'); ?>
				</ul>
				<?php } ?>
			
				<?php if (is_home()) { ?>  
					<?php
	$link_cats = $wpdb->get_results("SELECT cat_id, cat_name FROM $wpdb->categories WHERE link_count!='0'");
			foreach ($link_cats as $link_cat) {
	?>
	<h2><?php echo $link_cat->cat_name; ?></h2>
	<ul class="menu">
	<?php get_links($link_cat->cat_id, '<li>', '</li>', '<br />', FALSE, 'id', TRUE, 
TRUE, -1, TRUE); ?>

	</ul>
	<?php } ?>
				<?php } ?>
				
					<h2><?php _e('Недавно'); ?></h2>
				<ul class="menu">
				<?php wp_get_archives('type=postbypost&limit=6'); ?>
				<?php include (TEMPLATEPATH . "/inc.php"); ?>

				</ul>
	
				<?php if (is_home()) { ?>
				<?php if (function_exists('wp_theme_switcher')) { ?>
				<h2>Выбрать дизайн</h2> 
				<?php wp_theme_switcher(); ?>
				<?php } ?>				<?php } ?>
					<h2><?php _e('Поиск'); ?></h2>
<ul><li>
	<form id="searchform" method="get" action="<?php echo $PHP_SELF; ?>">
	<input type="text" name="s" id="s1" size="15" />
	<input type="submit" name="submit" id="submit1" value="<?php _e('Поиск'); ?>" />
	</form>
</li></ul>
				
<?php endif; ?>








</div>