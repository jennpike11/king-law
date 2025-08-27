<?php 
// Featured Posts Block
if (have_rows('featured_posts_block')):
  while (have_rows('featured_posts_block')): the_row();
    $verticalPadding = get_sub_field('vertical_padding');
    $heading         = get_sub_field('heading');
    $posts           = get_sub_field('posts'); 
    $cta             = get_sub_field('cta');
?>
<section class="featured-posts-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">

  <div class="featured-posts-block">
    <h2 class="featured-posts-block__heading color--black"><?php echo esc_html($heading); ?></h2>
  </div>

  <div class="featured-posts-block__blocks">
    <?php
$selected = get_sub_field('posts');

if (!empty($selected)) {
  // Normalize to an array of post IDs
  $ids = array_map(function ($p) {
    return is_object($p) ? (int) $p->ID : (int) $p;
  }, (array) $selected);

  $the_query = new WP_Query(array(
    'post_type'      => 'post',
    'post__in'       => $ids,
    'orderby'        => 'post__in',   // preserves ACF selection order
    'posts_per_page' => -1,
  ));

  if ($the_query->have_posts()):
    while ($the_query->have_posts()): $the_query->the_post(); ?>
      <a class="featured-posts-block__block" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr(get_the_title()); ?>">
        <div class="featured-posts-block__image"><?php the_post_thumbnail(); ?></div>
        <div class="featured-posts-block__content">
          <h2 class="featured-posts-block__title"><?php the_title(); ?></h2>
          <div class="featured-posts-block__link">Read more</div>
        </div>
      </a>
    <?php endwhile;
    wp_reset_postdata();
  endif;
}
?>

  </div>

  <?php if (!empty($cta['url']) && !empty($cta['title'])): ?>
    <div class="primary-button">
      <a href="<?php echo esc_url($cta['url']); ?>"><?php echo esc_html($cta['title']); ?></a>
    </div>
  <?php endif; ?>

</section>
<?php 
  endwhile;
endif;
