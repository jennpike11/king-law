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



// Add thumbnail field to category (ADD form)
function add_category_thumbnail_field($taxonomy = null) { // accept arg to match hook
    ?>
    <div class="form-field">
        <label for="category_thumbnail"><?php _e('Category Thumbnail', 'text-domain'); ?></label>
        <input type="text" name="category_thumbnail" id="category_thumbnail" value="" />
        <button class="upload_image_button button"><?php _e('Upload Image', 'text-domain'); ?></button>
    </div>
    <script type="text/javascript">
      // no document-ready wrapper (per your preference)
      (function(){
        document.addEventListener('click', function(e){
          var btn = e.target.closest('.upload_image_button');
          if (!btn) return;
          e.preventDefault();

          if (typeof wp === 'undefined' || !wp.media) return; // guard if media not enqueued
          var frame = wp.media({
            title: '<?php echo esc_js( __( 'Choose Image', 'text-domain' ) ); ?>',
            button: { text: '<?php echo esc_js( __( 'Use Image', 'text-domain' ) ); ?>' },
            multiple: false
          });
          frame.on('select', function(){
            var att = frame.state().get('selection').first().toJSON();
            var input = document.getElementById('category_thumbnail');
            if (input) input.value = att.url;
          });
          frame.open();
        }, {passive:false});
      })();
    </script>
    <?php
}
add_action('category_add_form_fields', 'add_category_thumbnail_field', 10, 1); // accept 1 arg

// Save category thumbnail (CREATE)
function save_category_thumbnail($term_id, $tt_id) { // accept both args
    if (isset($_POST['category_thumbnail'])) {
        update_term_meta($term_id, 'category_thumbnail', sanitize_text_field($_POST['category_thumbnail']));
    }
}
add_action('created_category', 'save_category_thumbnail', 10, 2);

// Edit thumbnail field for existing categories (EDIT form)
function edit_category_thumbnail_field($term /* , $taxonomy not passed here */) {
    $thumbnail = get_term_meta($term->term_id, 'category_thumbnail', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="category_thumbnail"><?php _e('Category Thumbnail', 'text-domain'); ?></label>
        </th>
        <td>
            <input type="text" name="category_thumbnail" id="category_thumbnail" value="<?php echo esc_attr($thumbnail); ?>" />
            <button class="upload_image_button button"><?php _e('Upload Image', 'text-domain'); ?></button>
        </td>
    </tr>
    <script type="text/javascript">
      // no document-ready wrapper (per your preference)
      (function(){
        document.addEventListener('click', function(e){
          var btn = e.target.closest('.upload_image_button');
          if (!btn) return;
          e.preventDefault();

          if (typeof wp === 'undefined' || !wp.media) return;
          var frame = wp.media({
            title: '<?php echo esc_js( __( 'Choose Image', 'text-domain' ) ); ?>',
            button: { text: '<?php echo esc_js( __( 'Use Image', 'text-domain' ) ); ?>' },
            multiple: false
          });
          frame.on('select', function(){
            var att = frame.state().get('selection').first().toJSON();
            var input = document.getElementById('category_thumbnail');
            if (input) input.value = att.url;
          });
          frame.open();
        }, {passive:false});
      })();
    </script>
    <?php
}
add_action('category_edit_form_fields', 'edit_category_thumbnail_field', 10, 1); // only 1 arg

// Save thumbnail for existing categories (UPDATE)
function update_category_thumbnail($term_id, $tt_id) { // accept both args
    if (isset($_POST['category_thumbnail'])) {
        update_term_meta($term_id, 'category_thumbnail', sanitize_text_field($_POST['category_thumbnail']));
    }
}
add_action('edited_category', 'update_category_thumbnail', 10, 2);

// Ensure media modal is available on category screens
add_action('admin_enqueue_scripts', function(){
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if ($screen && $screen->taxonomy === 'category') {
        wp_enqueue_media();
    }
});
