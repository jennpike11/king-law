<?php
/**
 * Category Template
 */
get_header(); ?>

<section id="primary" class="site-content">
  <div id="content" role="main">
    <div class="entry-content">
      <div class="category-header">
        <?php if (function_exists('get_category_thumbnail')) {
          echo get_category_thumbnail(get_queried_object_id());
        } ?>
        <div class="category-header__title-wrapper">
          <h2 class="category-header__title"><?php single_cat_title('', true); ?></h2>
          <div class="category-header__description"><?php echo category_description(); ?></div>
        </div>
      </div>

      <div class="category-content__search-form">
        <?php get_search_form(); ?>
      </div>
    </div>

    <div class="category-content">
      <?php if (have_posts()) {
        // The Loop
        while (have_posts()) : the_post(); ?>
          <div class="category-content__item">
            <?php
            // Use a safe builtin thumbnail call instead of a custom helper
            if (has_post_thumbnail()) {
              the_post_thumbnail('medium_large', [
                'class'    => 'category-content__thumb',
                'loading'  => 'lazy',
                'decoding' => 'async',
                'alt'      => esc_attr(get_the_title()),
              ]);
            }
            ?>
            <a class="category-content__content" href="<?php the_permalink(); ?>">
              <h3 class="category-content__title"><?php the_title(); ?></h3>
              <div class="category-content__date"><?php the_time('F jS, Y'); ?></div>
              <div class="category-content__link">Read more</div>
            </a>
          </div>
        <?php endwhile;
      } else { ?>
        <p>Sorry, no posts matched your criteria.</p>
      <?php } ?>
    </div>

    <a class="load-more load-more--category-posts">Load More</a>
  </div>
</section>

<?php get_footer(); ?>
