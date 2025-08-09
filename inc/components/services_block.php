<?php
if (have_rows('services_block')):
  while (have_rows('services_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $blockHeading = get_sub_field('block_heading');
?>
<section class="services-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">

  <?php if($blockHeading): ?>
    <div class="services-block__block-heading"><?php echo $blockHeading ?></div>
  <?php endif; ?>
  
  <div class="services-block">

  <?php if (have_rows('services')): ?>
    <div class="services-block__services">
      <?php while (have_rows('services')): the_row();
        $heading = get_sub_field('heading');
        $description = get_sub_field('description');
        $link = get_sub_field('link');
      ?>
          <div class="services-block__content">
            <h2 class="services-block__heading"><?php echo esc_html($heading); ?></h2>
            <div class="services-block__description"><?php echo wp_kses_post($description); ?>
              <?php if($link): ?>
                <div class="primary-button">
                  <a href="<?php echo esc_url($link['url']); ?>">
                    <?php echo esc_html($link['title']); ?>
                  </a>
                </div>
              <?php endif; ?>  
            </div>
        </div>
      <?php endwhile; ?>
    </div>
  <?php endif; ?>


  <?php if (have_rows('services')): ?>
    <div class="services-block__images">
      <?php while (have_rows('services')): the_row();
        $image = get_sub_field('image');
      ?> 
      <div class="services-block__image">
          <img src="<?php echo ($image['url']) ?>" alt="<?php echo ($image['alt']) ?>">
        </div>
      </div>
      <?php endwhile; ?>
    </div>
  <?php endif; ?>

  </div>
</section>
<?php
  endwhile;
endif;
