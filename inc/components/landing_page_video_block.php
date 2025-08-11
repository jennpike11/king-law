<?php // Landing Page Video Block

if( have_rows('landing_page_video_block') ): 
  while( have_rows('landing_page_video_block') ): the_row(); 
    $padding = get_sub_field('vertical_padding'); 
    $backgroundColor = get_sub_field('background_color');
    $textColor = get_sub_field('text_color');
    $videoAlignment = get_sub_field('video_alignment');
    $video = get_sub_field('video');
    $heading = get_sub_field('heading');
    $description = get_sub_field('description');
    $cta = get_sub_field('cta');
?>

<section class="landing-page-video-block__wrapper padding--<?php echo esc_attr($padding); ?> background-color--<?php echo esc_attr($backgroundColor); ?>">
  <div class="landing-page-video-block video-alignment--<?php echo esc_attr($videoAlignment) ?>">
    <div class="landing-page-video-block__info">
      <?php if ($heading): ?>
        <h2 class="landing-page-video-block__heading color--<?php echo esc_attr($textColor); ?>">
          <?php echo esc_html($heading); ?>
        </h2>
      <?php endif; ?>

      <?php if ($description): ?>
        <div class="landing-page-video-block__description color--<?php echo esc_attr($textColor); ?>">
          <?php echo wp_kses_post($description); ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($cta['url']) && !empty($cta['title'])): ?>
        <div class="primary-button">
          <a href="<?php echo esc_url($cta['url']); ?>" target="<?php echo esc_attr($cta['target'] ?? '_self'); ?>">
            <?php echo esc_html($cta['title']); ?>
          </a>
        </div>
      <?php endif; ?>
    </div>

    <div class="landing-page-video-block__video">
      <?php if ($video): ?>
        <div class="video-wrapper">
          <?php echo $video; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php endwhile; ?>
<?php endif; ?>
