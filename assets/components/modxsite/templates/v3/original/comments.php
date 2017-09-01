<?php // Do not delete these lines
	if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die ('Пожалуйста, не загружайте эту страницу напрямую. Спасибо!');

        if (!empty($post->post_password)) { // if there's a password
            if ($_COOKIE['wp-postpass_'.$cookiehash] != $post->post_password) {  // and it doesn't match the cookie
				?>
				
				<p class="nocomments"><?php _e("Эта публикация защищена паролем. Пожалуйста, введите его для просмотра комментариев."); ?><p>
				
				<?php
				return;
            }
        }

		/* This variable is for alternating comment background */
		$oddcomment = "graybox";
?>
<?php if ( !empty($post->post_password) && $_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) : ?>
<p><?php _e('Введите свой пароль для просмотра комментариев.'); ?></p>
<?php return; endif; ?>

<h4 id="respond">



</h4>


<?php if ( $comments ) : ?>
<ol id="commentlist">

<?php foreach ($comments as $comment) : ?>
	<li id="comment-<?php comment_ID() ?>" class="<?=$oddcomment;?>">
			<strong><?php comment_author_link() ?></strong> <?php _e('пишет'); ?>:
<?php if ($comment->comment_approved == '0') : ?>
			<em><?php _e('Спасибо! Ваш комментарий ожидает проверки.','andreas09'); ?></em>
			<?php endif; ?>
			<br />

			<small class="commentmetadata"><a href="#comment-<?php comment_ID() ?>" title=""><?php comment_date(__('d M Y')) ?> <?php _e('в'); ?> <?php comment_time() ?></a> <?php edit_comment_link('править','',''); ?></small>
	<?php comment_text() ?>

	</li>
<?php /* Changes every other comment to a different class */	
			if("graybox" == $oddcomment) {$oddcomment="";}
			else { $oddcomment="graybox"; }
		?>
<?php endforeach; ?>

</ol>

<?php else : // If there are no comments yet ?>

<?php endif; ?>

<!--  HERE you can add links to different feeds and utility sites like digg -->



<?php if ( comments_open() ) : ?>
<h4 id="comments"><?php _e('Оставьте свой отзыв'); ?></h4>

<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p>Вы должны <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php the_permalink(); ?>">войти</a>, чтобы оставлять комментарии.</p>
<?php else : ?>

<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">

<?php if ( $user_ID ) : ?>

<p>Вы вошли как <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="<?php _e('Выйти с этого аккаунта') ?>">Выйти &raquo;</a></p>

<?php else : ?>

<p><input type="text" name="author" id="author" value="<?php echo $comment_author; ?>" size="22" tabindex="1" />
<label for="author"><small>Имя <?php if ($req) _e('*'); ?></small></label></p>

<p><input type="text" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="22" tabindex="2" />
<label for="email"><small>E-mail <?php if ($req) _e('(* скрыта)'); ?></small></label></p>

<!-- <p><input type="text" name="url" id="url" value="<?php echo $comment_author_url; ?>" size="22" tabindex="3" />
<label for="url"><small>Сайт</small></label></p>
 -->
<?php endif; ?>


<p><textarea name="comment" id="comment" cols="55" rows="11" tabindex="4"></textarea></p>

<p><input name="submit" type="submit" id="submit" tabindex="5" value="" class="search-button" />

<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
</p>
<?php do_action('comment_form', $post->ID); ?>

</form>

<?php endif; // If registration required and not logged in ?>

<?php else : // Comments are closed ?>
<p><?php _e('Комментарии закрыты.'); ?></p>
<?php endif; ?>
<!-- This is where the "NEXT"  & "PREVIOUS" links appears after comments-->
<div class="pg_nav"><?php previous_post('&laquo; %', '', 'yes'); ?> 
&nbsp;&nbsp; <?php next_post('% &raquo;', '', 'yes'); ?></div>
<!--  end -->


<!-- Theme by Sreejith R - http://www.GFXedit.com / http://www.sr-ultimate.com  -->
