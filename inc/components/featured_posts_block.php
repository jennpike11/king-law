<?php 
// Featured Posts Block
if (have_rows('featured_posts_block')):
  while (have_rows('featured_posts_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding'); 
    $heading         = get_sub_field('heading');
    $posts           = get_sub_field('posts');  // category ID(s) or CSV
    $cta             = get_sub_field('cta');
?>
<section class="featured-posts-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">

  <div class="featured-posts-block">
    <?php if ($heading): ?>
      <h2 class="featured-posts-block__heading"><?php echo esc_html($heading); ?></h2>
    <?php endif; ?>

    <div class="featured-posts-block__blocks">
      <?php 
      $args = array(
        'post_type'      => 'post',
        'orderby'        => 'post_date',
        'order'          => 'DESC',
        'cat'            => $posts,
        'posts_per_page' => 4,
      );
      $the_query = new WP_Query($args);
      if ($the_query->have_posts()):
        while ($the_query->have_posts()): $the_query->the_post(); ?>
          <a class="featured-posts-block__block vertical-slide-yes" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr(get_the_title()); ?>">
            <div class="featured-posts-block__image">
              <?php the_post_thumbnail('large', array('loading' => 'lazy', 'decoding' => 'async')); ?>
              <span class="featured-posts-block__overlay" aria-hidden="true"></span>
            </div>
            <div class="featured-posts-block__content">
              <h3 class="featured-posts-block__title"><?php the_title(); ?></h3>
              <?php $ex = trim( wp_strip_all_tags( get_the_excerpt(), true ) );
              if ( $ex !== '' ) : ?>
                <div class="featured-posts-block__excerpt">
                  <?php echo wp_kses_post( get_the_excerpt() ); ?>
                </div>
              <?php endif; ?>

            </div>
          </a>
        <?php endwhile; 
        wp_reset_postdata();
      endif; ?>
    </div>

    <?php if (!empty($cta['url']) && !empty($cta['title'])): ?>
      <div class="primary-button">
        <a href="<?php echo esc_url($cta['url']); ?>"><?php echo esc_html($cta['title']); ?></a>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php 
  endwhile;
endif;
