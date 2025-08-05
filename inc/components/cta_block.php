<?php // CTA Block

if (have_rows('cta_block')): 
  while (have_rows('cta_block')): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding'); 
    $backgroundColor = get_sub_field('background_color');
    $backgroundImage = get_sub_field('background_image');
    $heading = get_sub_field('heading');
    $ctaColor = get_sub_field('cta_color');
    $ctaOne = get_sub_field('cta_one');
    $ctaTwo = get_sub_field('cta_two');
?>

<section class="cta-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?> background-color--<?php echo esc_attr($backgroundColor); ?>" style="background-image: url('<?php echo esc_attr($backgroundImage['url']) ?>');">
  <div class="cta-block">

    <?php if (!empty($heading)): ?>
      <h2 class="cta-block__heading"><?php echo esc_html($heading); ?></h2>
    <?php endif; ?>

    <div class="cta-block__buttons cta-color--<?php echo esc_attr($ctaColor) ?>">
      <?php if (!empty($ctaOne['url']) && !empty($ctaOne['title'])): ?>
        <div class="primary-button">
          <a href="<?php echo esc_url($ctaOne['url']); ?>" 
            target="<?php echo esc_attr($ctaOne['target'] ?? '_self'); ?>">
            <?php echo esc_html($ctaOne['title']); ?>
          </a>
        </div>
      <?php endif; ?>

      <?php if (!empty($ctaTwo['url']) && !empty($ctaTwo['title'])): ?>
        <div class="secondary-button">
          <a href="<?php echo esc_url($ctaTwo['url']); ?>" 
            target="<?php echo esc_attr($ctaTwo['target'] ?? '_self'); ?>">
            <?php echo esc_html($ctaTwo['title']); ?>
          </a>
        </div>
      <?php endif; ?>
    </div>

  </div>
</section>

<?php 
  endwhile; 
endif;
?>
