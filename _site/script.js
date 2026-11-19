!function(e){"use strict";function t(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function n(t,n){return e.localStorage&&localStorage[t+"_content"]&&localStorage[t+"_file"]===n}function a(t,a){if(e.localStorage&&e.XMLHttpRequest)n(t,a)?o(localStorage[t+"_content"]):l(t,a);else{var s=r.createElement("link");s.href=a,s.id=t,s.rel="stylesheet",s.type="text/css",r.getElementsByTagName("head")[0].appendChild(s),r.cookie=t}}function l(e,t){var n=new XMLHttpRequest;n.open("GET",t,!0),n.onreadystatechange=function(){4===n.readyState&&200===n.status&&(o(n.responseText),localStorage[e+"_content"]=n.responseText,localStorage[e+"_file"]=t)},n.send()}function o(e){var t=r.createElement("style");t.setAttribute("type","text/css"),r.getElementsByTagName("head")[0].appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.innerHTML=e}var r=e.document;e.loadCSS=function(e,t,n){var a,l=r.createElement("link");if(t)a=t;else{var o;o=r.querySelectorAll?r.querySelectorAll("style,link[rel=stylesheet],script"):(r.body||r.getElementsByTagName("head")[0]).childNodes,a=o[o.length-1]}var s=r.styleSheets;l.rel="stylesheet",l.href=e,l.media="only x",a.parentNode.insertBefore(l,t?a:a.nextSibling);var c=function(e){for(var t=l.href,n=s.length;n--;)if(s[n].href===t)return e();setTimeout(function(){c(e)})};return l.onloadcssdefined=c,c(function(){l.media=n||"all"}),l},e.loadLocalStorageCSS=function(l,o){n(l,o)||r.cookie.indexOf(l)>-1?a(l,o):t(e,"load",function(){a(l,o)})}}(this);


(function() {
  var sliders = $("*[data-lazyslider]"),
      daysSliderSettings = {
        indexSlide:1,
        infinite: false,
        arrows: true,
        dots: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        // rtl: true,
        prevArrow: $(".day-next"),
        nextArrow: $(".day-prev"),
        adaptiveHeight: false,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              rows:1,
              slidesPerRow:1,
              adaptiveHeight: false,
            }
          },
          {
            breakpoint: 1224,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              adaptiveHeight: false,
              rows:1,
              slidesPerRow:1,
            }
          },
          {
            breakpoint: 959,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              adaptiveHeight: false,
              rows:1,
              slidesPerRow:1,
            }
          },
          {
            breakpoint: 665,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              adaptiveHeight: false,
              rows:1,
              slidesPerRow:1,

            }
          },

        ]
      };


  $(window).on('load', function() {
    (function(){
      if(createdDesctop){
        $(sliders).removeAttr("data-lazyslider");
        $(".ptivatbank-day-number-slider").not('.slick-initialized').slick(daysSliderSettings);
      }
      else if(createdMobile){

        var lazyLibs = function (elements) {
          var config = {
            rootMargin: "50px"
          };

          try {
            var observerElem = new IntersectionObserver(function (entries) {
              entries.forEach(function (change) {
                if (change.isIntersecting) {
                  checkIfScriptLoaded('/sites/pb/libs/slick/slick.mob.js',  function () {
                    $(".ptivatbank-day-number-slider").not('.slick-initialized').slick(daysSliderSettings);
                    for (var i = 0; i < sliders.length; i++) {
                      observerElem.unobserve(sliders[i]);
                    }
                  });
                }
              });
            }, config);

            for (var i = 0; i < elements.length; i++) {
              observerElem.observe(elements[i]);
            }
          } catch (err) {
            checkIfScriptLoaded('/sites/pb/libs/slick/slick.mob.js', function () {
              $(".ptivatbank-day-number-slider").not('.slick-initialized').slick(daysSliderSettings);
              $(sliders).removeAttr("data-lazyslider");
              for (var i = 0; i < sliders.length; i++) {
                observerElem.unobserve(sliders[i]);
              }
            });
          }
        }
        lazyLibs(document.querySelectorAll("[data-lazyslider]"));
      }
    })();
  })





  var elementWidget = $('.main-content .top-widget-form:first-child');
  var elementSlider = $('#indexCarousel');

  if(elementWidget.length === 0 && elementSlider.length === 0){
    $('body').addClass('no-slider-or-banner');
  }
  else if(elementWidget.length !== 0){
    $('body').addClass('have-widget');
  }
  else if(elementSlider.length !== 0){
    $('body').addClass('have-slider');
  }

  $(".navbar-toggle").on("click", function (e) {
    let heightCookieBlock = 0;
    $('.navbar_container').toggleClass('hide-nav');
    $('body, html').toggleClass('no-scroll');
    $(this).toggleClass("active_navbar_toogle");
    $('.navbar-brand').toggleClass('hide');
    $('.navbar-collapse').toggleClass('in');
    if($('.navbar-collapse').hasClass('in')){
      let heightNavbarHeader = document.querySelector('.navbar-header').offsetHeight,
          totalHeight = heightCookieBlock + heightNavbarHeader;
      document.querySelector('.navbar-collapse.collapse.in').setAttribute('style', 'height:calc(100% - ' + totalHeight + 'px)!important');
    }
    return false;
  });
})();
