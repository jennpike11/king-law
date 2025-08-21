<?php  // Animated List Block
  if( have_rows('animated_list_block') ): 
  while( have_rows('animated_list_block') ): the_row(); 
  $verticalPadding = get_sub_field('vertical_padding');
  ?>

  <section class="animated-list-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  	<div class="animated-list-block">
      <div class="animated-list-block__items">
        <?php  while( have_rows('list_items') ): the_row(); 
        $heading = get_sub_field('heading');
        $link = get_sub_field('link');
        $image = get_sub_field('image');
        ?>
        <a class="animated-list-block__item" style="background-image: url('<?php echo ($image['url']) ?>" href="<?php echo $link ?>">
          <h2 class="animated-list-block__heading"><?php echo esc_html($heading); ?></h2>
        </a>
        <?php endwhile; ?>
      </div>
    </div>
	</section>	

  <?php endwhile; ?>
  <?php endif; ?>
