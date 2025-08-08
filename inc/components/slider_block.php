<?php
// Slider Block
if (have_rows('slider_block')): 
  while (have_rows('slider_block')): the_row(); 
    $blockHeading = get_sub_field('heading');
    ?>

    <section class="slider-block__wrapper">
      
      <?php if($blockHeading): ?>
      <div class="slider-block__heading">
        <h2><?php echo $blockHeading ?></h2>
      </div>
      <?php endif; ?>

      <div class="slider-block__slides">
        <?php  while( have_rows('slides') ): the_row(); 
          $image = get_sub_field('image');
          $heading = get_sub_field('heading');
          $cta = get_sub_field('cta');
          ?>
          <div class="slider-block__slide" style="background-image: url('<?php echo $image['url'] ?>');">
            <div class="slider-block__slide-heading"><?php echo $heading ?></div>
            <div class="slider-block__slide-cta"><a href="<?php echo $cta['url'] ?>"><?php echo $cta['title'] ?></a></div>
          </div>
        <?php endwhile; ?>
      </div>
    </section>

  <?php endwhile; 
endif;
?>
