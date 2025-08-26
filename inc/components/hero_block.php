<?php // Home Page Hero
if ( have_rows('hero_block') ) :
  while ( have_rows('hero_block') ) : the_row();
    $background       = get_sub_field('background'); 
    $backgroundVideo  = get_sub_field('background_video'); // can be URL or [video ...]
    $backgroundImage  = get_sub_field('background_image'); // can be URL or array
    $heading          = get_sub_field('heading');
    $subheading       = get_sub_field('subheading');
    $cta              = get_sub_field('cta');

    // Normalize poster
    $poster = is_array($backgroundImage) ? $backgroundImage['url'] : $backgroundImage;

    // Normalize video src (handle [video mp4="..."] or [video src="..."])
    $videoSrc = '';
    if (is_array($backgroundVideo)) {
      $videoSrc = isset($backgroundVideo['url']) ? $backgroundVideo['url'] : '';
    } elseif (is_string($backgroundVideo)) {
      if (strpos($backgroundVideo, '[video') !== false) {
        if (preg_match('/mp4="([^"]+)"/', $backgroundVideo, $m)) {
          $videoSrc = $m[1];
        } elseif (preg_match('/src="([^"]+)"/', $backgroundVideo, $m)) {
          $videoSrc = $m[1];
        }
      } else {
        $videoSrc = $backgroundVideo;
      }
    }
?>
<section class="hero-block__wrapper">

  <?php if ($background === 'video' && $videoSrc) : ?>
    <video class="hero-block__video"
      autoplay muted loop playsinline preload="auto" aria-hidden="true"
      <?php if ($poster) { ?>poster="<?php echo $poster; ?>"<?php } ?>>
      <source src="<?php echo $videoSrc; ?>" type="video/mp4" />
    </video>

  <?php elseif ($background === 'image' && $poster) : ?>
    <img class="hero-block__image" src="<?php echo $poster; ?>">
  <?php endif; ?>

  <div class="hero-block">
    <div class="hero-block__text">
      <?php if ($heading) : ?>
        <h1 class="hero-block__heading"><?php echo $heading; ?></h1>
      <?php endif; ?>
    </div>

    <div class="hero-block__king">
      <img src="https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/arms_crossed_half_body.png" alt="">
    </div>
  </div>
</section>
<?php
  endwhile;
endif;
