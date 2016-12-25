(function($) {

  var windowHeight = $(window).height(),
      item = ".item",
      fullItem = ".item--full";

  var isTouchDevice = function(){
    return true === ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
  }

  var isIOS8 = function() {
    var deviceAgent = navigator.userAgent.toLowerCase();
    return /(iphone|ipod|ipad).* os 8_/.test(deviceAgent);
  }

  var isSafari = function(){
    return true === !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  }

  function animationInit(){

    var controller = new ScrollMagic.Controller();

    $(item).each(function (index, elem) {

      var itemHeight = $(elem).height();

      TweenMax.set(elem, {
        className: '+=item--hide'
      });

      new ScrollMagic.Scene({
            duration: 0,
            triggerElement: elem,
            triggerHook: .75
          })
          .setClassToggle(elem, 'item--show')
          .addTo(controller)
    });
    $(fullItem).each(function (index, elem) {

      var itemHeight = $(elem).height();

      TweenMax.set(elem, {
        className: '+=item--full--hide'
      });

      new ScrollMagic.Scene({
            duration: 0,
            triggerElement: elem,
            triggerHook: .75
          })
          .setClassToggle(elem, 'item--full--show')
          .addTo(controller)
    });

  }

  $(document).ready(function () {

    if (isTouchDevice() && !isSafari() && !isIOS8()) {
      // no animations
    } else {
      animationInit();
    }

  });

})(jQuery);
