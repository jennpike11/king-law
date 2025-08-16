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
      $('#custom-star-cursor').css({ left: e.clientX, top: e.clientY });

      const sparkle = $('<div class="sparkle"></div>').css({
        left: e.clientX + 'px',
        top: e.clientY + 'px',  
      });

      $('#trail-container').append(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    });

    $('.primary-button').hover(
      function () { $('body').addClass('mouse-trail-hidden'); },
      function () { $('body').removeClass('mouse-trail-hidden'); }
    );

    // ===============================
    // Services block
    // ===============================
    const TOP_OFFSET = 120;
    const MOVE_THRESHOLD = 6;
    const IGNORE_MS = 260;

    const baseline = new WeakMap();
    const waiting = new WeakMap();
    let ignoreUntil = 0;

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    function armDot($desc) {
      const el = $desc[0];
      el.classList.remove('progress-active', 'progress-dot-top');
      el.style.setProperty('--scroll-progress', '0%');
      baseline.delete(el);
      waiting.delete(el);
      el.classList.add('progress-active', 'progress-dot-top');
    }

    function updateProgress($root) {
      const now = performance.now();

      $root.find('.services-block__description.progress-active').each(function () {
        const el = this;
        const base = baseline.get(el);
        if (base == null) return;

        if (now < ignoreUntil) {
          el.style.setProperty('--scroll-progress', '0%');
          el.classList.add('progress-dot-top');
          return;
        }

        const dist = window.scrollY - base;
        const rect = el.getBoundingClientRect();
        const h = rect.height || el.offsetHeight || 1;

        if (waiting.get(el)) {
          if (dist >= MOVE_THRESHOLD) {
            waiting.set(el, false);
            el.classList.remove('progress-dot-top');
          } else {
            el.style.setProperty('--scroll-progress', '0%');
            return;
          }
        }

        const pct = Math.round(clamp(dist / h, 0, 1) * 100);
        el.style.setProperty('--scroll-progress', pct + '%');
      });
    }

    $(window).on('scroll resize', function () {
      $('.services-block').each(function () { updateProgress($(this)); });
    });

    // ensure first image shows on load per block
    $('.services-block').each(function () {
      const $images = $(this).find('.services-block__images .services-block__image');
      $images.removeClass('is-active').eq(0).addClass('is-active');
    });

    // Main click: on heading only
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
        $desc.stop(true, true).slideUp(150, () => {
          $desc[0].classList.remove('progress-active', 'progress-dot-top');
          $desc[0].style.setProperty('--scroll-progress', '0%');
          baseline.delete($desc[0]);
          waiting.delete($desc[0]);
        });
        $images.removeClass('is-active').eq(0).addClass('is-active');
        return;
      }

      $allHeadings.not($heading).removeClass('active');
      $allDescs.not($desc).stop(true, true).slideUp(0);
      $root.find('.services-block__description').each(function () {
        this.classList.remove('progress-active', 'progress-dot-top');
        this.style.setProperty('--scroll-progress', '0%');
        baseline.delete(this);
        waiting.delete(this);
      });

      const idx = $allHeadings.index($heading);
      if (idx >= 0 && $images.length) {
        const safeIdx = Math.min(idx, $images.length - 1);
        $images.removeClass('is-active').eq(safeIdx).addClass('is-active');
      }

      $heading.addClass('active');
      $desc.stop(true, true).slideDown(150, () => {
        armDot($desc);

        const targetY = Math.max(0, $heading.offset().top - TOP_OFFSET);
        ignoreUntil = performance.now() + IGNORE_MS;
        baseline.set($desc[0], targetY);
        waiting.set($desc[0], true);
        updateProgress($root);
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

    $block.addClass('is-hovering');               // enable the CSS rule
    $images.removeClass('is-hover')
           .eq(idx).addClass('is-hover');         // show only the hovered preview
  })
  .on('mouseleave', '.services-block', function () {
    const $block  = $(this);
    const $images = $block.find('.services-block__images .services-block__image');

    $block.removeClass('is-hovering');            // restore original state
    $images.removeClass('is-hover');              // active one reappears
  });


    // Deep link to services headings by ID
    function findSvcHeadingById(id) {
      if (!id) return $();
      return $('.services-block__heading').filter(function () { return this.id === id; });
    }

    $(document).on('click', 'a[href^="#"]', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const id = decodeURIComponent(href.slice(1));
      const $target = findSvcHeadingById(id);
      if ($target.length) {
        e.preventDefault();
        if (location.hash !== '#' + id && history.replaceState) {
          history.replaceState(null, '', '#' + id);
        }
        $target.trigger('click');
      }
    });

    (function bootstrapHash() {
      const id = decodeURIComponent(location.hash.slice(1));
      const $target = findSvcHeadingById(id);
      if ($target.length) setTimeout(() => $target.trigger('click'), 0);
      $(window).on('hashchange', function () {
        const hid = decodeURIComponent(location.hash.slice(1));
        const $h = findSvcHeadingById(hid);
        if ($h.length) $h.trigger('click');
      });
    })();



    // Slick Slider
    if ($('.slider-block').length && typeof $.fn.slick === 'function') {
      $('.slider-block').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true } },
          { breakpoint: 450,  settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true } },
        ],
      });
    }

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


// Stats Block Animation
// Count-up that replays every time the stat scrolls back into view
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
    const nodes = document.querySelectorAll('.stats-block__number');
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


// Moving Background Gradient
(function ($) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.motion-bg').forEach(el => {
    let mx = 0, my = 0;   // target
    let sx = 0, sy = 0;   // smoothed
    let ang = 25;
    let t = 0;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const strength = parseFloat(getComputedStyle(el).getPropertyValue('--motion-strength')) || 1;
      // map mouse to ±8% shift scaled by strength
      mx = ((e.clientX - cx) / (r.width / 2)) * (8 * strength);
      my = ((e.clientY - cy) / (r.height / 2)) * (8 * strength);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', () => { mx = 0; my = 0; });

    (function tick(){
      t += 0.012;
      // smooth toward target + subtle idle “breathing”
      sx += ((mx + Math.sin(t) * 1.4) - sx) * 0.06;
      sy += ((my + Math.cos(t) * 1.1) - sy) * 0.06;
      ang += Math.sin(t * 0.5) * 0.08;

      el.style.setProperty('--motion-x', sx + '%');
      el.style.setProperty('--motion-y', sy + '%');
      el.style.setProperty('--motion-ang', ang + 'deg');

      requestAnimationFrame(tick);
    })();
  });
})(jQuery);



  });
})(jQuery);
