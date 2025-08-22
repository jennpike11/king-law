<?php // Home Page Hero
if ( have_rows('hero_block') ) :
  while ( have_rows('hero_block') ) : the_row();
    $background = get_sub_field('background'); // expected: 'video' or 'image'
    $video_raw  = get_sub_field('video');      // ACF File/URL/oEmbed
    $image_raw  = get_sub_field('image');      // ACF Image (ID/Array/URL)
    $heading    = get_sub_field('heading');
    $subheading = get_sub_field('subheading');
    $cta        = get_sub_field('cta');

    // --- normalize VIDEO ---
    $video_url   = '';
    $video_embed = '';
    if (is_array($video_raw)) {                   // ACF File (array)
      if (!empty($video_raw['url'])) $video_url = $video_raw['url'];
    } elseif (is_numeric($video_raw)) {           // ACF File (ID)
      $video_url = wp_get_attachment_url($video_raw);
    } elseif (is_string($video_raw) && $video_raw !== '') {
      if (stripos($video_raw, '<iframe') !== false) $video_embed = $video_raw; // oEmbed HTML
      else $video_url = $video_raw;               // plain URL
    }

    // --- normalize IMAGE ---
    $image_html = '';
    $image_url  = '';
    if (is_array($image_raw)) {                   // ACF Image (array)
      $image_url  = $image_raw['url'] ?? '';
      $image_html = wp_get_attachment_image($image_raw['ID'] ?? 0, 'full', false, [
        'alt' => $image_raw['alt'] ?? '',
      ]);
      if (!$image_html && $image_url) {
        $image_html = '<img src="'.esc_url($image_url).'" alt="'.esc_attr($image_raw['alt'] ?? '').'">';
      }
    } elseif (is_numeric($image_raw)) {           // ACF Image (ID)
      $image_html = wp_get_attachment_image($image_raw, 'full');
      $image_url  = wp_get_attachment_url($image_raw);
    } elseif (is_string($image_raw) && $image_raw !== '') { // URL
      $image_url  = $image_raw;
      $image_html = '<img src="'.esc_url($image_url).'" alt="">';
    }
?>
<section class="hero-block__wrapper">

  <?php if ($background === 'video' && ($video_embed || $video_url)) : ?>

    <?php if ($video_embed) : ?>
      <div class="hero-block__video-embed">
        <?php echo $video_embed; // iframe HTML from oEmbed ?>
      </div>
    <?php else : ?>
      <video class="hero-block__video"
             autoplay muted loop playsinline preload="auto" aria-hidden="true"
             <?php if ($image_url) echo 'poster="'.esc_url($image_url).'"'; ?>>
        <source src="<?php echo esc_url($video_url); ?>" type="video/mp4" />
      </video>
    <?php endif; ?>

  <?php elseif ($background === 'image' && $image_html) : ?>

    <?php echo $image_html; ?>

  <?php else : ?>
    <?php
      // Graceful fallback: prefer image, else video if available
      if ($image_html) {
        echo $image_html;
      } elseif ($video_url) { ?>
        <video class="hero-block__video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
          <source src="<?php echo esc_url($video_url); ?>" type="video/mp4" />
        </video>
    <?php } ?>
  <?php endif; ?>

  <div class="hero-block">
    <div class="hero-block__text">
      <?php if ($heading) : ?>
        <h1 class="hero-block__heading"><?php echo esc_html($heading); ?></h1>
      <?php endif; ?>
      <?php if ($subheading) : ?>
        <div class="hero-block__subheading"><?php echo wp_kses_post($subheading); ?></div>
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
