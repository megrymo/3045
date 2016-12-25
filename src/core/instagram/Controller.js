(function factory($, _) {
  class InstagramGallery {
    constructor(element) {
      this.element = element;
      this.$element = $(element);

      this.template = this.getTemplate('template');
      this.groupTemplate = this.getTemplate('group-template');

      this.loading = $('<div class="instagram-loading"></div>');

      this.$element
        .on(
          'instagram-images-loaded',
          $.proxy(this.onLoaded, this)
        )
        .trigger("instagram-images-load")
        .append(this.loading);
    }

    getItemsPerGroup() {
      return this.$element.data('items-per-group') || 6;
    }

    getTemplate(attribute) {
      return _.template(
        $('#' + this.$element.data(attribute)).text()
      );
    }

    reduceGroups(memo, group) {
      var itemsHtml = _.reduce(
        group,
        this.reduceGroup,
        '',
        this
      );

      return memo +
        this.groupTemplate({
          items: itemsHtml
        });
    }

    reduceGroup(memo, imageData) {
      return memo + this.template(imageData);
    }

    groupImages(imageData, index) {
      return Math.floor(index / this.getItemsPerGroup());
    }

    onLoaded(event, response) {
      var groupedData = _.groupBy(response.data, this.groupImages, this);
      var html = _.reduce(groupedData, this.reduceGroups, '', this);

      this.$element
        .trigger("group-added", html)
        .trigger("instagram-images-load-more");

      this.loading.remove();
    }
  }

  function eachGallery(index, element) {
    $(element)
      .data(
        'instagram-gallery',
        new InstagramGallery(element)
      );
  }

  $('[instagram-gallery]').each(eachGallery);

}(jQuery, _));
