<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package prc_theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>


<div id="page" class="site">
	<header id="masthead" class="site-header__wrapper">
		<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"></button>
		<div class="site-header">
			<div class="site-header__logo">

				<?php if ( has_custom_logo() ) : ?>
					<?php the_custom_logo(); ?>
				<?php endif; ?>
				
				<?php $site_title = get_bloginfo( 'name' );
					if ( ! empty( $site_title ) ) : ?>
					<a class="site-header__title" href="/"><?php echo esc_html( $site_title ); ?></a>
				<?php endif; ?>

			</div>
			<nav id="site-navigation" class="main-navigation">
				<?php
				wp_nav_menu(
					array(
						'primary-menu' => 'primary-menu',
						'menu_id'        => 'primary-menu',
					)
				);
				?>
			</nav><!-- #site-navigation -->
			<div class="site-header__phone primary-button">
				<a href="tel:16467334711">Call now</a>
			</div>
		</div>	
	</header><!-- #masthead -->
