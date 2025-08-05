/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/scss/main.scss":
/*!****************************!*\
  !*** ./app/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./app/js/scripts.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./app/scss/main.scss");

(function ($) {
  $(function () {
    // Sticky menu
    $(window).on('scroll', function () {
      if ($(window).scrollTop() >= 10) {
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

    // Slick Slider (check first)
    if ($('.slider-block').length && typeof $.fn.slick === 'function') {
      $('.slider-block').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        }, {
          breakpoint: 450,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }]
      });
    }

    // Sticky CTA Block
    const $inner = $('.sticky-cta-block__inner');
    const $wrapper = $('.sticky-cta-block__wrapper');
    const $content = $('.landing-page__content');
    if (window.innerWidth >= 768 &&
    // ← Only run at 768px and up
    $inner.length && $wrapper.length && $content.length) {
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
            borderRadius: '16px'
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
            borderRadius: '16px'
          });
        } else {
          $inner.css({
            position: 'static',
            top: '',
            left: '',
            width: '100%',
            padding: '32px',
            border: '1px solid',
            borderRadius: '16px'
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

    // Parallax scroll
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        $('.slow-scroll').each(function () {
          const offsetTop = $(this).offset().top;
          const distance = scrollTop - offsetTop + windowHeight;
          if (distance > 0) {
            $(this).css('transform', 'translateY(' + scrollTop * -0.2 + 'px)');
          }
        });
        $('.fast-scroll').each(function () {
          const offsetTop = $(this).offset().top;
          const distance = scrollTop - offsetTop + windowHeight;
          if (distance > 0) {
            $(this).css('transform', 'translateY(' + scrollTop * -0.4 + 'px)');
          }
        });
        $('.parallax-block').each(function () {
          const offsetTop = $(this).offset().top;
          const distance = scrollTop - offsetTop + windowHeight;
          if (distance > 0) {
            const bottomAdjust = Math.min(scrollTop * 0.4, 160);
            const topAdjust = Math.min(scrollTop * 0.2, 80);
            $(this).css({
              'margin-bottom': '-' + bottomAdjust + 'px',
              'margin-top': '-' + topAdjust + 'px'
            });
          }
        });
      } else {
        $('.slow-scroll, .fast-scroll').css('transform', 'translateY(0)');
        $('.parallax-block').css('margin-bottom', '');
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
    loop();

    // Shrink to fit headings

    // function splitAndShrinkHeadingByWidth() {
    //   const $heading = $('.landing-page-hero-block--sliding-image__heading');

    //   if (!$heading.length) return;

    //   const originalText = $heading.text().trim();
    //   const words = originalText.split(/\s+/);
    //   const totalWords = words.length;

    //   if (totalWords < 3) return;

    //   // Split into 3 visually balanced lines
    //   const chunkSize = Math.ceil(totalWords / 3);
    //   const lines = [
    //     words.slice(0, chunkSize).join(' '),
    //     words.slice(chunkSize, chunkSize * 2).join(' '),
    //     words.slice(chunkSize * 2).join(' ')
    //   ];

    //   // Clear and rebuild the heading with .line-wrapper divs
    //   $heading.empty();
    //   lines.forEach(line => {
    //     $heading.append(`<div class="line-wrapper" style="font-size: 72px;">${line}</div>`);
    //   });

    //   const $lineWrappers = $heading.find('.line-wrapper');
    //   let widestIndex = 0;
    //   let maxWidth = 0;

    //   $lineWrappers.each(function (i) {
    //     const width = this.offsetWidth;
    //     if (width > maxWidth) {
    //       maxWidth = width;
    //       widestIndex = i;
    //     }
    //   });

    //   // Apply font sizes
    //   $lineWrappers.each(function (i) {
    //     const fontSize = i === widestIndex ? '56px' : '72px';
    //     this.style.setProperty('font-size', fontSize, 'important');
    //   });

    //   console.log(`✅ Shrunk line ${widestIndex + 1} to 56px (visual width: ${maxWidth}px)`);
    // }

    // splitAndShrinkHeadingByWidth();
  });
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map