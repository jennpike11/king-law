<?php // Home Page Hero
  if( have_rows('hero_block') ): 
  while( have_rows('hero_block') ): the_row(); 
    $background = get_sub_field('background');
    $video = get_sub_field('video');
    $image = get_sub_field('image');
    $heading = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $cta = get_sub_field('cta');
?>

<section class="hero-block__wrapper">

<?php if (! empty ($video)){ ?>
  <video
    class="hero-block__video"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    aria-hidden="true" >
    <source src="<?php echo ($video) ?>" type="video/mp4" />
  </video>
<?php } ?>

<?php if (! empty ($image)){ ?>
  <img src="<?php echo ($image['url']) ?>" alt="<?php echo ($image['alt']) ?>">
<?php } ?>

  <div class="hero-block">
    <div class="hero-block__text">
      <h1 class="hero-block__heading"><?php echo ($heading) ?></h1>
      <?php if(!empty($subheading)){ ?>
        <div class="hero-block__subheading"><?php echo ($subheading) ?></div>
      <?php } ?>
    </div>

    <div class="hero-block__king">
      <img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/arms_crossed_half_body.png">
    </div>
  </div>  

  <div class="hero-block__burst">
    <img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/burst_gringo.png">
  </div>

</section>

<?php endwhile; ?>
<?php endif; ?>
