<?php
if (have_rows('credentials_block')):
  while (have_rows('credentials_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $heading         = get_sub_field('heading');
    $stat       = get_sub_field('stat');
    $statDescription         = get_sub_field('stat_description');
?>
<section class="credentials-block__wrapper padding--<?php echo ($verticalPadding); ?>">
  <div class="credentials-block">
    <?php if ($heading): ?>
      <h2 class="credentials-block__heading"><?php echo ($heading); ?></h2>
    <?php endif; ?>

    <?php if ($stat): ?>
      <div class="credentials-block__stats">
        <div class="credentials-block__stat"><?php echo ($stat) ?></div>
        <div class="credentials-block__stat-description"><?php echo ($statDescription) ?></div>
      </div>  
    <?php endif; ?>

    <?php if (have_rows('credentials')): ?>
      <div class="credentials-block__credentials">
        <?php while (have_rows('credentials')): the_row();
          $image      = get_sub_field('image');
          $description = get_sub_field('description');
        ?>
          <div class="credentials-block__credential">
            <div class="credentials-block__image"><img src="<?php echo ($image['url']); ?>"></div>
            <div class="credentials-block__description"><?php echo ($description); ?></div>
          </div>
        <?php endwhile; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php
  endwhile;
endif;
