(function($){

  var modalActiveClass = 'sorg-lnd__modal--active',
      modalOuter = $('.sorg-lnd__modal-modal-outer'),
      embedFrame = $('.sorg-lnd__modal-embed');

  $('.sorg-lnd__video-x, .sorg-lnd__video-modal')
    .on('click', function () {
      modalOuter.removeClass(modalActiveClass);
      embedFrame.attr('src','');
    });

  $('.sorg-lnd__modal-play')
    .on('click', function (event) {
      event.preventDefault();

      var givenLink = $(this).data('video'),
          videoEmbedUrl = givenLink
                            .replace('https:', '')
                            .replace('watch?v=', 'embed/')
                            .split(/[?#]/)[0]
                            .concat('?rel=0');

      embedFrame.attr('src', videoEmbedUrl);
      modalOuter.addClass(modalActiveClass);
    });

  modalOuter.prependTo('body');

})(jQuery);
