<?php // Home Page Hero
  if( have_rows('home_page_hero') ): 
  while( have_rows('home_page_hero') ): the_row(); 
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $cta = get_sub_field('cta');
?>

<section class="home-page-hero__wrapper">
  <div class="home-page-hero">
    <div class="home-page-hero__content">
      <h1 class="home-page-hero__heading">
        <?php echo $heading ?>
      </h1>
      <div class="home-page-hero__subheading">
        <?php echo $subheading ?>
      </div>
      <div class="home-page-hero__cta primary-button">
        <a href="<?php echo $cta['url'] ?>"><?php echo $cta['title'] ?></a>
      </div>
    </div>
  </div>  
</section>

<?php endwhile; ?>
<?php endif; ?>
