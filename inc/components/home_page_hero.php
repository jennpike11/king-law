<?php // Home Page Hero
  if( have_rows('home_page_hero') ): 
  while( have_rows('home_page_hero') ): the_row(); 
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $statement = get_sub_field('statement');
    $cta = get_sub_field('cta');
?>

<section class="home-page-hero__wrapper">
  <div class="home-page-hero">

    <h1 class="home-page-hero__heading">
      <?php echo $heading ?> 
    </h1>

    <h2 class="home-page-hero__subheading">
      <?php echo $subheading ?>
    </h2>
  
    <div class="home-page-hero__image">
      <img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/arms_crossed_half_body.png">
    </div>

    <div class="home-page-hero__statement ticker__wrapper">
      <div class="ticker">
        <?php echo ($statement) ?>
        </div>
    </div>
  </div>  
</section>

<?php endwhile; ?>
<?php endif; ?>
