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


  // Home Page Hero Animation
    jQuery(window).on('load', function () {
        $('.hero-block').addClass('ready'); 
  });


// Services Block
// Helper: set active image using normal CSS transitions
function setActiveImage($images, idx) {
  $images.removeClass('is-hover'); // clear preview
  $images.removeClass('is-active').eq(idx).addClass('is-active'); // CSS handles cross-fade
}

// Ensure first image shows on load per block
$('.services-block').each(function () {
  const $images = $(this).find('.services-block__image');
  setActiveImage($images, 0);
});

// Reset a block to default state, keep current active image
function closeBlock($block) {
  const $headings = $block.find('.services-block__heading');
  const $descs    = $block.find('.services-block__description');

  // show all headings again and reset width to base
  $headings.show().removeClass('active').css('width', '');

  // close any open description
  $descs.stop(true, true).slideUp(150);

  // clear block states
  $block.removeClass('only-active is-hovering');
}

// Click to open or close, and hide or show other headings
$(document).on('click', '.services-block__heading', function (e) {
  e.preventDefault();

  const $heading     = $(this);
  const $block       = $heading.closest('.services-block');
  const $desc        = $heading.next('.services-block__description');
  const $images      = $block.find('.services-block__image');
  const $allHeadings = $block.find('.services-block__heading');
  const isOpen       = $heading.hasClass('active');

  if (isOpen) {
    // second click, close and restore headings
    closeBlock($block);
    return;
  }

  // first click on this heading, close others
  $allHeadings.removeClass('active').css('width', '');
  $block.find('.services-block__description').not($desc).stop(true, true).slideUp(0);

  // kill hover state before swapping so the new active is not hidden
  $block.removeClass('is-hovering');
  $images.removeClass('is-hover');

  // map image index to heading index and show it smoothly
  const idx = $allHeadings.index($heading);
  if (idx >= 0 && $images.length) setActiveImage($images, Math.min(idx, $images.length - 1));

  // open this one, expand to 100%
  $heading.addClass('active').css('width', '100%');
  $desc.stop(true, true).slideDown(150);

  // hide other headings while open
  $allHeadings.not($heading).hide();
  $block.addClass('only-active');
});

// Click outside the block to restore headings and close description
$(document).on('mousedown', function (e) {
  const $target = $(e.target);
  $('.services-block.only-active').each(function () {
    const $block = $(this);
    if ($block.has($target).length === 0) {
      closeBlock($block);
    }
  });
});

// Hover preview, ignore hover on the active heading
$(document)
  .on('mouseenter', '.services-block__heading', function () {
    const $heading  = $(this);
    const $block    = $heading.closest('.services-block');
    const $headings = $block.find('.services-block__heading');
    const $images   = $block.find('.services-block__image');

    // no preview during only-active mode, or on the active heading itself
    if ($heading.hasClass('active') || $block.hasClass('only-active')) return;

    const idx = $headings.index($heading);
    if (idx < 0) return;

    $block.addClass('is-hovering');
    $images.removeClass('is-hover').eq(idx).addClass('is-hover');
  })
  .on('mouseleave', '.services-block', function () {
    const $block  = $(this);
    const $images = $block.find('.services-block__image');

    $block.removeClass('is-hovering');
    $images.removeClass('is-hover'); // reveal whichever is .is-active
  });


    // Sticky CTA Block
    const $inner = $('.sticky-cta-block__inner');
    const $wrapper = $('.sticky-cta-block__wrapper');
    const $content = $('.landing-page__content');

    if (window.innerWidth >= 768 && $inner.length && $wrapper.length && $content.length) {
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
    const raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 1000 / 60); };
    const elementsToShow = document.querySelectorAll('.vertical-slide-yes');

    function loop() {
      Array.prototype.forEach.call(elementsToShow, function (element) {
        if (isElementInViewport(element)) element.classList.add('is-visible');
        else element.classList.remove('is-visible');
      });
      raf(loop);
    }
    loop();

    function isElementInViewport(el) {
      if (typeof jQuery === 'function' && el instanceof jQuery) el = el[0];
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const revealPoint = vh * 0.1;
      return rect.top <= vh - revealPoint && rect.bottom >= revealPoint;
    }


