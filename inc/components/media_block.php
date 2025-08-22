<?php // Home Page media
if ( have_rows('media_block') ) :
  while ( have_rows('media_block') ) : the_row();
    $verticalPadding = get_sub_field('vertical_padding'); 
    $media = get_sub_field('media'); 
    $video  = get_sub_field('video');       
    $image  = get_sub_field('image');      

    // --- normalize VIDEO ---
    $video_url   = '';
    $video_embed = '';
    if (is_array($video)) {                   // ACF File (array)
      if (!empty($video['url'])) $video_url = $video['url'];
    } elseif (is_numeric($video)) {           // ACF File (ID)
      $video_url = wp_get_attachment_url($video);
    } elseif (is_string($video) && $video !== '') {
      if (stripos($video, '<iframe') !== false) $video_embed = $video; // oEmbed HTML
      else $video_url = $video;               // plain URL
    }

    // --- normalize IMAGE ---
    $image_html = '';
    $image_url  = '';
    if (is_array($image)) {                   // ACF Image (array)
      $image_url  = $image['url'] ?? '';
      $image_html = wp_get_attachment_image($image['ID'] ?? 0, 'full', false, [
        'alt' => $image['alt'] ?? '',
      ]);
      if (!$image_html && $image_url) {
        $image_html = '<img src="'.esc_url($image_url).'" alt="'.esc_attr($image['alt'] ?? '').'">';
      }
    } elseif (is_numeric($image)) {           // ACF Image (ID)
      $image_html = wp_get_attachment_image($image, 'full');
      $image_url  = wp_get_attachment_url($image);
    } elseif (is_string($image) && $image !== '') { // URL
      $image_url  = $image;
      $image_html = '<img src="'.esc_url($image_url).'" alt="">';
    }
?>
<section class="media-block__wrapper padding--<?php echo $verticalPadding ?>">
  <div class="media-block">

  <?php if ($media === 'video' && ($video_embed || $video_url)) : ?>

    <?php if ($video_embed) : ?>
      <div class="media-block__video-embed">
        <?php echo $video_embed; // iframe HTML from oEmbed ?>
      </div>
    <?php else : ?>
      <video class="media-block__video"
             autoplay muted loop playsinline preload="auto" aria-hidden="true"
             <?php if ($image_url) echo 'poster="'.esc_url($image_url).'"'; ?>>
        <source src="<?php echo esc_url($video_url); ?>" type="video/mp4" />
      </video>
    <?php endif; ?>

  <?php elseif ($media === 'image' && $image_html) : ?>

    <?php echo $image_html; ?>

  <?php else : ?>
    <?php
      // Graceful fallback: prefer image, else video if available
      if ($image_html) {
        echo $image_html;
      } elseif ($video_url) { ?>
        <video class="media-block__video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
          <source src="<?php echo esc_url($video_url); ?>" type="video/mp4" />
        </video>
    <?php } ?>
  <?php endif; ?>

  </div>
</section>
<?php
  endwhile;
endif;
