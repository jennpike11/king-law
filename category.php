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
        <div class="category-header__title">
          <h2 class="category-header__heading"><?php single_cat_title('', true); ?></h2>
          <div class="category-header__subheading"><?php echo category_description(); ?></div>
        </div>
        <div class="category-content__search-form">
          <?php get_search_form(); ?>
        </div>
      </div>
    </div>

    <div class="category-content">
      <?php if (have_posts()) {
        // The Loop
        while (have_posts()) : the_post(); ?>
          <a class="category-content__item" href="<?php the_permalink(); ?>">
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
            <div class="category-content__content">
              <h3 class="category-content__title"><?php the_title(); ?></h3>
              <div class="category-content__date"><?php the_time('F jS, Y'); ?></div>
              <div class="category-content__link">Read more</div>
            </div>
          </a>
        <?php endwhile;
      } else { ?>
        <p>Sorry, no posts matched your criteria.</p>
      <?php } ?>
    </div>

    <a class="load-more primary-button">Load More</a>
  </div>
</section>

<?php get_footer(); ?>
