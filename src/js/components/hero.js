(() => {
  document.addEventListener('DOMContentLoaded', heroInit)

  function heroInit() {
    const swiper = new Swiper('.hero-swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000,
      },

      // If we need pagination
      pagination: {
        el: '.hero-swiper__pagination',
        clickable: true,
        bulletClass: 'hero-swiper__bullet swiper-pagination-bullet',
        bulletActiveClass: 'hero-swiper__bullet_active swiper-pagination-bullet-active',
      },
    });
  }
})();
