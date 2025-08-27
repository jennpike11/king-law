<?php // Two Column Block
if( have_rows('animated_two_column_block') ): 
  while( have_rows('animated_two_column_block') ): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding'); 
    $heading = get_sub_field('heading'); 
    $description = get_sub_field('description');
    $cta = get_sub_field('cta'); 
    $image = get_sub_field('image'); 
    $reverseLayout = get_sub_field('reverse_layout'); 
?>

<section class="animated-two-column-block__wrapper padding--<?php echo $verticalPadding ?>">
  <div class="animated-two-column-block reverse--<?php echo $reverseLayout ?>">
    <div class="animated-two-column-block__image">
      <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
    </div>  

    <div class="animated-two-column-block__content"> 

      <?php if( $heading ): ?>
        <h2 class="animated-two-column-block__heading">
          <?php echo esc_html($heading); ?>
        </h2>
      <?php endif; ?>

      <?php if( $description ): ?>
        <div class="animated-two-column-block__description">
          <?php echo wp_kses_post($description); ?>

          <?php if( $cta != ""): ?>
            <div class="primary-button">
              <a href="<?php echo esc_url($cta['url']); ?>">
                <?php echo esc_html($cta['title']); ?>
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
