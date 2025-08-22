<?php // Two Column Block
if( have_rows('two_column_block') ): 
  while( have_rows('two_column_block') ): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding'); 
    $columnAlignment = get_sub_field('column_alignment'); 
    $headingOne = get_sub_field('column_one_heading'); 
    $descriptionOne = get_sub_field('column_one_description');
    $imageOne = get_sub_field('column_one_image');
    $buttonOne = get_sub_field('column_one_button');
    $headingTwo = get_sub_field('column_two_heading'); 
    $descriptionTwo = get_sub_field('column_two_description'); 
    $imageTwo = get_sub_field('column_two_image');
    $buttonTwo = get_sub_field('column_two_button');
?>

<section class="two-column-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  <div class="two-column-block">
    <div class="column column--one">
      <?php if( $imageOne ): ?>
        <div class="column__image">
          <img src="<?php echo esc_url($imageOne['url']); ?>" alt="<?php echo esc_attr($imageOne['alt']); ?>">
        </div>  
      <?php endif; ?>  

      <?php if( $headingOne || $descriptionOne || $buttonOne ): ?>
        <div class="column__content">   
          <?php if( $headingOne ): ?>
            <h2 class="column__heading">
              <?php echo esc_html($headingOne); ?>
            </h2>
          <?php endif; ?>

          <?php if( $descriptionOne ): ?>
            <div class="column__description">
              <?php echo wp_kses_post($descriptionOne); ?>
            </div>
          <?php endif; ?>

          <?php if( $buttonOne != ""): ?>
            <div class="primary-button">
              <a href="<?php echo esc_url($buttonOne['url']); ?>">
                <?php echo esc_html($buttonOne['title']); ?>
              </a>
            </div>
          <?php endif; ?>
        </div>
      <?php endif; ?>
    </div>

    <div class="column column--two">
      <?php if( $imageTwo ): ?>
        <div class="column__image">
          <img src="<?php echo esc_url($imageTwo['url']); ?>" alt="<?php echo esc_attr($imageTwo['alt']); ?>">
        </div>  
      <?php endif; ?>  

      <?php if( $headingTwo || $descriptionTwo || $buttonTwo ): ?>
        <div class="column__content">
          <?php if( $headingTwo ): ?>
            <h2 class="column__heading>">
              <?php echo esc_html($headingTwo); ?>
            </h2>
          <?php endif; ?>

          <?php if( $descriptionTwo ): ?>
            <div class="column__description">
              <?php echo wp_kses_post($descriptionTwo); ?>
            </div>
          <?php endif; ?>

          <?php if( $buttonTwo != ""): ?>
            <div class="primary-button">
              <a href="<?php echo esc_url($buttonTwo['url']); ?>">
                <?php echo esc_html($buttonTwo['title']); ?>
              </a>
            </div>
          <?php endif; ?>
        </div>
      <?php endif; ?>  
    </div>
  </div>  
</section>

<?php endwhile; ?>
<?php endif; ?>  
