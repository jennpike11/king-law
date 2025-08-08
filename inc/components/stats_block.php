<?php
if (have_rows('stats_block')):
  while (have_rows('stats_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $heading         = get_sub_field('heading');
?>
<section class="stats-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  <div class="stats-block">
    <?php if ($heading): ?>
      <h2 class="stats-block__heading"><?php echo esc_html($heading); ?></h2>
    <?php endif; ?>

    <?php if (have_rows('stats')): ?>
      <div class="stats-block__stats">
        <?php while (have_rows('stats')): the_row();
          $statNumber      = get_sub_field('stat_number');
          $statDescription = get_sub_field('stat_description');
        ?>
          <div class="stats-block__stat">
            <div class="stats-block__number"><?php echo esc_html($statNumber); ?></div>
            <div class="stats-block__details"><?php echo esc_html($statDescription); ?></div>
          </div>
        <?php endwhile; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php
  endwhile;
endif;
