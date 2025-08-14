/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./app/js/scripts.js ***!
  \***************************/
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
      const $root = $heading.closest('.services-block');

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
        const $block = $(this).closest('.services-block');
        const $headings = $block.find('.services-block__heading');
        const $images = $block.find('.services-block__images .services-block__image');
        const idx = $headings.index(this);
        if (idx < 0) return;
        $images.removeClass('is-hover');
        $images.eq(idx).addClass('is-hover');
      })
      .on('mouseleave', '.services-block__heading', function () {
        const $block = $(this).closest('.services-block');
        const $images = $block.find('.services-block__images .services-block__image');
        $images.removeClass('is-hover');
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

    // Home Page Heading Text Animation
    (function () {
      const SEL = '.home-page-hero__heading';
      const MAX_LINES = 3;

      function splitHeading($el, targetWidth) {
        if (!$el.length) return;
        const original = $el.data('orig') || $el.text().trim().replace(/\s+/g, ' ');
        $el.data('orig', original);

        const width = Math.round(targetWidth || $el.innerWidth() || 888);

        const cs = getComputedStyle($el[0]);
        const $m = $('<span/>').css({
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          fontStyle: cs.fontStyle,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
        }).appendTo(document.body);

        const w = (txt) => { $m.text(txt); return $m[0].getBoundingClientRect().width; };

        const words = original.split(' ');
        const lines = [];
        let i = 0;

        for (let line = 0; line < MAX_LINES - 1; line++) {
          let cur = '';
          while (i < words.length) {
            const candidate = cur ? cur + ' ' + words[i] : words[i];
            if (w(candidate) <= width) { cur = candidate; i++; } else { break; }
          }
          if (!cur && i < words.length) { cur = words[i++]; }
          lines.push(cur);
        }

        let rest = words.slice(i).join(' ');
        while (rest && w(rest) > width && lines.length) {
          const prev = lines[lines.length - 1].trim().split(' ');
          if (prev.length > 1) {
            const moved = prev.pop();
            lines[lines.length - 1] = prev.join(' ');
            rest = moved + ' ' + rest;
          } else { break; }
        }
        lines.push(rest);

        $m.remove();
        $el.empty();
        for (let li = 0; li < MAX_LINES; li++) {
          $('<span/>', { class: 'line l' + (li + 1) }).text(lines[li] || '').appendTo($el);
        }
      }

      function run() {
        const $el = $(SEL);
        splitHeading($el, 888);
      }

      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(run); } else { run(); }
      let to;
      $(window).on('resize', function () { clearTimeout(to); to = setTimeout(run, 120); });
    })();

    // Background Animation
    (function () {
      const $bg = $('.motion-gradient');
      if (!$bg.length) return;

      let mx = 0, my = 0;
      let sx = 0, sy = 0;
      let ang = 35;
      let t = 0;

      $(window).on('mousemove', function (e) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mx = (e.clientX - cx) / cx;
        my = (e.clientY - cy) / cy;
      });

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
    })();

  });
})(jQuery);

/******/ })()
;
//# sourceMappingURL=scripts.js.map