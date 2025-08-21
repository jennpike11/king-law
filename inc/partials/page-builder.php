<?php // Page builder loop

if ( have_rows('page_builder') ): 
    while ( have_rows('page_builder') ): the_row();
        $layout = get_row_layout();
        get_template_part( 'inc/components/' . $layout );
    endwhile; 
endif;

// Animated Mouse:
?>

<div id="trail-container"></div>
<div id="custom-star-cursor"></div>


