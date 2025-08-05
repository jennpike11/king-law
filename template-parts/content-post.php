<?php
/**
 * Template part for displaying posts and plain pages like legal pages
 *
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="content-post">
		<div class="content-post__image">
			<?php echo get_the_post_thumbnail(); ?>
		</div>	
		<div class="content-post__heading">
			<h1><?php the_title(); ?></h1>
			<div class="content-post__date"><?php echo get_the_date(); ?></div>
		</div>
		<div class="content-post__content">
			<?php the_content(); ?>
		</div>
	</div>

</article>
