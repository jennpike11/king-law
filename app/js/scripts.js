require('../scss/main.scss');

(function ($) {
  $(function () {
    // Sticky menu
    $(window).on('scroll', function () {
      if ($(window).scrollTop() >= 100) {
        $('.site-header__wrapper').addClass('sticky');
        $('nav div').addClass('visible-title');
      } else {
        $('.site-header__wrapper').removeClass('sticky');
      }
    });

    // Stop scroll when menu is open 
    $('.menu-toggle').on('click', function () {
      $('html').toggleClass('active');
    });


    // Animated Mouse
    $(document).on('mousemove', function (e) {
      $('#custom-star-cursor').css({
        left: e.clientX,
        top: e.clientY
      });

      const sparkle = $('<div class="sparkle"></div>');
      sparkle.css({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      });

      $('#trail-container').append(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    });

    $('.primary-button, .secondary-button').hover(
      function () { $('body').addClass('mouse-trail-hidden'); },
      function () { $('body').removeClass('mouse-trail-hidden'); }
    );

    // FAQ Accordion
    $('.faq-block__item').on('click', function () {
      if ($(this).hasClass('active')) {
        $('.faq-block__details').slideUp();
        $('.faq-block__item').removeClass('active');
      } else {
        $('.faq-block__item').removeClass('active');
        $(this).addClass('active');
        $('.faq-block__details').slideUp();
        $(this).find('.faq-block__details').slideDown();
      }
    });

    // Slick Slider 
    if ($('.slider-block').length && typeof $.fn.slick === 'function') {
      $('.slider-block').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true },
          },
          {
            breakpoint: 450,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
          },
        ],
      });
    }

    // Sticky CTA Block
    const $inner = $('.sticky-cta-block__inner');
    const $wrapper = $('.sticky-cta-block__wrapper');
    const $content = $('.landing-page__content');

    if (
      window.innerWidth >= 768 &&
      $inner.length &&
      $wrapper.length &&
      $content.length
    ) {
      $('.landing-page__content__wrapper').addClass('sticky-block-added');

      const fixedTop = 64;
      const fixedWidth = 480;

      function updateStickyCTA() {
        const scrollTop = $(window).scrollTop();
        const wrapperTop = $wrapper.offset().top;
        const wrapperLeft = $wrapper.offset().left;
        const stickyHeight = $inner.outerHeight();
        const contentBottom = $content.offset().top + $content.outerHeight();

        if (scrollTop >= wrapperTop && scrollTop + stickyHeight < contentBottom) {
          $inner.css({
            position: 'fixed',
            top: fixedTop + 'px',
            left: wrapperLeft + 'px',
            width: fixedWidth + 'px',
            padding: '32px',
            border: '1px solid',
            borderRadius: '16px',
          });
        } else if (scrollTop + stickyHeight >= contentBottom) {
          const absoluteTop = contentBottom - wrapperTop - stickyHeight;
          $inner.css({
            position: 'absolute',
            top: absoluteTop + 'px',
            left: '0',
            width: '100%',
            padding: '32px',
            border: '1px solid',
            borderRadius: '16px',
          });
        } else {
          $inner.css({
            position: 'static',
            top: '',
            left: '',
            width: '100%',
            padding: '32px',
            border: '1px solid',
            borderRadius: '16px',
          });
        }
      }

      $(window).on('scroll resize', updateStickyCTA);
      updateStickyCTA();
    }

    // Car animation
    let carHasDrivenOff = false;
    $(window).on('load', function () {
      $('.sliding-image').addClass('slide-in');
    });
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();

      if (scrollTop > 20 && !carHasDrivenOff) {
        $('.sliding-image').removeClass('slide-in').addClass('slide-out');
        carHasDrivenOff = true;
      }

      if (scrollTop <= 10 && carHasDrivenOff) {
        $('.sliding-image').removeClass('slide-out').addClass('slide-in');
        carHasDrivenOff = false;
      }
    });

    // Vertical sliding animation
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    function loop() {
      $('.vertical-slide-yes').each(function (i, el) {
        const $el = $(el);
        if (isElementInViewport(el)) {
          setTimeout(() => $el.addClass('is-visible'), i * 150);
        } else {
          $el.removeClass('is-visible');
        }
      });
      requestAnimationFrame(loop);
    }


  });
})(jQuery);

// Background Animation
(function ($) {
  function init() {
    const $bg = $('.motion-gradient');
    if (!$bg.length) { requestAnimationFrame(init); return; }

    let mx = 0, my = 0;
    let sx = 0, sy = 0;
    let ang = 35;

    $(window).on('mousemove', function (e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx = (e.clientX - cx) / cx;
      my = (e.clientY - cy) / cy;
    });

    let t = 0;
    function tick() {
      t += 0.01;
      sx += ((mx * 15 + Math.sin(t) * 4) - sx) * 0.06;
      sy += ((my * 12 + Math.cos(t * 0.8) * 4) - sy) * 0.06;
      ang += Math.sin(t * 0.6) * 0.12;

      const el = $bg[0].style;
      el.setProperty('--shiftX', sx + '%');
      el.setProperty('--shiftY', sy + '%');
      el.setProperty('--ang', ang + 'deg');

      requestAnimationFrame(tick);
    }
    tick();
  }
  init();
})(jQuery);
