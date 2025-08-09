/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/scripts.js":
/*!***************************!*\
  !*** ./app/js/scripts.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{__webpack_require__(/*! ../scss/main.scss */ \"./app/scss/main.scss\");\n\n(function ($) {\n  $(function () {\n    // Sticky menu\n    $(window).on('scroll', function () {\n      if ($(window).scrollTop() >= 100) {\n        $('.site-header__wrapper').addClass('sticky');\n        $('nav div').addClass('visible-title');\n      } else {\n        $('.site-header__wrapper').removeClass('sticky');\n      }\n    });\n\n    // Stop scroll when menu is open \n    $('.menu-toggle').on('click', function () {\n      $('html').toggleClass('active');\n    });\n\n\n    // Animated Mouse\n    $(document).on('mousemove', function (e) {\n      $('#custom-star-cursor').css({\n        left: e.clientX,\n        top: e.clientY\n      });\n\n      const sparkle = $('<div class=\"sparkle\"></div>');\n      sparkle.css({\n        left: e.clientX + 'px',\n        top: e.clientY + 'px'\n      });\n\n      $('#trail-container').append(sparkle);\n\n      setTimeout(() => {\n        sparkle.remove();\n      }, 800);\n    });\n\n    $('.primary-button, .secondary-button').hover(\n      function () { $('body').addClass('mouse-trail-hidden'); },\n      function () { $('body').removeClass('mouse-trail-hidden'); }\n    );\n\n    // FAQ Accordion\n    $('.faq-block__item').on('click', function () {\n      if ($(this).hasClass('active')) {\n        $('.faq-block__details').slideUp();\n        $('.faq-block__item').removeClass('active');\n      } else {\n        $('.faq-block__item').removeClass('active');\n        $(this).addClass('active');\n        $('.faq-block__details').slideUp();\n        $(this).find('.faq-block__details').slideDown();\n      }\n    });\n\n    // Slick Slider \n    if ($('.slider-block').length && typeof $.fn.slick === 'function') {\n      $('.slider-block').slick({\n        slidesToShow: 3,\n        slidesToScroll: 1,\n        infinite: true,\n        arrows: true,\n        dots: false,\n        responsive: [\n          {\n            breakpoint: 1024,\n            settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true },\n          },\n          {\n            breakpoint: 450,\n            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },\n          },\n        ],\n      });\n    }\n\n    // Sticky CTA Block\n    const $inner = $('.sticky-cta-block__inner');\n    const $wrapper = $('.sticky-cta-block__wrapper');\n    const $content = $('.landing-page__content');\n\n    if (\n      window.innerWidth >= 768 &&\n      $inner.length &&\n      $wrapper.length &&\n      $content.length\n    ) {\n      $('.landing-page__content__wrapper').addClass('sticky-block-added');\n\n      const fixedTop = 64;\n      const fixedWidth = 480;\n\n      function updateStickyCTA() {\n        const scrollTop = $(window).scrollTop();\n        const wrapperTop = $wrapper.offset().top;\n        const wrapperLeft = $wrapper.offset().left;\n        const stickyHeight = $inner.outerHeight();\n        const contentBottom = $content.offset().top + $content.outerHeight();\n\n        if (scrollTop >= wrapperTop && scrollTop + stickyHeight < contentBottom) {\n          $inner.css({\n            position: 'fixed',\n            top: fixedTop + 'px',\n            left: wrapperLeft + 'px',\n            width: fixedWidth + 'px',\n            padding: '32px',\n            border: '1px solid',\n            borderRadius: '16px',\n          });\n        } else if (scrollTop + stickyHeight >= contentBottom) {\n          const absoluteTop = contentBottom - wrapperTop - stickyHeight;\n          $inner.css({\n            position: 'absolute',\n            top: absoluteTop + 'px',\n            left: '0',\n            width: '100%',\n            padding: '32px',\n            border: '1px solid',\n            borderRadius: '16px',\n          });\n        } else {\n          $inner.css({\n            position: 'static',\n            top: '',\n            left: '',\n            width: '100%',\n            padding: '32px',\n            border: '1px solid',\n            borderRadius: '16px',\n          });\n        }\n      }\n\n      $(window).on('scroll resize', updateStickyCTA);\n      updateStickyCTA();\n    }\n\n    // Car animation\n    let carHasDrivenOff = false;\n    $(window).on('load', function () {\n      $('.sliding-image').addClass('slide-in');\n    });\n    $(window).on('scroll', function () {\n      const scrollTop = $(window).scrollTop();\n\n      if (scrollTop > 20 && !carHasDrivenOff) {\n        $('.sliding-image').removeClass('slide-in').addClass('slide-out');\n        carHasDrivenOff = true;\n      }\n\n      if (scrollTop <= 10 && carHasDrivenOff) {\n        $('.sliding-image').removeClass('slide-out').addClass('slide-in');\n        carHasDrivenOff = false;\n      }\n    });\n\n    // Vertical sliding animation\n    function isElementInViewport(el) {\n      const rect = el.getBoundingClientRect();\n      return rect.top <= window.innerHeight && rect.bottom >= 0;\n    }\n\n    function loop() {\n      $('.vertical-slide-yes').each(function (i, el) {\n        const $el = $(el);\n        if (isElementInViewport(el)) {\n          setTimeout(() => $el.addClass('is-visible'), i * 150);\n        } else {\n          $el.removeClass('is-visible');\n        }\n      });\n      requestAnimationFrame(loop);\n    }\n\n\n     // Home Page Hero Parallax\n  $(window).on('scroll', function () {\n  let scrolled = $(window).scrollTop();\n  $('.home-page-hero__layer.background').css('transform', 'translateY(' + scrolled * 0.3 + 'px)');\n  $('.home-page-hero__layer.middle').css('transform', 'translateY(' + scrolled * 0.5 + 'px)');\n  $('.home-page-hero__layer.foreground').css('transform', 'translateY(' + scrolled * 0.7 + 'px)');\n}); \n\n\njQuery(function ($) {\n  function animateStat($el) {\n    let finalText = $el.text().trim();\n    let finalValue = parseInt(finalText.replace(/[^0-9]/g, ''), 10);\n    let prefix = finalText.replace(/[0-9].*$/, ''); \n    let suffix = finalText.replace(/^[^0-9]*/, '').replace(/[0-9]/g, ''); \n    let current = 0;\n    let increment = Math.ceil(finalValue / 20); \n\n    let interval = setInterval(function () {\n      current += increment;\n      if (current >= finalValue) {\n        $el.text(prefix + finalValue + suffix);\n        clearInterval(interval);\n      } else {\n        $el.text(prefix + current + suffix);\n      }\n    }, 50);\n  }\n\n  let observer = new IntersectionObserver(function (entries) {\n    entries.forEach(function (entry) {\n      if (entry.isIntersecting) {\n        $(entry.target).find('.stats-block__number').each(function () {\n          animateStat($(this));\n        });\n      }\n    });\n  }, { threshold: 0.2 });\n\n  $('.stats-block__stats').each(function () {\n    observer.observe(this);\n  });\n});\n\n\n\n  });\n})(jQuery);\n\n// Background Animation\n(function ($) {\n  function init() {\n    const $bg = $('.motion-gradient');\n    if (!$bg.length) { requestAnimationFrame(init); return; }\n\n    let mx = 0, my = 0;\n    let sx = 0, sy = 0;\n    let ang = 35;\n\n    $(window).on('mousemove', function (e) {\n      const cx = window.innerWidth / 2;\n      const cy = window.innerHeight / 2;\n      mx = (e.clientX - cx) / cx;\n      my = (e.clientY - cy) / cy;\n    });\n\n    let t = 0;\n    function tick() {\n      t += 0.01;\n      sx += ((mx * 15 + Math.sin(t) * 4) - sx) * 0.06;\n      sy += ((my * 12 + Math.cos(t * 0.8) * 4) - sy) * 0.06;\n      ang += Math.sin(t * 0.6) * 0.12;\n\n      const el = $bg[0].style;\n      el.setProperty('--shiftX', sx + '%');\n      el.setProperty('--shiftY', sy + '%');\n      el.setProperty('--ang', ang + 'deg');\n\n      requestAnimationFrame(tick);\n    }\n    tick();\n  }\n  init();\n})(jQuery);\n\n\n//# sourceURL=webpack://king-law/./app/js/scripts.js?\n}");

/***/ }),

/***/ "./app/scss/main.scss":
/*!****************************!*\
  !*** ./app/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://king-law/./app/scss/main.scss?\n}");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/js/scripts.js");
/******/ 	
/******/ })()
;