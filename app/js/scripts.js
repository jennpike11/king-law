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

    $('.primary-button, .primary-button').hover(
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



// Start services block
// ===============================
(function ($) {
  const TOP_OFFSET = 120;      // 1) scroll target = 120px from top
  const MOVE_THRESHOLD = 6;    // small guard so the line waits until user scrolls
  const IGNORE_MS = 260;       // ignore scroll while we animate to the heading

  // Per-description state
  const baseline = new WeakMap(); // starting window.scrollY after snap
  const waiting  = new WeakMap(); // wait for user scroll before growing line
  let ignoreUntil = 0;

  function clamp(v, min, max){ return v < min ? min : v > max ? max : v; }

  function scrollHeadingToTop($heading, done){
    const y = Math.max(0, $heading.offset().top - TOP_OFFSET);
    $('html, body').stop(true, true).animate({ scrollTop: y }, 350, 'swing', done);
  }

  function hardResetAll($root){
    // close all descriptions and reset progress classes and vars
    $root.find('.services-block__description').each(function(){
      const el = this;
      $(el).stop(true, true).slideUp(0);
      el.classList.remove('progress-active','progress-dot-top');
      el.style.setProperty('--scroll-progress', '0%');
      baseline.delete(el);
      waiting.delete(el);
    });
    $root.find('.services-block__heading').removeClass('active');
  }

  function armDot($desc){
    // show only the 10px starter
    const el = $desc[0];
    el.classList.remove('progress-active','progress-dot-top');
    el.style.setProperty('--scroll-progress', '0%');
    baseline.delete(el);
    waiting.delete(el);

    el.classList.add('progress-active','progress-dot-top');
  }

  function updateProgress($root){
    const now = performance.now();

    $root.find('.services-block__description.progress-active').each(function(){
      const el = this;
      const base = baseline.get(el);
      if (base == null) return;

      // ignore during programmatic scroll
      if (now < ignoreUntil) {
        el.style.setProperty('--scroll-progress', '0%');
        el.classList.add('progress-dot-top');
        return;
      }

      const dist = window.scrollY - base; // +down
      const rect = el.getBoundingClientRect();
      const h = rect.height || el.offsetHeight || 1;

      // wait for a tiny real scroll before growing the line
      if (waiting.get(el)) {
        if (dist >= MOVE_THRESHOLD) {
          waiting.set(el, false);
          el.classList.remove('progress-dot-top');
        } else {
          el.style.setProperty('--scroll-progress', '0%');
          return;
        }
      }

      // set progress as a percentage string so CSS can do calc(10px + var(--scroll-progress))
      const pct = Math.round(clamp(dist / h, 0, 1) * 100);
      el.style.setProperty('--scroll-progress', pct + '%');
    });
  }

  $(window).on('scroll resize', function(){
    $('.services-block').each(function(){ updateProgress($(this)); });
  });

  // ensure first image shows on load per block
  $(function(){
    $('.services-block').each(function(){
      const $images = $(this).find('.services-block__images .services-block__image');
      $images.removeClass('is-active').eq(0).addClass('is-active');
    });
  });

  // Main click: on heading only
  $(document).on('click', '.services-block__heading', function (e) {
  e.preventDefault();

  const $heading = $(this);
  const $root    = $heading.closest('.services-block');

  const $allHeadings = $root.find('.services-block__heading');
  const $allDescs    = $root.find('.services-block__description');
  const $images      = $root.find('.services-block__images .services-block__image');

  // 1) reset everything from previous click
  $allHeadings.not($heading).removeClass('active');
  $allDescs.not($heading.next('.services-block__description')).stop(true, true).slideUp(0);
  $root.find('.services-block__description').each(function(){
    this.classList.remove('progress-active','progress-dot-top');
    this.style.setProperty('--scroll-progress', '0%');
    baseline.delete(this);
    waiting.delete(this);
  });

  // 5) image crossfade
  const idx = $allHeadings.index($heading);
  if (idx >= 0 && $images.length) {
    const safeIdx = Math.min(idx, $images.length - 1);
    $images.removeClass('is-active').eq(safeIdx).addClass('is-active');
  }

  // 3) open chosen
  const $desc = $heading.next('.services-block__description');
  $heading.addClass('active');

  $desc.stop(true, true).slideDown(150, () => {
    // 4) show 10px starter
    armDot($desc);

    // 2) compute target and set baseline BEFORE the snap
    const targetY = Math.max(0, $heading.offset().top - TOP_OFFSET);
    ignoreUntil = performance.now() + IGNORE_MS;
    baseline.set($desc[0], targetY);   // <-- key change
    waiting.set($desc[0], true);
    updateProgress($root);              // paint starter immediately

    // snap to position
    $('html, body').stop(true, true).animate({ scrollTop: targetY }, 350, 'swing');
  });
});


  // Optional: hover preview image without changing active
  $(document).on('mouseenter', '.services-block__heading', function () {
    const $block    = $(this).closest('.services-block');
    const $headings = $block.find('.services-block__heading');
    const $images   = $block.find('.services-block__image');
    const idx = $headings.index(this);
    if (idx < 0) return;
    $images.removeClass('is-hover');
    $images.eq(idx).addClass('is-hover');
  }).on('mouseleave', '.services-block__heading', function () {
    const $block  = $(this).closest('.services-block');
    const $images = $block.find('.services-block__image');
    $images.removeClass('is-hover');
  });

})(jQuery);
// ===============================
// end services block 


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

 
 // Vertical Sliding Animation
  var scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };
  var elementsToShow = document.querySelectorAll('.vertical-slide-yes');

  function loop() {
    Array.prototype.forEach.call(elementsToShow, function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });
    scroll(loop);
  }

  // Call the loop for the first time
  loop();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) el = el[0];
  var rect = el.getBoundingClientRect();
  var vh = window.innerHeight || document.documentElement.clientHeight;
  var revealPoint = vh * 0.1; // reveal when 20% into the viewport
  return (
    rect.top <= vh - revealPoint && 
    rect.bottom >= revealPoint
  );
}



  // Home Page Hero Parallax
  $(window).on('scroll', function () {
  let scrolled = $(window).scrollTop();
  $('.home-page-hero__layer.background').css('transform', 'translateY(' + scrolled * 0.3 + 'px)');
  $('.home-page-hero__layer.middle').css('transform', 'translateY(' + scrolled * 0.5 + 'px)');
  $('.home-page-hero__layer.foreground').css('transform', 'translateY(' + scrolled * 0.7 + 'px)');
}); 


