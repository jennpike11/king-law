<?php // Landing Page Footer

if (have_rows('landing_page_footer')): 
  while (have_rows('landing_page_footer')): the_row(); 
    $padding = get_sub_field('vertical_padding'); 
    $backgroundColor = get_sub_field('background_color');
    $headingColor = get_sub_field('heading_color');
    $heading = get_sub_field('heading');
    $description = get_sub_field('description');
    $phone = get_sub_field('phone_number');
?>

<section class="landing-page-footer__wrapper background-color--<?php echo esc_attr($backgroundColor); ?>">
  <div class="landing-page-footer">
    <h2 class="landing-page-footer__heading <?php echo esc_html($headingColor) ?>"><?php echo esc_html($heading); ?></h2>
    <div class="landing-page-footer__description"><?php echo wp_kses_post($description); ?></div>
    <div class="landing-page-footer__phone">
      <div>Free Consultation Now:</div>
      <div><a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a></div>
    </div>

    <?php if (have_rows('credits')): ?>
      <div class="landing-page-footer__credits__wrapper">
      <div class="landing-page-footer__text">Accredited and<br>Recognized By </div>
      <div class="landing-page-footer__credits">
        <?php while (have_rows('credits')): the_row(); 
          $credit = get_sub_field('credit'); ?>
          <div class="landing-page-footer__credit">
            <img src="<?php echo esc_url($credit['url']); ?>" alt="<?php echo esc_attr($credit['title']); ?>">
          </div>
        <?php endwhile; ?>
      </div>
    <?php endif; ?>
  </div>
</section>

<?php 
  endwhile; 
endif; 
?>
