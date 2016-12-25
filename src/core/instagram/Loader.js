(function factory($) {
  class InstagramLoader {
    constructor(element) {
      this.element = element;
      this.$element = $(element);

      this.count = 0;

      this.$element
        .on(
          "instagram-images-load",
          $.proxy(this.load, this)
        )
        .on(
          "instagram-images-load-more",
          $.proxy(this.loadMore, this)
        );
    }

    getMaxPages() {
      return this.$element.data('max-pages') || 3;
    }

    getItemsPerGroup() {
      return this.$element.data('items-per-group') || 6;
    }

    getUserId() {
      return this.$element.data('user-id');
    }

    getCount() {
      return this.$element.data('pull-count') || 18;
    }

    getParams() {
      return {
        type:     'GET',
        dataType: 'jsonp',
        url:      'https://api.instagram.com/v1/users/' + this.getUserId() + '/media/recent',
        data: {
          max_id: this.nextMaxId,
          count: this.getCount(),
          client_id: this.$element.data('client-id')
        },
        success: $.proxy(this.loadSuccess, this)
      };
    }

    load() {
      $.ajax(this.getParams());
    }

    loadSuccess(response) {
      this.count = this.count + 1;

      this.nextMaxId = response.pagination.next_max_id;

      this.$element.trigger('instagram-images-loaded', response);

    }

    loadMore() {
      if (this.count < this.getMaxPages()) {
        setTimeout($.proxy(this.load, this), 500);
      }
    }
  }

  function eachLoader(index, element) {
    $(element).data('instagram-loader', new InstagramLoader(element));
  }

  $('[instagram-loader]').each(eachLoader);
}(jQuery));
