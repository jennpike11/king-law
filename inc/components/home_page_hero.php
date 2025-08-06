<?php // Home Page Hero
  if( have_rows('home_page_hero') ): 
  while( have_rows('home_page_hero') ): the_row(); 
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $cta = get_sub_field('cta');
?>

<section class="home-page-hero">
  <div class="home-page-hero__layer background"></div>
  <div class="home-page-hero__layer middle"></div>
  <div class="home-page-hero__layer foreground">
    <div class="home-page-hero__window-glow glow-us-bank"></div>
    <div class="home-page-hero__window-glow glow-stadium"></div>
    <div class="home-page-hero__window-glow glow-building-right"></div>
    <div class="home-page-hero__window-glow glow-city-background"></div>
  </div>
  <div class="home-page-hero__content-wrapper">
    <div class="home-page-hero__content">
      <h1 class="home-page-hero__heading">
        <?php echo $heading ?>
      </h1>
      <div class="home-page-hero__heading">
        <?php echo $subheading ?>
      </div>
      <div class="home-page-hero__cta">
        <a href="<?php echo $cta['url'] ?>"><?php echo $cta['title'] ?></a>
      </div>
    </div>
  </div>  
</section>

<?php endwhile; ?>
<?php endif; ?>
