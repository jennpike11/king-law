<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package prc_theme
 */

get_header();
?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<div class="entry-content">
			<div class="category-header">
				<img src="https://bnilunchandthecity.com/wp-content/uploads/2023/06/essex-barn-rev-14.jpeg">
				<h1 class="category-title">
					<?php
					/* translators: %s: search query. */
					printf( esc_html__( 'Search Results for: %s', 'prc-theme' ), '<span>' . get_search_query() . '</span>' );
					?>
				</h1>
			</div>
			<div class="entry-content__main">

		<?php if ( have_posts() ) : ?>

			<div class="articles">
			<?php
			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/**
				 * Run the loop for the search to output the results.
				 * If you want to overload this in a child theme then include a file
				 * called content-search.php and that will be used instead.
				 */
				get_template_part( 'template-parts/content', 'search' );

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>
		</div>

		</div>
		</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php prc_theme_entry_footer(); ?>
	</footer><!-- .entry-footer -->

	</main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>