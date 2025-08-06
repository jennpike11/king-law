<?php if (have_rows('horizontal_slide_text_block')): 
  while (have_rows('horizontal_slide_text_block')): the_row(); ?>

  <section class="horizontal-slide-text-block__scroll-wrapper">
    <div class="horizontal-slide-text-block__fixed">
      <ul class="horizontal-slide-text-block__list">
        <?php if (have_rows('text_blocks')):
          while (have_rows('text_blocks')): the_row(); 
            $heading = get_sub_field('heading');
            $description = get_sub_field('description'); ?>
            <li class="horizontal-slide-text-block__item">
              <div class="horizontal-slide-text-block__content">
                <h2 class="horizontal-slide-text-block__heading"><?php echo esc_html($heading); ?></h2>
                <div class="horizontal-slide-text-block__description"><?php echo wp_kses_post($description); ?></div>
              </div>
            </li>
        <?php endwhile; endif; ?>
      </ul>
    </div>
  </section>

<?php endwhile; endif; ?>
