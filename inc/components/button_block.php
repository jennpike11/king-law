<?php // button Block

if (have_rows('button_block')): 
  while (have_rows('button_block')): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding'); 
    $backgroundImage = get_sub_field('background_image');
    $heading = get_sub_field('heading');
    $buttonColor = get_sub_field('button_color');
    $buttonOne = get_sub_field('button_one');
    $buttonTwo = get_sub_field('button_two');
?>

<section class="button-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>" style="background-image: url('<?php echo esc_attr($backgroundImage['url']) ?>');">
  <div class="button-block">

    <?php if (!empty($heading)): ?>
      <h2 class="button-block__heading"><?php echo esc_html($heading); ?></h2>
    <?php endif; ?>

    <div class="button-block__buttons button-color--<?php echo esc_attr($buttonColor) ?>">
      <?php if (!empty($buttonOne['url']) && !empty($buttonOne['title'])): ?>
        <div class="primary-button">
          <a href="<?php echo esc_url($buttonOne['url']); ?>" 
            target="<?php echo esc_attr($buttonOne['target'] ?? '_self'); ?>">
            <?php echo esc_html($buttonOne['title']); ?>
          </a>
        </div>
      <?php endif; ?>

      <?php if (!empty($buttonTwo['url']) && !empty($buttonTwo['title'])): ?>
        <div class="primary-button">
          <a href="<?php echo esc_url($buttonTwo['url']); ?>" 
            target="<?php echo esc_attr($buttonTwo['target'] ?? '_self'); ?>">
            <?php echo esc_html($buttonTwo['title']); ?>
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
