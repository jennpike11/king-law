<?php  // Animated List Block
  if( have_rows('animated_list_block') ): 
  while( have_rows('animated_list_block') ): the_row(); 
  ?>

  <section class="animated-list-block__wrapper">
  	<div class="animated-list-block">
      <div class="animated-list-block__items">
        <?php  while( have_rows('list_items') ): the_row(); 
        $heading = get_sub_field('heading');
        $link = get_sub_field('link');
        ?>
        <a class="animated-list-block__item" href="<?php echo $link['url'] ?>">
          <h2 class="animated-list-block__heading"><?php echo esc_html($heading); ?></h2>
          <span class="b-1"></span>
          <span class="b-2"></span>
          <span class="b-3"></span>
          <span class="b-4"></span>
        </a>
        <?php endwhile; ?>
      </div>
    </div>
	</section>	

  <?php endwhile; ?>
  <?php endif; ?>
