jQuery(function init($) {
  var loader = "[instagram-loader]",
      prefix = $("[instagram-loader]").data("class-prefix"),
      brandPrefix = prefix.split("-")[0];

  $(loader)
    .on("group-added", function onGroupAdded(event, html) {
      $('.sorg-lnd__time__instagram').append(html);
    });
});
