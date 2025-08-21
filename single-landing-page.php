<?php
/**
 * Template Name: Landing Page
 * Template Post Type: landing-page
 */

get_header();
?>  

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content-landing-page', get_post_type() );

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php get_footer();
