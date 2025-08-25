<?php  // FAQ Block
  if( have_rows('faq_block') ): 
  while( have_rows('faq_block') ): the_row(); 
  $heading = get_sub_field('heading');
  $verticalPadding = get_sub_field('vertical_padding'); 
  ?>

  <section class="faq-block__wrapper padding--<?php echo esc_attr($verticalPadding); ?>">
  	<div class="faq-block">
  		<h2 class="faq-block__heading"><?php echo esc_html($heading); ?></h2>
  		<?php  while( have_rows('questions_and_answers') ): the_row(); 
      $question = get_sub_field('question');
      $answer = get_sub_field('answer');
      ?>
  		<div class="faq-block__item">
  			<h3 class="faq-block__title"><?php echo esc_html($question); ?><span class="arrow"></span></h3>
  			<div class="faq-block__details"><?php echo wp_kses_post($answer); ?></div>
  		</div>
      <?php endwhile; ?>
  	</div>
	</section>	

  <?php endwhile; ?>
  <?php endif; ?>
