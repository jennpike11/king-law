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


// Mobile submenu accordion
$(document).on('click', '#site-navigation .menu li.menu-item-has-children > a', function (e) {
  // match your "large" breakpoint; adjust if your mixin differs
  if (window.matchMedia('(max-width: 1023px)').matches) {
    e.preventDefault();

    var $li = $(this).parent('li');
    var isOpen = $li.hasClass('is-open');

    // close siblings at the same level
    $li
      .siblings('.is-open')
      .removeClass('is-open')
      .find('> a')
      .attr('aria-expanded', 'false');

    // toggle current
    $li.toggleClass('is-open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
  }
});


// Hero Block Animation
(function ($) {
  $(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    $('.hero-block__heading').each(function () {
      const $h = $(this);
      if ($h.data('pulsified')) return;
      $h.data('pulsified', true);

      let i = 0; // global index for stagger delays
      const frag = document.createDocumentFragment();

      function addWord(wordText, strong) {
        const word = document.createElement('span');
        word.className = 'word' + (strong ? ' pulse-strong' : '');
        for (const ch of wordText) {
          const c = document.createElement('span');
          c.className = 'char';
          c.style.setProperty('--i', i++);
          c.textContent = ch;
          word.appendChild(c);
        }
        frag.appendChild(word);
      }

      function processText(text, strong) {
        // Split into words and whitespace, preserve spaces as real spaces
        const parts = text.split(/(\s+)/);
        parts.forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            addWord(part, strong);
          }
        });
      }

      // Rebuild while preserving <br> etc.; <span> means "pulse stronger"
      Array.from(this.childNodes).forEach(node => {
        if (node.nodeType === 3) {
          processText(node.nodeValue, false);
        } else if (node.nodeType === 1 && node.tagName === 'SPAN') {
          Array.from(node.childNodes).forEach(child => {
            if (child.nodeType === 3) processText(child.nodeValue, true);
            else frag.appendChild(child.cloneNode(true));
          });
        } else {
          frag.appendChild(node.cloneNode(true));
        }
      });

      this.replaceChildren(frag);
    });
  });
})(jQuery);


// Hero Block Line Animation
  jQuery(window).on('load', function () {
    $('.hero-block').addClass('ready'); 
  });


// Services Block
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

    // hide the related description until we animate again (class only)
    const desc = findDesc(el);
    if (desc) desc.classList.remove('stat-is-visible');
  }

  function animate(el) {
    if (el.dataset.animating === '1') return; // do not double start
    el.dataset.animating = '1';

    // ensure description is hidden while animating (class only)
    const desc = findDesc(el);
    if (desc) desc.classList.remove('stat-is-visible');

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
        // reveal description now that the stat is finished (fade handled by CSS)
        if (desc) desc.classList.add('stat-is-visible');
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
        rootMargin: '0px 0px -10% 0px'
      });

      nodes.forEach(n => {
        reset(n);       // ensure descriptions start hidden
        io.observe(n);
      });
    } else {
      // Fallback: animate once if IO not supported
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
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });
}


// Heading Block & Reviews Block Heading Animation
(function () {
  document.documentElement.classList.add('js');

  var $win = $(window);
  var $wrappers = $('.heading-block__wrapper, .reviews-block__wrapper');
  if (!$wrappers.length) return;

  // tune these two numbers if you want it even earlier/later
  var ENTER_FRAC = 0.20; 
  var EXIT_FRAC  = 0.98; 

  var ticking = false;
  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  }

  function check() {
    ticking = false;
    var vh = window.innerHeight || $win.height();
    var bandTop = Math.round(vh * ENTER_FRAC);
    var bandBot = Math.round(vh * EXIT_FRAC);

    $wrappers.each(function () {
      var rect   = this.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var onScreen = rect.bottom > 0 && rect.top < vh;

      // If your CSS targets .reviews-block instead of .reviews-block-text, swap selector below
      var $target = $(this).find('.heading-block, .reviews-block-text').first();

      // earlier in and earlier out
      var inBand = onScreen && center >= bandTop && center <= bandBot;
      $target.toggleClass('is-in-view', inBand);
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


// Animated Two Column Block Animation
$(document).on('click', '.animated-list-block__item', function (e) {
  var $it = $(this);
  var $parent = $it.closest('.animated-list-block');

  if (!$it.hasClass('item-clicked')) {
    e.preventDefault();
    $it.addClass('item-clicked')
       .siblings('.animated-list-block__item').removeClass('item-clicked');

    // mark parent as active so SCSS can hide borders
    $parent.addClass('has-clicked');
  } else {
    // if clicked again, unselect and reset parent state
    $it.removeClass('item-clicked');
    $parent.removeClass('has-clicked');
  }
});

// Click anywhere outside block → reset everything
$(document).on('click', function(e) {
  if (!$(e.target).closest('.animated-list-block').length) {
    $('.animated-list-block__item').removeClass('item-clicked');
    $('.animated-list-block').removeClass('has-clicked');
  }
});






  });
})(jQuery);
