<?php // sticky cta Block

if ( have_rows('sticky_cta_block') ):
  while ( have_rows('sticky_cta_block') ): the_row();
    $image = get_sub_field('image');
    $heading = get_sub_field('heading');
    $description = get_sub_field('description');
    $phone = get_sub_field('phone_number');
?>

<section class="sticky-cta-block__wrapper">
  <div class="sticky-cta-block">
    <div class="sticky-cta-block__inner">
      <div class="sticky-cta-block__image">
        <?php if ( $image ): ?>
          <img src="<?php echo esc_url( $image['url'] ); ?>" alt="<?php echo esc_attr( $image['alt'] ); ?>">
        <?php endif; ?>
      </div>

      <?php if ( $heading ): ?>
        <h3 class="sticky-cta-block__heading"><?php echo esc_html( $heading ); ?></h3>
      <?php endif; ?>

      <?php if ( $description ): ?>
        <div class="sticky-cta-block__description">
          <?php echo wp_kses_post( $description ); ?>
        </div>
      <?php endif; ?>

      <?php if ( $phone ): ?>
        <div class="sticky-cta-block__phone primary-button">
          <a href="tel:<?php echo esc_attr( $phone ); ?>"><?php echo esc_html( $phone ); ?></a>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php endwhile; ?>
<?php endif; ?>
