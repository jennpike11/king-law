<?php
/**
 * Template part for displaying results in search pages */ ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<?php
		if ( is_singular() ) :
			the_title( '<h2 class="entry-title">', '</h2>' );
		else :
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif; ?>

</article><!-- #post-<?php the_ID(); ?> -->
	