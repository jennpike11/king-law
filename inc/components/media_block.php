<?php
// Media
if (have_rows('media_block')): 
  while (have_rows('media_block')): the_row(); 

    $mediaType = get_sub_field('media_type');            // 'Video MP4', 'Video URL', or 'Image Only'
    $videoMP4  = get_sub_field('video_upload_mp4');      // File field (array)
    $videoURL  = get_sub_field('video_share_url');       // oEmbed or YouTube/Vimeo URL
    $image     = get_sub_field('image');                 // Image field (array)
    $subheading     = get_sub_field('subheading'); 
    $heading     = get_sub_field('heading'); 
    $cta     = get_sub_field('cta'); 
    ?>

    <section class="media-block__wrapper">
      
      <!-- Background Layer -->
      <div class="media-block__media-background" data-parallax>
        <?php if ($mediaType === 'Video MP4' && !empty($videoMP4['url'])): ?>
          <video 
            autoplay 
            muted 
            loop 
            playsinline 
            preload="auto" 
            class="media-block__video"
          >
            <source src="<?php echo esc_url($videoMP4['url']); ?>" type="<?php echo esc_attr($videoMP4['mime_type'] ?? 'video/mp4'); ?>">
          </video>
        <?php endif; ?>

        <?php if ($mediaType === 'Video URL' && !empty($videoURL)): ?>
          <?php
            if (preg_match('~(?:youtu\.be/|youtube\.com/(?:watch\?v=|embed/))([A-Za-z0-9_\-]+)~i', $videoURL, $m)) {
              $id = $m[1];
              echo '<iframe class="media-block__video" src="https://www.youtube.com/embed/' . esc_attr($id) . '?autoplay=1&mute=1&controls=0&loop=1&playlist=' . esc_attr($id) . '&modestbranding=1&rel=0&playsinline=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
            } elseif (preg_match('~vimeo\.com/(?:video/)?(\d+)~i', $videoURL, $m)) {
              $id = $m[1];
              echo '<iframe class="media-block__video" src="https://player.vimeo.com/video/' . esc_attr($id) . '?background=1&autoplay=1&muted=1&loop=1&controls=0&byline=0&title=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
            }
          ?>
        <?php endif; ?>

        <?php if ($mediaType === 'Image Only' && !empty($image['url'])): ?>
          <img class="media-block__image" src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt'] ?? ''); ?>">
        <?php endif; ?>
      </div>

      <!-- Foreground Content -->
      <div class="media-block">
        <div class="media-block__content">
          <?php if($subheading): ?>
            <div class="media-block__subheading"><?php echo $subheading ?></div>
          <?php endif; ?>

          <?php if($heading): ?>
            <div class="media-block__heading"><?php echo $heading ?></div>
          <?php endif; ?>

          <?php if($cta): ?>
            <div class="media-block__cta primary-button"><a href="<?php echo $cta['url'] ?>"><?php echo $cta['title'] ?></a></div>
          <?php endif; ?>  
        </div>
      </div> 

    </section>

  <?php endwhile; 
endif;
?>