jQuery(function ($) {
  function animateStat($el) {
    let finalText = $el.text().trim();
    let finalValue = parseInt(finalText.replace(/[^0-9]/g, ''), 10);
    let prefix = finalText.replace(/[0-9].*$/, ''); 
    let suffix = finalText.replace(/^[^0-9]*/, '').replace(/[0-9]/g, ''); 
    let current = 0;
    let increment = Math.ceil(finalValue / 20); 

    let interval = setInterval(function () {
      current += increment;
      if (current >= finalValue) {
        $el.text(prefix + finalValue + suffix);
        clearInterval(interval);
      } else {
        $el.text(prefix + current + suffix);
      }
    }, 50);
  }

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).find('.stats-block__number').each(function () {
          animateStat($(this));
        });
      }
    });
  }, { threshold: 0.2 });

  $('.stats-block__stats').each(function () {
    observer.observe(this);
  });
});



// Parallax for media-block background
$(window).on('scroll', function () {
    $('.media-block__media-background').each(function () {
        var $el = $(this);
        var scrollTop = $(window).scrollTop();
        var offsetTop = $el.offset().top;
        var height = $el.outerHeight();

        // Only process when element is in viewport
        if (scrollTop + $(window).height() > offsetTop && scrollTop < offsetTop + height) {
            var yPos = (scrollTop - offsetTop) * 0.8; // Adjust multiplier for speed
            $el.css('transform', 'translateY(' + yPos + 'px)');
        }
    });
});




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
