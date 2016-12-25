const $ = window.jQuery;

export default class Slider {
  constructor(element, options) {
    this.options = $.extend({
      activeSlideClass: "dmcnt__slide--active",
      activeIndicatorClass: "dmcnt__indicator--active",
      slides: "[data-dmcnt-slider-slide]",
      counter: "[data-dmcnt-slider-counter]",
      indicators: "[data-dmcnt-slider-indicator]",
      previousButton: "[data-dmcnt-slider-prev]",
      nextButton: "[data-dmcnt-slider-next]",
      keyWatch: true,
      autoSlide: true,
      // 5 seconds
      delay: 5 * 1000
    }, options);

    this.slider = $(element);
    this.slides = $(element).find(this.options.slides);
    this.counter = $(element).find(this.options.counter);
    this.indicators = $(element).find(this.options.indicators);
    this.previousButton = $(element).find(this.options.previousButton);
    this.nextButton = $(element).find(this.options.nextButton);

    this.init();
  }
  init() {
    this.indicators.click(this.onClick.bind(this));
    this.goTo(0);

    if (this.options.autoSlide){
      this.startTimer();
    }

    if (this.slides.length === 0) {
      this.counter.remove();
      return;
    }

    this.slides
      .on('swipeleft', this.goToNext.bind(this))
      .on('swiperight', this.goToPrev.bind(this));

    this.previousButton
      .on('click', this.goToPrev.bind(this));

    this.nextButton
      .on('click', this.goToNext.bind(this));

    if (this.options.keyWatch){
      $('body').keydown(this.watchKeys.bind(this));
    }

  }
  goToNext() {
    this.goTo(this.index + 1);

    this.pause();
  }
  goToPrev() {
    this.goTo(this.index - 1);

    this.pause();
  }
  inView(elem) {
    if (typeof jQuery === "function" && elem instanceof jQuery) {
      elem = elem[0];
    }

    var rect = elem.getBoundingClientRect();

    return (
      rect.top + (rect.height * 0.75) >= 0 &&
      rect.bottom - (rect.height * 0.75) <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  watchKeys(event) {
    var inView = this.inView(this.slider);
    switch(event.which) {
      case 37:
        event.preventDefault();
        if (inView) {
          this.goToPrev();
        }
      break;

      case 39:
        event.preventDefault();
        if (inView) {
          this.goToNext();
        }
      break;

      default:
      return;
    }
  }
  setIndex(newIndex) {
    this.index = newIndex % this.slides.length;
  }
  update() {
    this.slides
      .removeClass(this.options.activeSlideClass)
      .eq(this.index).addClass(this.options.activeSlideClass);

    this.indicators
      .removeClass(this.options.activeIndicatorClass)
      .eq(this.index).addClass(this.options.activeIndicatorClass);
  }
  goTo(newIndex) {
    this.setIndex(newIndex);

    this.update();
  }
  tick() {
    this.goTo(this.index + 1);
    this.startTimer();
  }
  startTimer() {
    this.timer = setTimeout(this.tick.bind(this), this.options.delay);
  }
  pause() {
    if (this.options.autoSlide) {
      clearTimeout(this.timer);
    }
  }
  onClick(event) {
    this.goTo($(event.target).index());

    this.pause();
  }
}
