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

		<div class="site-footer-form">
			<div class="site-footer-form__headings">
				<div class="site-footer-form__subheading">Contact us today</div>
				<h2 class="site-footer-form__heading">Get a free consultation</h2>
			</div>
			<div class="site-footer-form__form">
				<?php echo do_shortcode('[contact-form-7 id="ebe9ad7" title="Contact"]') ?>
			</div>
			<div class="site-footer__map">
				<iframe
					src="https://www.google.com/maps?q=13365+Oak+Crest+Drive%2C+Suite+240+Westlake+Village%2C+CA+91361&output=embed"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					allowfullscreen
					aria-label="Map to 13365 Oak Crest Drive, Suite 240, Westlake Village, CA 91361">
				</iframe>
			</div>
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
				<div class="socials">
					<div class="socials__message">Follow for tips</div>
					<div class="socials__links">
						<a class="facebook" href="https://www.facebook.com/profile.php?id=61570183541871" target="_blank"></a>
						<a class="instagram" href="https://www.instagram.com/kennethkinglaw/" target="_blank"></a>
						<a class="tiktok" href="https://www.tiktok.com/@kennethkinglaw" target="_blank"></a>
						<a class="x" href="https://x.com/kennethkinglaw" target="_blank"></a>
						<a class="youtube" href="https://www.youtube.com/@KennethKingLaw" target="_blank"></a>
					</div>
				</div>
			</div>
		</div>

  </div><!-- .site-footer -->

  <div class="site-footer__registration">
    &copy;2024 <?php echo date('Y') !== '2024' ? ' - ' . date('Y') : ''; ?>
    <?php echo esc_html( get_bloginfo('name') ); ?>
  </div>
</footer><!-- .site-footer__wrapper -->

<?php wp_footer(); ?>
</body>
</html>
