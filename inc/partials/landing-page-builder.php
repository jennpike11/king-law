<?php // Landing Page builder loop

if( have_rows('landing_page_builder') ): 
   while( have_rows('landing_page_builder') ): the_row();
   $layout = get_row_layout();
   get_template_part( 'inc/components/' . $layout );
    endwhile; 
endif; 

?>
