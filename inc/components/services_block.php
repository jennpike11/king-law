<?php
if (have_rows('services_block')):
  while (have_rows('services_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $blockHeading    = get_sub_field('block_heading');

    // Build one array so we can render two columns in the same order
    $services = [];
    if (have_rows('services')) {
      while (have_rows('services')) {
        the_row();
        $services[] = [
          'heading'     => get_sub_field('heading'),
          'description' => get_sub_field('description'),
          'link'        => get_sub_field('link'),
          'image'       => get_sub_field('image'),
        ];
      }
    }

    // Bail gracefully if nothing to show
    if (empty($services)) {
      continue;
    }
?>
<section class="services-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">

  <?php if (!empty($blockHeading)): ?>
    <div class="services-block__block-heading">
      <?php echo esc_html($blockHeading); ?>
    </div>
  <?php endif; ?>

  <div class="services-block">
    <!-- Left: headings + descriptions (accordion) -->
    <div class="services-block__services">
      <?php foreach ($services as $svc): ?>
        <div class="services-block__content">
          <?php if($anchor): ?>
            <div id="<?php echo ($anchor) ?>"></div>
          <?php endif; ?>
          <?php if (!empty($svc['heading'])): ?>
            <h2 class="services-block__heading">
              <?php echo esc_html($svc['heading']); ?>
            </h2>
          <?php endif; ?>

          <div class="services-block__description">
            <?php
              if (!empty($svc['description'])) {
                echo wp_kses_post($svc['description']);
              }
              if (!empty($svc['link']) && !empty($svc['link']['url'])):
            ?>
              <div class="primary-button">
                <a href="<?php echo esc_url($svc['link']['url']); ?>">
                  <?php echo esc_html($svc['link']['title'] ?? ''); ?>
                </a>
              </div>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Right: stacked images (same order as headings) -->
    <div class="services-block__images">
      <?php foreach ($services as $svc): ?>
        <div class="services-block__image">
          <?php if (!empty($svc['image']['url'])): ?>
            <img
              src="<?php echo esc_url($svc['image']['url']); ?>"
              alt="<?php echo esc_attr($svc['image']['alt'] ?? ''); ?>"
              loading="lazy"
              decoding="async"
            />
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php
  endwhile;
endif;
