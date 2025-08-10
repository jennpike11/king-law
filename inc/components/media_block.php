<?php
// media
if (have_rows('media_block')): 
  while (have_rows('media_block')): the_row(); 
    $mediaType = get_sub_field('media_type');
    $video = get_sub_field('video');
    $image - get_sub_field('media')
    ?>

    <section class="media-block__wrapper">
        <div class="media-block">
          <?php if ($mediaType == 'video'): ?>
            <div class="media-block__video">
              <?php echo $video; ?>
            </div>
          <?php endif; ?>

        <?php if ($mediaType == 'image'): ?>
          <div class="media-block__image">
            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
          </div>
        <?php endif; ?>         
          
        </div> 
    </section>

  <?php endwhile; 
endif;
?>
