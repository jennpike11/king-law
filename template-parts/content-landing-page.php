<?php
/**
 * Template part for displaying landing page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package prc_theme
 */

?>

<div class="entry-content landing-page">
	<div class="landing-page__header">
		<?php get_template_part( './inc/components/landing_page_hero_block'); ?>	
	</div>
	<div class="landing-page__content__wrapper">
		<div class="landing-page__content">
			<?php get_template_part( './inc/partials/landing-page-builder'); ?>	
		</div>		
	</div>
	<div class="landing-page__footer">
		<?php get_template_part( './inc/components/landing_page_footer'); ?>	
	</div>
</div><!-- .entry-content -->



