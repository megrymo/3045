  $.fn.appendAttr = function(attrName, suffix) {
      this.attr(attrName, function(i, val) {
          return val + suffix;
      });
      return this;
  };

  $('[slight-parallax]').each(function() {
    $(this).appendAttr({
      'data-bottom-top': ' transform: translateY(-25%)',
      'data-top-bottom': ' transform: translateY(25%)'
    });
  });

  $(document).ready(function () {
    var s = skrollr.init({
      forceHeight: false
    });
  });
