<?php // spacing Block

  if( have_rows('spacing_block') ): 
  while( have_rows('spacing_block') ): the_row(); 
    $padding = get_sub_field('vertical_padding'); 
  ?>

<section class="spacing-block padding--<?php echo $padding ?>"></section>

<?php endwhile; ?>
<?php endif; ?>

