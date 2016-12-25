jQuery(function init($) {
  var loader = "[instagram-loader]",
      prefix = $("[instagram-loader]").data("class-prefix"),
      brandPrefix = prefix.split("-")[0],
      prevButton = `<button instagram-prev class="${prefix}__prev">
        <span class="${brandPrefix}-sr">Previous</span>
        </button>`,
      nextButton = `<button instagram-next class="${prefix}__next">
        <span class="${brandPrefix}-sr">Next</span>
        </button>`;

  $(loader)
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      slide: "div",
      centerMode: true,
      arrows: false
    })
    .on("group-added", function onGroupAdded(event, html) {
      $(this).slick('slickAdd', html);
    })
    .on("afterChange", function onAfterChange() {
      $(this).trigger("instagram-images-load");
    })
    .append(prevButton)
    .append(nextButton);

  $("[instagram-next]").on("click", function onClick() {
    $(this).closest(loader).slick("slickNext");
    $(this).blur();
  });

  $("[instagram-prev]").on("click", function onClick() {
    $(this).closest(loader).slick("slickPrev");
    $(this).blur();
  });
});
