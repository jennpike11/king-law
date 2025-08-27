<?php  // Animated List Block
  if( have_rows('animated_list_block') ): 
  while( have_rows('animated_list_block') ): the_row(); 
  $verticalPadding = get_sub_field('vertical_padding');
  ?>

  <section class="animated-list-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  	<div class="animated-list-block">
      <div class="animated-list-block__items">
        <?php  while( have_rows('items') ): the_row(); 
          $heading = get_sub_field('heading');
          $description = get_sub_field('description');
          $link = get_sub_field('link');
          $image = get_sub_field('image');
        ?>
        <div class="animated-list-block__item" style="background-image: url('<?php echo $image['url'] ?>');">
          <h2 class="animated-list-block__heading"><span><?php echo esc_html($heading); ?></span></h2>
          
          <?php if($description): ?>
          <div class="animated-list-block__description">
            <span><?php echo $description ?></span>
            <?php if($link): ?>
              <a class="animated-list-block__link" href="<?php $link['url'] ?>">Read more</a>
            <?php endif; ?>
          </div>
          <?php endif; ?>

        </div>
        <?php endwhile; ?>
      </div>
    </div>
	</section>	

  <?php endwhile; ?>
  <?php endif; ?>
