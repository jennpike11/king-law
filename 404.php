<?php /* 404 Not Found Page */ ?>

<?php get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">
		<div class="entry-content">
			<div class="entry-content__main">
				<h3>Not found, error 404</h3>
				<p>The page you are looking for no longer exists. Perhaps you can return back to the homepage and see if you can find what you are looking for. Or, you can try finding it by using the search form below.</p>
				<div class="entry-content__search-form"><?php get_search_form(); ?></div>
			</div>
		</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php prc_theme_entry_footer(); ?>
	</footer><!-- .entry-footer -->

	</main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>