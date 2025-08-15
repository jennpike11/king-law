<?php // Home Page Hero
  if( have_rows('home_page_hero') ): 
  while( have_rows('home_page_hero') ): the_row(); 
    $backgroundColor = get_sub_field('background_color');
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $statement = get_sub_field('statement');
    $cta = get_sub_field('cta');
?>

<section class="home-page-hero__wrapper background-color--<?php echo $backgroundColor ?>">
  <div class="home-page-hero__ticker ticker__wrapper">
    <div class="ticker">
      Need more dough? Call The Gringo. Over $100,000,000 in winnings! Need more dough? Call The Gringo. Over $100,000,000 in winnings! Need more dough? Call The Gringo. Over $100,000,000 in winnings!
    </div>
  </div>

  <div class="star-row" aria-hidden="true"></div>

  <div class="home-page-hero">

    <h1 class="home-page-hero__heading">
      <span>K</span><span>I</span><span>N</span><span>G</span> <span>L</span><span>A</span><span>W</span>
    </h1>

    <div class="home-page-hero__content">
      <div class="home-page-hero__text-left">Better call<br>The Gringo</div>
      <div class="home-page-hero__image">
        <img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/arms_crossed_half_body.png">
      </div>
      <div class="home-page-hero__text-right">Wins over $100,000,000!</div>
    </div>
    

  </div>  
</section>

<?php endwhile; ?>
<?php endif; ?>
