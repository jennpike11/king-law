<?php
// Reviews Block
if (have_rows('reviews_block')): 
  while (have_rows('reviews_block')): the_row(); 
    $backgroundImage = get_sub_field('background_image');
    $heading = get_sub_field('heading');
    $subHeading = get_sub_field('subheading');
    ?>

  <section class="reviews-block__wrapper" style="background-image: url('<?php echo $backgroundImage['url'] ?>');>">
    <div class="reviews-block">
      <div class="reviews-block__content">
        <div class="reviews-block__heading">
          <h2><?php echo $heading ?></h2>
          <span><?php echo $subHeading ?></span>
        </div>
        <div class="reviews-block__slides">
          <?php  while( have_rows('slides') ): the_row(); 
          $quote = get_sub_field('quote');
          $author = get_sub_field('author');
          ?>
          <div class="reviews-block__slide">
            <div class="reviews-block__quote"><?php echo $quote ?></div>
            
            <?php if($author): ?>
              <div class="reviews-block__author"><?php echo $author ?></div>
            <?php endif; ?>
    
          </div>
          <?php endwhile; ?>
        </div>
      </div>
    </div>
  </section>

  <?php endwhile; 
endif;
?>
