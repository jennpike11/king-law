<?php
/**
 * prc theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @package prc_theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	define( '_S_VERSION', '1.0.0' );
}

// Theme setup
if ( ! function_exists( 'prc_theme_setup' ) ) :
	function prc_theme_setup() {
		load_theme_textdomain( 'prc-theme', get_template_directory() . '/languages' );

		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		add_theme_support(
			'custom-background',
			apply_filters(
				'prc_theme_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		add_theme_support( 'customize-selective-refresh-widgets' );
	}
endif;
add_action( 'after_setup_theme', 'prc_theme_setup' );

// Enqueue styles and scripts
function prc_enqueue_scripts() {
	// Main CSS
	wp_enqueue_style(
		'prc-style',
		get_template_directory_uri() . '/dist/style.css',
		[],
		filemtime( get_template_directory() . '/dist/style.css' )
	);

	// Slick Carousel CSS
	wp_enqueue_style(
		'slick-carousel-css',
		'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
		[],
		'1.8.1'
	);

	// jQuery (built-in)
	wp_enqueue_script( 'jquery' );

	// Slick Carousel JS
	wp_enqueue_script(
		'slick-carousel',
		'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
		['jquery'],
		'1.8.1',
		true
	);

	// Font Awesome
	wp_enqueue_script(
		'fontawesome-kit',
		'https://kit.fontawesome.com/b10b0e793b.js',
		[],
		null,
		true
	);

	// Custom main JS
	wp_enqueue_script(
		'prc-main-js',
		get_template_directory_uri() . '/dist/scripts.js',
		['jquery'],
		filemtime( get_template_directory() . '/dist/scripts.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'prc_enqueue_scripts' );

// Menu fix
function prc_theme_setup() {
  add_theme_support('menus');

  register_nav_menus([
    'primary-menu' => 'Primary Menu',
    'footer-menu' => 'Footer Menu',
  ]);
}
add_action('after_setup_theme', 'prc_theme_setup');

// Shouldn't need this but will figure out later why it's acting up
add_action('after_setup_theme', function () {
  add_theme_support('post-thumbnails'); 
});


add_filter('use_block_editor_for_post_type', function($use_block_editor, $post_type) {
    if ($post_type === 'page') {
        return false; // Disable Gutenberg for Pages
    }
    return $use_block_editor;
}, 10, 2);
