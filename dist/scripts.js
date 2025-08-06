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

eval("{__webpack_require__(/*! ../scss/main.scss */ \"./app/scss/main.scss\");\n\n(function ($) {\n  $(function () {\n    // Sticky menu\n    $(window).on('scroll', function () {\n      if ($(window).scrollTop() >= 100) {\n        $('.site-header__wrapper').addClass('sticky');\n        $('nav div').addClass('visible-title');\n      } else {\n        $('.site-header__wrapper').removeClass('sticky');\n      }\n    });\n\n    // Stop scroll when menu is open \n    $('.menu-toggle').on('click', function () {\n      $('html').toggleClass('active');\n    });\n\n\n  // Home Page Hero Parallax\n  $(window).on('scroll', function () {\n  let scrolled = $(window).scrollTop();\n  $('.home-page-hero__layer.background').css('transform', 'translateY(' + scrolled * 0.3 + 'px)');\n  $('.home-page-hero__layer.middle').css('transform', 'translateY(' + scrolled * 0.5 + 'px)');\n  $('.home-page-hero__layer.foreground').css('transform', 'translateY(' + scrolled * 0.7 + 'px)');\n}); \n\n\n// Animated Mouse\n$(document).on('mousemove', function (e) {\n  $('#custom-star-cursor').css({\n    left: e.clientX,\n    top: e.clientY\n  });\n\n  const sparkle = $('<div class=\"sparkle\"></div>');\n  sparkle.css({\n    left: e.clientX + 'px',\n    top: e.clientY + 'px'\n  });\n\n  $('#trail-container').append(sparkle);\n\n  setTimeout(() => {\n    sparkle.remove();\n  }, 800);\n});\n\n$('.primary-button, .secondary-button').hover(\n    function () {\n      // Mouse enters the button\n      $('body').addClass('mouse-trail-hidden');\n    },\n    function () {\n      // Mouse leaves the button\n      $('body').removeClass('mouse-trail-hidden');\n    }\n  );\n\n\n    // FAQ Accordion\n    $('.faq-block__item').on('click', function () {\n      if ($(this).hasClass('active')) {\n        $('.faq-block__details').slideUp();\n        $('.faq-block__item').removeClass('active');\n      } else {\n        $('.faq-block__item').removeClass('active');\n        $(this).addClass('active');\n        $('.faq-block__details').slideUp();\n        $(this).find('.faq-block__details').slideDown();\n      }\n    });\n\n    // Slick Slider (check first)\n    if ($('.slider-block').length && typeof $.fn.slick === 'function') {\n      $('.slider-block').slick({\n        slidesToShow: 3,\n        slidesToScroll: 1,\n        infinite: true,\n        arrows: true,\n        dots: false,\n        responsive: [\n          {\n            breakpoint: 1024,\n            settings: {\n              slidesToShow: 3,\n              slidesToScroll: 1,\n              infinite: true,\n            },\n          },\n          {\n            breakpoint: 450,\n            settings: {\n              slidesToShow: 1,\n              slidesToScroll: 1,\n              infinite: true,\n            },\n          },\n        ],\n      });\n    }\n\n// Sticky CTA Block\n const $inner = $('.sticky-cta-block__inner');\nconst $wrapper = $('.sticky-cta-block__wrapper');\nconst $content = $('.landing-page__content');\n\nif (\n  window.innerWidth >= 768 && // ← Only run at 768px and up\n  $inner.length &&\n  $wrapper.length &&\n  $content.length\n) {\n  $('.landing-page__content__wrapper').addClass('sticky-block-added');\n\n  const fixedTop = 64;\n  const fixedWidth = 480;\n\n  function updateStickyCTA() {\n    const scrollTop = $(window).scrollTop();\n    const wrapperTop = $wrapper.offset().top;\n    const wrapperLeft = $wrapper.offset().left;\n    const stickyHeight = $inner.outerHeight();\n    const contentBottom = $content.offset().top + $content.outerHeight();\n\n    if (scrollTop >= wrapperTop && scrollTop + stickyHeight < contentBottom) {\n      $inner.css({\n        position: 'fixed',\n        top: fixedTop + 'px',\n        left: wrapperLeft + 'px',\n        width: fixedWidth + 'px',\n        padding: '32px',\n        border: '1px solid',\n        borderRadius: '16px',\n      });\n    } else if (scrollTop + stickyHeight >= contentBottom) {\n      const absoluteTop = contentBottom - wrapperTop - stickyHeight;\n      $inner.css({\n        position: 'absolute',\n        top: absoluteTop + 'px',\n        left: '0',\n        width: '100%',\n        padding: '32px',\n        border: '1px solid',\n        borderRadius: '16px',\n      });\n    } else {\n      $inner.css({\n        position: 'static',\n        top: '',\n        left: '',\n        width: '100%',\n        padding: '32px',\n        border: '1px solid',\n        borderRadius: '16px',\n      });\n    }\n  }\n\n  $(window).on('scroll resize', updateStickyCTA);\n  updateStickyCTA();\n}\n\n\n    // Car animation\n    let carHasDrivenOff = false;\n    $(window).on('load', function () {\n      $('.sliding-image').addClass('slide-in');\n    });\n    $(window).on('scroll', function () {\n      const scrollTop = $(window).scrollTop();\n\n      if (scrollTop > 20 && !carHasDrivenOff) {\n        $('.sliding-image').removeClass('slide-in').addClass('slide-out');\n        carHasDrivenOff = true;\n      }\n\n      if (scrollTop <= 10 && carHasDrivenOff) {\n        $('.sliding-image').removeClass('slide-out').addClass('slide-in');\n        carHasDrivenOff = false;\n      }\n    });\n\n    // Parallax scroll\n    $(window).on('scroll', function () {\n      const scrollTop = $(window).scrollTop();\n      const windowHeight = $(window).height();\n      const isDesktop = window.innerWidth >= 768;\n\n      if (isDesktop) {\n        $('.slow-scroll').each(function () {\n          const offsetTop = $(this).offset().top;\n          const distance = scrollTop - offsetTop + windowHeight;\n          if (distance > 0) {\n            $(this).css('transform', 'translateY(' + scrollTop * -0.2 + 'px)');\n          }\n        });\n\n        $('.fast-scroll').each(function () {\n          const offsetTop = $(this).offset().top;\n          const distance = scrollTop - offsetTop + windowHeight;\n          if (distance > 0) {\n            $(this).css('transform', 'translateY(' + scrollTop * -0.4 + 'px)');\n          }\n        });\n\n        $('.parallax-block').each(function () {\n          const offsetTop = $(this).offset().top;\n          const distance = scrollTop - offsetTop + windowHeight;\n          if (distance > 0) {\n            const bottomAdjust = Math.min(scrollTop * 0.4, 160);\n            const topAdjust = Math.min(scrollTop * 0.2, 80);\n            $(this).css({\n              'margin-bottom': '-' + bottomAdjust + 'px',\n              'margin-top': '-' + topAdjust + 'px',\n            });\n          }\n        });\n      } else {\n        $('.slow-scroll, .fast-scroll').css('transform', 'translateY(0)');\n        $('.parallax-block').css('margin-bottom', '');\n      }\n    });\n\n    // Vertical sliding animation\n    function isElementInViewport(el) {\n      const rect = el.getBoundingClientRect();\n      return rect.top <= window.innerHeight && rect.bottom >= 0;\n    }\n\n    function loop() {\n      $('.vertical-slide-yes').each(function (i, el) {\n        const $el = $(el);\n        if (isElementInViewport(el)) {\n          setTimeout(() => $el.addClass('is-visible'), i * 150);\n        } else {\n          $el.removeClass('is-visible');\n        }\n      });\n\n      requestAnimationFrame(loop);\n    }\n\n    loop();\n\n\n // Shrink to fit headings\n \n// function splitAndShrinkHeadingByWidth() {\n//   const $heading = $('.landing-page-hero-block--sliding-image__heading');\n\n//   if (!$heading.length) return;\n\n//   const originalText = $heading.text().trim();\n//   const words = originalText.split(/\\s+/);\n//   const totalWords = words.length;\n\n//   if (totalWords < 3) return;\n\n//   // Split into 3 visually balanced lines\n//   const chunkSize = Math.ceil(totalWords / 3);\n//   const lines = [\n//     words.slice(0, chunkSize).join(' '),\n//     words.slice(chunkSize, chunkSize * 2).join(' '),\n//     words.slice(chunkSize * 2).join(' ')\n//   ];\n\n//   // Clear and rebuild the heading with .line-wrapper divs\n//   $heading.empty();\n//   lines.forEach(line => {\n//     $heading.append(`<div class=\"line-wrapper\" style=\"font-size: 72px;\">${line}</div>`);\n//   });\n\n//   const $lineWrappers = $heading.find('.line-wrapper');\n//   let widestIndex = 0;\n//   let maxWidth = 0;\n\n//   $lineWrappers.each(function (i) {\n//     const width = this.offsetWidth;\n//     if (width > maxWidth) {\n//       maxWidth = width;\n//       widestIndex = i;\n//     }\n//   });\n\n//   // Apply font sizes\n//   $lineWrappers.each(function (i) {\n//     const fontSize = i === widestIndex ? '56px' : '72px';\n//     this.style.setProperty('font-size', fontSize, 'important');\n//   });\n\n//   console.log(`✅ Shrunk line ${widestIndex + 1} to 56px (visual width: ${maxWidth}px)`);\n// }\n\n// splitAndShrinkHeadingByWidth();\n\n\n\n  });\n})(jQuery);\n\n\n// Horizontal Text Block Animation\ndocument.addEventListener('DOMContentLoaded', () => {\n  const wrapper = document.querySelector('.horizontal-slide-text-block__scroll-wrapper');\n  const fixed = document.querySelector('.horizontal-slide-text-block__fixed');\n  const slides = document.querySelectorAll('.horizontal-slide-text-block__item');\n\n  if (!wrapper || !fixed || slides.length === 0) {\n    console.warn('Slide block missing required elements');\n    return;\n  }\n\n  const wrapperTop = wrapper.offsetTop;\n  const wrapperHeight = wrapper.offsetHeight;\n  const scrollRange = wrapperHeight - window.innerHeight;\n  const totalSlides = slides.length;\n\n  // Show first slide immediately\n  slides[0].classList.add('active');\n\n  window.addEventListener('scroll', () => {\n    const scrollY = window.scrollY;\n\n    if (scrollY >= wrapperTop && scrollY < wrapperTop + wrapperHeight) {\n      fixed.style.visibility = 'visible';\n      const scrollOffset = scrollY - wrapperTop;\n      const progress = scrollOffset / scrollRange;\n      const index = Math.floor(progress * totalSlides);\n\n      slides.forEach((slide, i) => {\n        slide.classList.toggle('active', i === index);\n      });\n    } else {\n      fixed.style.visibility = 'hidden';\n    }\n  });\n});\n\n\n//# sourceURL=webpack://king-law/./app/js/scripts.js?\n}");

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