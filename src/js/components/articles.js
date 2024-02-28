(() => {
  document.addEventListener('DOMContentLoaded', articlesInit)

  function articlesInit() {
    const articlesSwiper = new Swiper('.articles-swiper', {
      // Optional parameters
      direction: 'horizontal',
      preventClicks: false,
      preventClicksPropagation: false,
      // allowTouchMove: false,
      spaceBetween: 12,

      breakpoints: {
        716: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 32,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 32,
        },
        1400: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 32,
        },
      },

      navigation: {
        nextEl: '.articles__next',
        prevEl: '.articles__prev',
        disabledClass: 'circle-button_disabled',
      },
    });
  }
})();
