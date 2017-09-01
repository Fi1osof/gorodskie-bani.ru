<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo('charset'); ?>" />
<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" /> <!-- leave this for stats -->
<!-- Editable Meta Tags -->
<meta name="copyright" content="<?php bloginfo('name'); ?>" />
<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" />
<meta name="robots" content="index,follow" />
<!-- Meta Tags End-->

<!-- Style Sheet -->
<style type="text/css" media="screen">
@import url( <?php bloginfo('stylesheet_url'); ?> );
</style>
	<!--[if IE]>
		<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/ie.css" />
	<![endif]-->	
<!-- Style Sheet End -->


<!-- Feed and Ping URLS-->
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
<link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="<?php bloginfo('atom_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<link rel="shortcut icon" href="http://gorodskie-bani.ru/favicon.ico"/> 

<div id="venik">

	<!-- <img src="http://gorodskie-bani.ru/wp-content/themes/davinci-code/images/venik.png" /> -->

</div>


<?php //wp_get_archives('type=monthly&format=link'); ?>
<?php //comments_popup_script(); // off by default ?>
<?php wp_head(); ?>


<!-- End Feed and Ping URLS-->
</head>