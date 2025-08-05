<?php
// Three Column block
if (have_rows('three_column_block')) :
  while (have_rows('three_column_block')) : the_row();
    $verticalPadding   = get_sub_field('vertical_padding');
    $backgroundColor   = get_sub_field('background_color');
    $textColor         = get_sub_field('text_color');
    $heading           = get_sub_field('heading');
    $description       = get_sub_field('description');
    $blockOption       = get_sub_field('block_option');
    $itemDesign        = get_sub_field('item_design');
?>

<section class="three-column-block__wrapper padding--<?php echo ($verticalPadding) ?> <?php echo ($backgroundColor) ?>">
  <div class="three-column-block">
    
    <?php if ($heading) : ?>
      <h2 class="three-column-block__heading color--<?php echo ($textColor); ?>">
        <?php echo esc_html($heading); ?>
      </h2>
    <?php endif; ?>

    <?php if ($description) : ?>
      <div class="three-column-block__description color--<?php echo ($textColor) ?>">
        <?php echo wp_kses_post($description); ?>
      </div>
    <?php endif; ?>

    <?php if (have_rows('items')) : ?>
      <div class="three-column-block__items">
        <?php while (have_rows('items')) : the_row();
          $itemHeading         = get_sub_field('item_heading');
          $itemDescription     = get_sub_field('item_description');
          $itemIcon            = get_sub_field('item_icon');
        ?>
          <div class="three-column-block__item">
            <?php if ($itemIcon) : ?>
              <div class="three-column-block__item-icon icon-<?php echo ($itemIcon); ?>"></div>
            <?php endif; ?>

            <?php if ($itemHeading) : ?>
              <h3 class="three-column-block__item-heading color--<?php echo ($textColor) ?>">
                <?php echo esc_html($itemHeading); ?>
              </h3>
            <?php endif; ?>

            <?php if ($itemDescription) : ?>
              <p class="three-column-block__item-description color--<?php echo ($textColor) ?>">
                <?php echo esc_html($itemDescription); ?>
              </p>
            <?php endif; ?>
          </div>
        <?php endwhile; ?>
      </div>
    <?php endif; ?>

  </div>
</section>

<?php
  endwhile;
endif;
?>
