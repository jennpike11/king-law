<?php
/**
 * Template Name: Old Pages
 * Template Post Type: page
 *
 * @package prc-theme
 */

get_header();
?>

<main id="primary" class="site-main">
  <?php while ( have_posts() ) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

      <section class="hero-block__wrapper">
        <?php
        if ( has_post_thumbnail() ) {
          the_post_thumbnail( 'full', array( 'class' => 'hero-block__image' ) );
        }
        ?>
        <div class="hero-block">
          <div class="hero-block__text">
            <h1 class="hero-block__heading">
              <?php echo wp_kses_post( get_the_title() ); ?>
            </h1>
          </div>
          <div class="hero-block__king">
            <img
              src="<?php echo esc_url( 'https://kinglawstaging.wpenginepowered.com/wp-content/uploads/2025/08/arms_crossed_half_body.png' ); ?>"
              alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
          </div>
        </div>
      </section>

      <div class="entry-content">
        <?php
        the_content(
          sprintf(
            wp_kses(
              /* translators: %s: Post title for screen readers. */
              __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'prc-theme' ),
              array(
                'span' => array(
                  'class' => array(),
                ),
              )
            ),
            get_the_title()
          )
        );

        wp_link_pages(
          array(
            'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'prc-theme' ),
            'after'  => '</div>',
          )
        );
        ?>
      </div><!-- .entry-content -->

    </article><!-- #post-<?php the_ID(); ?> -->
  <?php endwhile; ?>
</main><!-- #primary -->

<?php
get_footer();
