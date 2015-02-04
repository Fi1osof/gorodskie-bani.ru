<?php get_header(); ?>
<body>

	<div id="start">
	
<!--  		</br>
		<h1><a title="<?php bloginfo('name'); ?>" href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
 --> 			

<!-- 		<object id="Flash" width="860" height="350" >
			<param name="movie" value="/wp-content/themes/davinci-code/images/05.swf">
			<param name="quality" value="high">
 			<param name="wmode" value="transparent" />
		</object>
 -->
		<object height="350" width="860">
			<param value="/wp-content/themes/davinci-code/images/05.swf" name="movie"></param>
			<param name="quality" value="high">
 			<param name="wmode" value="transparent" />
			<embed src="/wp-content/themes/davinci-code/images/05.swf" height="350" width="860"></embed>
		</object>

	</div>
	<div id="container">


	<div id="header">
	  <!-- <h1><a title="<?php bloginfo('name'); ?>" href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1> -->


<!-- 
	<div id="menu">
			<ul>
				<?php wp_list_pages('sort_column=menu_order&title_li='); ?>				 				
			</ul>			
	</div>
 -->

	  </div>
	  			<br class="clear" />
				<div id="content">
			<div id="main">
				
				<div id="post">	
				<?php if ($posts) : foreach ($posts as $post) : start_wp(); ?>

					<!-- <div class="date">( <?php the_time('d M Y'); ?> )</div> -->				

				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a><?php edit_post_link(' {править}'); ?></h2>






					<div class="p1">
<?php the_content(__('<strong>Читать полностью...</strong>')); ?>
				<?php wp_link_pages(); ?>
					</div>

					<!-- <div class="posted"><?php _e("Рубрики:"); ?> <?php the_category(',') ?> Автор: <?php the_author_posts_link() ?> <br /> <?php comments_popup_link(__('Ваш отзыв'), __('(1) отзыв'), __('Отзывов (%)')); ?> 
					</div> -->
					<div class="pimg"></div>
									<!-- <?php trackback_rdf(); ?>	-->	
				<?php 
					if(is_page()) {}
					else { comments_template(); }
				?>
								<?php endforeach; else: ?>
				<?php _e('К сожалению, по вашему запросу ничего не найдено.'); ?>
				<?php endif; ?>		
							
				<div align="center">
				
<!-- 				<?php posts_nav_link('&nbsp;&nbsp;', __('<strong>&laquo; Раньше</strong>'), __('<strong>Позже &raquo;</strong>')); ?>
 -->				<?php if(function_exists('navigation')) { navigation(); } ?>
				
				</div>
				</div>

		</div>


<span id="space">|</span>

<?php get_sidebar(); ?>

			<!-- <br class="clear" /> -->
		</div>


<?php get_footer(); ?>
</div>
<div id="end"></div>

</body>
</html>