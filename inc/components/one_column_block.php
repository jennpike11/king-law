<?php // One Column Block

if( have_rows('one_column_block') ): 
  while( have_rows('one_column_block') ): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding');
    $contentWidth = get_sub_field('content_width');
    $backgroundColor = get_sub_field('background_color');
    $textColor = get_sub_field('text_color');
    $heading = get_sub_field('heading'); 
    $subheading = get_sub_field('subheading'); 
    $paragraph = get_sub_field('paragraph');
    $link = get_sub_field('link');
    $verticalAnimation = get_sub_field('vertical_animation');
?>

<section class="one-column-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?> background-color--<?php echo esc_attr($backgroundColor); ?>">
  <div class="one-column-block content-width--<?php echo esc_attr($contentWidth); ?>">
    <?php if($heading): ?>
      <h2 class="one-column-block__heading color--<?php echo esc_attr($textColor); ?> vertical-slide-<?php echo esc_attr($verticalAnimation); ?>">
        <?php echo esc_html($heading); ?>
      </h2>
    <?php endif; ?>  

    <?php if($subheading): ?>
      <h3 class="one-column-block__subheading color--<?php echo esc_attr($textColor); ?> vertical-slide-<?php echo esc_attr($verticalAnimation); ?>">
        <?php echo esc_html($subheading); ?>
      </h3>
    <?php endif; ?>  

    <?php if($paragraph): ?>
      <div class="one-column-block__paragraph color--<?php echo esc_attr($textColor); ?> vertical-slide-<?php echo esc_attr($verticalAnimation); ?>">
        <?php echo wp_kses_post($paragraph); ?>
      </div>
    <?php endif; ?>  

    <?php if($link): ?>
      <div class="primary-button">
        <a href="<?php echo esc_url($link['url']); ?>" class="vertical-slide-<?php echo esc_attr($verticalAnimation); ?>">
          <?php echo esc_html($link['title']); ?>
        </a>
      </div>
    <?php endif; ?>  
  </div>
</section>

<?php endwhile; ?>
<?php endif; ?>
