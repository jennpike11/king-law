<?php // One Column Block

if( have_rows('one_column_block') ): 
  while( have_rows('one_column_block') ): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding');
    $maxWidth = get_sub_field('max_width');
    $heading = get_sub_field('heading'); 
    $description = get_sub_field('description');
    $link = get_sub_field('link');
?>

<section class="one-column-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  <div class="one-column-block content-width--<?php echo esc_attr($maxWidth); ?>">
    <?php if($heading): ?>
      <h2 class="one-column-block__heading">
        <?php echo esc_html($heading); ?>
      </h2>
    <?php endif; ?>  

    <?php if($subheading): ?>
      <h3 class="one-column-block__subheading">
        <?php echo esc_html($subheading); ?>
      </h3>
    <?php endif; ?>  

    <?php if($description): ?>
      <div class="one-column-block__description">
        <?php echo wp_kses_post($description); ?>
      </div>
    <?php endif; ?>  

    <?php if($link): ?>
      <div class="primary-button">
        <a href="<?php echo esc_url($link['url']); ?>">
          <?php echo esc_html($link['title']); ?>
        </a>
      </div>
    <?php endif; ?>  
  </div>
</section>

<?php endwhile; ?>
<?php endif; ?>
