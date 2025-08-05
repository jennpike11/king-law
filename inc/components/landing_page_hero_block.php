<?php // Landing Page Hero Block

if( have_rows('landing_page_hero_block') ): 
  while( have_rows('landing_page_hero_block') ): the_row(); 
    $heroType = get_sub_field('hero_type'); 
    $backgroundImage = get_sub_field('background_image');
    $imageToSlide = get_sub_field('image_to_slide');
    $credentials = get_sub_field('credentials');
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $phoneNumber = get_sub_field('phone_number');
    $cta = get_sub_field('cta');
    $formId = get_sub_field('form_id');
?>

<?php if($heroType == 'sliding-image'){ ?>
 
  <div class="landing-page-hero-block--sliding-image" style="background-image: url('<?php echo esc_url($backgroundImage['url']); ?>');">
    <div class="landing-page-hero-block--sliding-image__content">
      <div class="landing-page-hero-block--sliding-image__info">
        <div>
          <?php if( $heading ): ?>
            <h1 class="landing-page-hero-block--sliding-image__heading">
              <?php echo esc_html($heading); ?>
            </h1>
          <?php endif; ?> 

          <?php if( $subheading ): ?>
            <div class="landing-page-hero-block--sliding-image__subheading">
              <?php echo esc_html($subheading); ?>
            </div>
          <?php endif; ?> 

          <?php if( $phoneNumber ): ?>
            <div class="landing-page-hero-block--sliding-image__phone">
              <div>Free consultation now</div>
              <a href="tel:<?php echo esc_attr($phoneNumber); ?>"><?php echo esc_html($phoneNumber); ?></a>
            </div>
          <?php endif; ?> 

          <?php if( $cta ): ?>
            <div class="landing-page-hero-block--sliding-image__cta">
              <div class="primary-button">
                <a href="<?php echo esc_url($cta['url']); ?>"><?php echo esc_html($cta['title']); ?></a>
              </div>
            </div>
          <?php endif; ?> 
        </div>
      </div>
      <div class="landing-page-hero-block--sliding-image__form">
        <div><?php echo do_shortcode('[contact-form-7 id="' . esc_attr($formId) . '"]'); ?></div>
      </div>
    </div>

    <?php if($imageToSlide): ?>
      <div class="sliding-image">
        <img src="<?php echo esc_url($imageToSlide['url']); ?>" alt="<?php echo esc_url($imageToSlide['alt']); ?>">
      </div>
    <?php endif; ?> 

    <?php if($credentials): ?>
      <div class="credentials">
        <?php if( have_rows('credentials') ): 
          while( have_rows('credentials') ): the_row(); 
          $icon = get_sub_field('icon'); 
          $description = get_sub_field('description'); 
        ?>
          <div class="credentials__item">
            <div class="credentials__icon icon-<?php echo esc_attr($icon); ?>"></div>
            <div class="credentials__description">
              <?php echo esc_html($description); ?>
            </div>
          </div>
        <?php endwhile; ?>
        <?php endif; ?>
      </div>
    </div>
  <?php endif; ?>  

<?php } else { ?>

  <?php if (!empty($backgroundImage)) { ?>
    <div class="landing-page-hero-block--standard" style="background-image: url('<?php echo esc_url($backgroundImage['url']); ?>');">
  <?php } else { ?>
    <div class="landing-page-hero-block--standard" style="background-color: #000000;">
  <?php } ?>
    <div class="landing-page-hero-block--standard__content">
      <div class="landing-page-hero-block--standard__info">
        <div>
          <?php if( $heading ): ?>
            <h1 class="landing-page-hero-block--standard__heading text-gradient">
              <?php echo esc_html($heading); ?>
            </h1>
          <?php endif; ?> 

          <?php if( $subheading ): ?>
            <div class="landing-page-hero-block--standard__subheading">
              <?php echo esc_html($subheading); ?>
            </div>
          <?php endif; ?> 

          <?php if( $phoneNumber ): ?>
            <div class="landing-page-hero-block--standard__phone">
              <div>Free consultation now</div>
              <a href="tel:<?php echo esc_attr($phoneNumber); ?>"><?php echo esc_html($phoneNumber); ?></a>
            </div>
          <?php endif; ?> 

          <?php if( $cta ): ?>
            <div class="landing-page-hero-block--standard__cta">
              <div class="primary-button">
                <a href="<?php echo esc_url($cta['url']); ?>"><?php echo esc_html($cta['title']); ?></a>
              </div>
            </div>
          <?php endif; ?> 
        </div>
      </div>
      <div class="landing-page-hero-block--standard__form">
        <div><?php echo do_shortcode('[contact-form-7 id="' . esc_attr($formId) . '"]'); ?></div>
      </div>
    </div>
  </div>

<?php } ?>

<?php endwhile; ?>
<?php endif; ?>
