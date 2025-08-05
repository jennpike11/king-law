<?php
/**
 * 
 * PRC Startup Package standard footer
 *
 */

?>
<footer class="site-footer__wrapper">
	<div class="site-footer">
		<?php get_sidebar(); ?>	
	</div><!-- .site-footer -->
	<div class="site-footer__registration">&copy;2024 - <?php echo date("Y"); ?> <?php echo get_bloginfo( 'name' ); ?></div>
</footer><!-- .site-footer__wrapper -->

	<?php wp_footer(); ?>

	</body>
</html>
