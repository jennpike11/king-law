<?php
// Reviews Block
if (have_rows('reviews_block')): 
  while (have_rows('reviews_block')): the_row(); 
    $verticalPadding = get_sub_field('vertical_padding');
    $backgroundImage = get_sub_field('background_image');
    $heading = get_sub_field('heading');
    $subHeading = get_sub_field('subheading');
    ?>

  <section class="reviews-block__wrapper padding--<?php echo $verticalPadding ?>">
    <div class="reviews-block-text">
      <h2 class="reviews-block-text__heading"><?php echo $heading ?></h2>
      <div class="reviews-block-text__subheading"><?php echo $subHeading ?></div>
    </div>
    <div class="reviews-block" style="background-image: url('<?php echo $backgroundImage['url'] ?>');">
      <div class="reviews-block__slides">
        <?php  while( have_rows('slides') ): the_row(); 
        $quote = get_sub_field('quote');
        $author = get_sub_field('author');
        ?>
        <div class="reviews-block__slide">
          <div class="reviews-block__content">
            <div class="reviews-block__stars"><img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/stars.webp"></div>
            <div class="reviews-block__quote"><?php echo $quote ?></div>
            
            <?php if($author): ?>
              <div class="reviews-block__author">&middot; <?php echo $author ?></div>
            <?php endif; ?>
        </div>
  
        </div>
        <?php endwhile; ?>
      </div>
    </div>
  </section>

  <?php endwhile; 
endif;
?>
