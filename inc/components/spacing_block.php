<?php // spacing Block

  if( have_rows('spacing_block') ): 
  while( have_rows('spacing_block') ): the_row(); 
    $padding = get_sub_field('vertical_padding'); 
    $backgroundColor = get_sub_field('background_color');
  ?>

<section class="spacing-block padding--<?php echo $padding ?> background-color--<?php echo $backgroundColor ?>"></section>

<?php endwhile; ?>
<?php endif; ?>

