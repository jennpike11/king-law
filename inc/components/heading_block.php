<?php // Heading
  if( have_rows('heading_block') ): 
  while( have_rows('heading_block') ): the_row(); 
    $pading = get_sub_field('pading');
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
?>

<section class="heading-block__wrapper padding--<?php echo ($verticalPadding) ?>">
  <div class="heading-block">
    <div class="heading-block__right">   
      <h2 class="heading-block__heading"><?php echo $heading ?></h2>  
    <div>
    <div class="heading-block__left">
      <div class="heading-block__subheading"><?php echo $subheading ?></div>
    <div>
  </div>
</section>
 
<?php endwhile; ?>
<?php endif; ?>