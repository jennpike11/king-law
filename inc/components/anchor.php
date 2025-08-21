<?php // Anchor
  if( have_rows('anchor') ): 
  while( have_rows('anchor') ): the_row(); 
    $anchorName = get_sub_field('anchor_name');
?>

  <div class="anchor" id="<?php echo $anchorName ?>"></div>  
 
<?php endwhile; ?>
<?php endif; ?>