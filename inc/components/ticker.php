<?php
// Ticker
if (have_rows('ticker')): 
  while (have_rows('ticker')): the_row(); 
    $text = get_sub_field('text');
    ?>

    <section class="ticker__wrapper">
        <div class="ticker">
          <div class="ticker__text"><?php echo $text ?></div>
        </div> 
    </section>

  <?php endwhile; 
endif;
?>
