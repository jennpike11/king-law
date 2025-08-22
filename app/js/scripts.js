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

// Config: how many paragraphs to show up-front 
const BASE_PARAS_MOBILE  = 2;
const BASE_PARAS_DESKTOP = 3;
const DESKTOP_BP = 768;

// Track observers so we can disconnect on close
const descObservers = new WeakMap();

function visibleBaseCount() {
  return window.innerWidth >= DESKTOP_BP ? BASE_PARAS_DESKTOP : BASE_PARAS_MOBILE;
}

function teardownReveal($desc) {
  const el = $desc[0];
  const obs = descObservers.get(el);
  if (obs) {
    obs.disconnect();
    descObservers.delete(el);
  }
  // Remove reveal classes so the block is "clean" if reopened
  $desc.find('p').removeClass('is-hidden is-visible');
}

function setupReveal($desc) {
  const el = $desc[0];
  teardownReveal($desc);

  const $paras = $desc.find('p');
  if (!$paras.length) return;

  const base = visibleBaseCount();

  // Set initial state: first N visible, rest hidden
  $paras.each(function (i) {
    if (i < base) {
      $(this).addClass('is-visible').removeClass('is-hidden');
    } else {
      $(this).addClass('is-hidden').removeClass('is-visible');
    }
  });

  // Observe hidden paragraphs and reveal them as they enter viewport
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const p = entry.target;
        p.classList.add('is-visible');
        p.classList.remove('is-hidden');
        io.unobserve(p); // reveal once
      });
    }, {
      threshold: 0.25,         // start the fade when ~25% visible
      rootMargin: '0px 0px -5% 0px'
    });

    $paras.slice(base).each(function () { io.observe(this); });
    descObservers.set(el, io);
  } else {
    // Fallback: if IO unsupported, just show all
    $paras.removeClass('is-hidden').addClass('is-visible');
  }
}

// ensure first image shows on load per block
$('.services-block').each(function () {
  const $images = $(this).find('.services-block__images .services-block__image');
  $images.removeClass('is-active').eq(0).addClass('is-active');
});

// Main click: on heading only (open/close + sync image + smooth scroll)
$(document).on('click', '.services-block__heading', function (e) {
  e.preventDefault();

  const $heading = $(this);
  const $root = $heading.closest('.services-content');

  const $allHeadings = $root.find('.services-block__heading');
  const $allDescs = $root.find('.services-block__description');
  const $images = $root.find('.services-block__images .services-block__image');

  const $desc = $heading.next('.services-block__description');
  const isOpen = $heading.hasClass('active');

  if (isOpen) {
    $heading.removeClass('active');
    // tear down reveal and close
    teardownReveal($desc);
    $desc.stop(true, true).slideUp(150);
    $images.removeClass('is-active').eq(0).addClass('is-active');
    return;
  }

  // close others
  $allHeadings.not($heading).removeClass('active');
  $allDescs.not($desc).each(function () {
    teardownReveal($(this));
  }).stop(true, true).slideUp(0);

  // image index maps to heading index
  const idx = $allHeadings.index($heading);
  if (idx >= 0 && $images.length) {
    const safeIdx = Math.min(idx, $images.length - 1);
    $images.removeClass('is-active').eq(safeIdx).addClass('is-active');
  }

  // open this one
  $heading.addClass('active');
  $desc.stop(true, true).slideDown(150, () => {
    // initialize progressive reveal inside this description
    setupReveal($desc);

    // smooth scroll to place the opened heading nicely under the top bar
    const TOP_OFFSET = 120;
    const targetY = Math.max(0, $heading.offset().top - TOP_OFFSET);
    $('html, body').stop(true, true).animate({ scrollTop: targetY }, 350, 'swing');
  });
});

// swap images on hover
$(document)
  .on('mouseenter', '.services-block__heading', function () {
    const $block    = $(this).closest('.services-block');
    const $headings = $block.find('.services-block__heading');
    const $images   = $block.find('.services-block__images .services-block__image');
    const idx = $headings.index(this);
    if (idx < 0) return;

    $block.addClass('is-hovering');
    $images.removeClass('is-hover')
           .eq(idx).addClass('is-hover');
  })
  .on('mouseleave', '.services-block', function () {
    const $block  = $(this);
    const $images = $block.find('.services-block__images .services-block__image');

    $block.removeClass('is-hovering');
    $images.removeClass('is-hover'); // active one reappears
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


// Awards Block Animation
(function () {
  const DEFAULT_DURATION = 1200;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

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
    // show 0 with the same decimals/prefix/suffix
    const decimals = +el.dataset.decimals || 0;
    el.textContent = `${el.dataset.prefix || ''}${formatNumber(0, decimals)}${el.dataset.suffix || ''}`;
    el.dataset.animating = '0';
  }

  function animate(el) {
    if (el.dataset.animating === '1') return; // don't double-start
    el.dataset.animating = '1';

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
      if (p < 1) requestAnimationFrame(frame);
      else {
        el.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
        el.dataset.animating = '0';
      }
    }
    requestAnimationFrame(frame);
  }

  function init() {
    const nodes = document.querySelectorAll('.awards-block__stat');
    if (!nodes.length) return;

    // Prepare all numbers once
    nodes.forEach(prepare);

    // Replay on every entry; reset on exit
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
        // start a hair before fully above-the-fold:
        rootMargin: '0px 0px -10% 0px'
      });

      nodes.forEach(n => {
        // start from 0 until first entry
        reset(n);
        io.observe(n);
      });
    } else {
      // Fallback: just animate once if IO not supported
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


// Reviews Block Slider, use a different selector
const $reviews = $('.reviews-block__items'); // update to your real reviews selector
if ($reviews.length && !$reviews.hasClass('slick-initialized')) {
  $reviews.slick({
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: 'linear'
  });
}



  });
})(jQuery);
