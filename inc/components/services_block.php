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
          'cta'        => get_sub_field('cta'),
          'anchor'       => get_sub_field('anchor'),
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
  <div class="services-block">
    <?php if (!empty($blockHeading)): ?>
      <div class="services-block__block-heading">
        <?php echo esc_html($blockHeading); ?>
      </div>
    <?php endif; ?>

    <div class="services-block__items">
  
      <div class="services-block__services">
        <?php foreach ($services as $i => $svc): 
          // build a safe, unique id
          $raw_anchor = isset($svc['anchor']) ? trim($svc['anchor']) : '';
          $base_id    = $raw_anchor !== '' ? $raw_anchor : ($svc['heading'] ?? '');
          $id         = sanitize_title($base_id);
          if ($id === '') { $id = 'svc-' . ($i + 1); } // fallback
        ?>
          <div class="services-block__content">
            <?php if (!empty($svc['heading'])): ?>
              <h2 id="<?php echo esc_attr($id); ?>" class="services-block__heading">
                <?php echo esc_html($svc['heading']); ?>
              </h2>
            <?php endif; ?>

            <?php
              if (!empty($svc['description'])) { ?>
              <div class="services-block__description">
                <?php echo wp_kses_post($svc['description']); ?>
                <?php if (!empty($svc['cta']['url'])): ?>
              <div class="primary-button">
                <a href="<?php echo esc_url($svc['cta']['url']); ?>">
                  <?php echo esc_html($svc['cta']['title'] ?? ''); ?>
                </a>
              </div>
            <?php endif; ?>
              </div>
            <?php } ?>

          </div>
        <?php endforeach; ?>
      </div>

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
  </div>
</section>
<?php
  endwhile;
endif;