// Credentials Block Animation
(function () {
  const DEFAULT_DURATION = 1200;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  // Find the related description element for a given stat node
  function findDesc(el) {
    // common patterns: next sibling, within parent, or inside a nearby item wrapper
    const next = el.nextElementSibling;
    if (next && next.classList && next.classList.contains('credentials-block__stat-description')) return next;
    if (el.parentElement) {
      const withinParent = el.parentElement.querySelector('.credentials-block__stat-description');
      if (withinParent) return withinParent;
    }
    const item = el.closest && el.closest('.credentials-block__item');
    if (item) {
      const withinItem = item.querySelector('.credentials-block__stat-description');
      if (withinItem) return withinItem;
    }
    return null;
  }

  function parseStat(text) {
    const s = (text || '').trim();
    const m = s.match(/^([^0-9\-+]*)(-?\d[\d,]*(?:\.\d+)?)([A-Za-z%+]*)/);
    if (!m) return { prefix: '', target: 0, decimals: 0, suffix: '' };
    const prefix   = m[1] || '';
    const numStr   = (m[2] || '').replace(/,/g, '');
    const suffix   = m[3] || '';
    const decimals = (numStr.split('.')[1] || '').length;
    const target   = parseFloat(numStr) || 0;
    return { prefix, target, decimals, suffix };
  }

  function formatNumber(value, decimals) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function prepare(el) {
    if (el.dataset.prepared === '1') return;
    const meta = parseStat(el.textContent);
    el.dataset.prefix   = meta.prefix;
    el.dataset.target   = String(meta.target);
    el.dataset.decimals = String(meta.decimals);
    el.dataset.suffix   = meta.suffix;
    el.dataset.prepared = '1';
  }

  function reset(el) {
    // show 0 with the same decimals, prefix, suffix
    const decimals = +el.dataset.decimals || 0;
    el.textContent = `${el.dataset.prefix || ''}${formatNumber(0, decimals)}${el.dataset.suffix || ''}`;
    el.dataset.animating = '0';

    // hide the related description until we animate again
    const desc = findDesc(el);
    if (desc) desc.hidden = true;
  }

  function animate(el) {
    if (el.dataset.animating === '1') return; // do not double start
    el.dataset.animating = '1';

    // hide the related description while animating
    const desc = findDesc(el);
    if (desc) desc.hidden = true;

    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const target   = +(el.dataset.target || 0);
    const decimals = +(el.dataset.decimals || 0);
    const dur      = +(el.dataset.duration || DEFAULT_DURATION);

    const t0 = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const v = target * easeOutCubic(p);
      el.textContent = `${prefix}${formatNumber(v, decimals)}${suffix}`;
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
        el.dataset.animating = '0';
        // reveal description now that the stat is finished
        if (desc) desc.hidden = false;
      }
    }
    requestAnimationFrame(frame);
  }

  function init() {
    const nodes = document.querySelectorAll('.credentials-block__stat');
    if (!nodes.length) return;

    // Prepare all numbers once
    nodes.forEach(prepare);

    // Replay on every entry, reset on exit
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            animate(el);
          } else {
            reset(el);
          }
        });
      }, {
        threshold: 0.35,
        // start a hair before fully above the fold
        rootMargin: '0px 0px -10% 0px'
      });

      nodes.forEach(n => {
        // start from 0 until first entry and ensure description is hidden
        reset(n);
        io.observe(n);
      });
    } else {
      // Fallback, just animate once if IO not supported
      nodes.forEach(animate);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



// Featured Posts Block Slider
const $fpb = $('.featured-posts-block__blocks');
if ($fpb.length && !$fpb.hasClass('slick-initialized')) {
  $fpb.slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600,  settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });
}


// Reviews Block Slider
const $reviews = $('.reviews-block__slides'); 
if ($reviews.length && !$reviews.hasClass('slick-initialized')) {
  $reviews.slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  });
}


// Heading Block Animation
(function () {
  document.documentElement.classList.add('js');

  var $win = $(window);
  var $wrappers = $('.heading-block__wrapper');
  if (!$wrappers.length) return;

  var ticking = false;
  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  }

  function check() {
    ticking = false;
    var vh = window.innerHeight || $win.height();
    var cutoff = vh - Math.round(vh * 0.20);
    $wrappers.each(function () {
      var rect = this.getBoundingClientRect();
      var inView = (rect.top < cutoff) && (rect.bottom > 0);
      $(this).find('.heading-block').first().toggleClass('is-in-view', inView);
    });
  }

  check();
  $win.on('scroll resize', onScrollOrResize);
})();


// Animated Two Column Block 
$(function () {
  // Mark that JS is active so CSS can start hidden without FOUC
  document.documentElement.classList.add('js');

  var $win = $(window);
  var $wrappers = $('.animated-two-column-block__wrapper');
  if (!$wrappers.length) return;

  var ticking = false;
  function queueCheck() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  }

  function check() {
    ticking = false;

    var vh = window.innerHeight || $win.height();
    var cutoff = vh - Math.round(vh * 0.20); // 80% down the viewport

    $wrappers.each(function () {
      var rect = this.getBoundingClientRect();
      // “In view” within the viewport clipped by bottom 20vh:
      var inView = (rect.top < cutoff) && (rect.bottom > 0);

      // Toggle on the inner block so CSS can do the stagger
      $(this).find('.animated-two-column-block').first()
        .toggleClass('is-in-view', inView);
    });
  }

  // Initial check + listeners
  check();
  $win.on('scroll resize', queueCheck);
});



  });
})(jQuery);
