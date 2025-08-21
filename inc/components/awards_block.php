<?php
if (have_rows('awards_block')):
  while (have_rows('awards_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $heading         = get_sub_field('heading');
    $stat       = get_sub_field('stat');
    $statComment         = get_sub_field('stat_comment');
?>
<section class="awards-block__wrapper padding--<?php echo ($verticalPadding); ?> background-color--white">
  <div class="awards-block">
    <?php if ($heading): ?>
      <h2 class="awards-block__heading vertical-slide-yes color--black"><?php echo ($heading); ?></h2>
    <?php endif; ?>

    <?php if ($stat): ?>
      <div class="awards-block__stats">
        <div class="awards-block__stat"><?php echo ($stat) ?></div>
        <div class="awards-block__stat-comment"><?php echo ($statComment) ?></div>
      </div>  
    <?php endif; ?>

    <?php if (have_rows('awards')): ?>
      <div class="awards-block__awards">
        <?php while (have_rows('awards')): the_row();
          $image      = get_sub_field('image');
          $description = get_sub_field('description');
        ?>
          <div class="awards-block__award">
            <div class="awards-block__image"><img src="<?php echo ($image['url']); ?>"></div>
            <div class="awards-block__description color--black"><?php echo ($description); ?></div>
          </div>
        <?php endwhile; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php
  endwhile;
endif;
