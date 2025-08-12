<?php
/**
 * 
 * PRC footer
 *
 */

// Hide CTA on Landing Page CPT singles and archives
$landing_cpt_slugs = ['landing_page', 'landing-page']; // use your actual CPT key
$hide_cta = is_singular($landing_cpt_slugs) || is_post_type_archive($landing_cpt_slugs);
?>

<footer class="site-footer__wrapper">
  <div class="site-footer">
    <?php if ( ! $hide_cta ) : ?>
      <div class="site-footer__cta">
        <h2 class="site-footer__heading">
          Call the king. Your accident superhero. Over $100,000,000 in settlements.
        </h2>
				<div class="site-footer__form">
					<?php echo do_shortcode('[contact-form-7 id="ebe9ad7" title="Contact"]') ?>
				</div>
				<div class="site-footer__contact-info">
					<div class="site-footer__locations">
						<div class="site-footer__location-one">
							<div>16909 Partheina Street, Suite 102A</div>
							<div>Northridge, CA 91343</div>
							<div class="site-footer__phone"><span>English:</span> (818) 918-9739</div>
						</div>
						<div class="site-footer__location-two">
							<div>13365 Oak Crest Drive, Suite 240</div>
							<div>Westlake Village, CA 91361</div>
							<div class="site-footer__phone"><span>Spanish:</span> (818) 855-5116</div>
						</div>
					</div>
					<div class="socials">
						<div class="socials__message">Follow us for tips</div>
						<div class="socials__links">
							<a class="instagram" href="https://www.instagram.com/" target="_blank"></a>
							<a class="linkedin" href="https://www.linkedin.com/" target="_blank"></a>
							<a class="x" href="https://x.com/" target="_blank"></a>
							<a class="google-reviews" href="" target="_blank"></a>
						</div>
					</div>
				</div>
      </div>
    <?php endif; ?>
  </div><!-- .site-footer -->

  <div class="site-footer__registration">
    &copy;2024 <?php echo date('Y') !== '2024' ? ' - ' . date('Y') : ''; ?>
    <?php echo esc_html( get_bloginfo('name') ); ?>
  </div>
</footer><!-- .site-footer__wrapper -->

<?php wp_footer(); ?>
</body>
</html>
