(() => {
  document.addEventListener('DOMContentLoaded', specialInit)

  function specialInit() {
    const swiper = new Swiper('.special-swiper', {
      // Optional parameters
      direction: 'horizontal',
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
          slidesPerView: 'auto',
          slidesPerGroup: 3,
          spaceBetween: 32,
        },
      },

      navigation: {
        nextEl: '.special__next',
        prevEl: '.special__prev',
        disabledClass: 'circle-button_disabled',
      },
    });
  }
})();
