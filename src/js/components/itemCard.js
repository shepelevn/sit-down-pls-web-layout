(() => {
  document.addEventListener('DOMContentLoaded', initItemCard);

  let formModal;
  let callbackModal;

  function initItemCard() {
    initItemCardSwiper();
    initSimilarItemsSwiper();
    initImagesModal();
    initFormModals();
  }

  function initImagesModal() {
    const imagesModal = initModal('images-modal', 'images-modal-close');

    lazyLoad.update();

    const modalSwiper = new Swiper('.modal-swiper', {
      effect: 'fade',
      speed: 800,
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      direction: 'horizontal',
    });

    const thumbnailSwiper = new Swiper('.thumbnail-swiper', {
      direction: 'horizontal',
      preventClicks: false,
      preventClicksPropagation: false,

      slidesPerView: 'auto',
      spaceBetween: 16,

      breakpoints: {
        576: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 78,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 78,
        },
        1400: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 78,
        },
      },

      navigation: {
        nextEl: '.images-modal__next',
        prevEl: '.images-modal__prev',
        disabledClass: 'circle-button_disabled',
      },
    });

    const imageButtons = document.querySelectorAll('.item-swiper__slide');

    for (let [index, button] of Object.entries(imageButtons)) {
      index = parseInt(index);

      button.addEventListener('click', () => {
        modalSwiper.update();
        modalSwiper.slideTo(index, 0);
        thumbnailSwiper.slideTo(index - 1);

        imagesModal.open();
      });
    }

    const thumbnailButtons = imagesModal.modal.querySelectorAll('.thumbnail-swiper__button');

    for (let [index, thumbnailButton] of Object.entries(thumbnailButtons)) {
      index = 1 + parseInt(index);

      thumbnailButton.addEventListener('click', () => {
        modalSwiper.update();
        modalSwiper.slideTo(index);
      });
    }
  }

  function initFormModals() {
    const buyButton = document.getElementById('buy-button');

    callbackModal = initModal('callback-modal', 'callback-modal-close', {
      classNames: ['tingle-modal_small'],
      focusBackElement: buyButton,
    });
    formModal = initModal('form-modal', 'form-modal-close', {
      classNames: ['tingle-modal_small'],
      openButtonId: 'buy-button',
      focusBackElement: buyButton,
    });

    initModalFormValidation();
    initModalFormMasks();
  }

  function initModalFormMasks() {
    const phoneInput = document.getElementById('buy-phone');

    initPhoneMask(phoneInput);
  }

  function initModalFormValidation() {
    const callbackValidator = createFormValidation('#buy-form');

    callbackValidator.addField('#buy-name', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя не должно быть короче 3 букв',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя не должно быть длиннее 30 букв',
      },
    ]);

    callbackValidator.addField('#buy-phone', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        validator: (value) => {
          value = value.replaceAll('_', '');

          return value.length === 19;
        },
        errorMessage: 'Неверно введен номер телефона',
      },
    ]);

    callbackValidator.addField('#buy-license', [
      {
        rule: 'required',
        errorMessage: 'Необходимо принять пользовательское соглашение',
      },
    ]);

    callbackValidator.onSuccess(() => {
      formModal.close();
      callbackModal.open();
    });
  }

  function initItemCardSwiper() {
    const swiper = new Swiper('.item-swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 20,
      allowTouchMove: false,

      pagination: {
        el: '.item-card__pagination .item-pagination__wrapper',
        clickable: true,
        type: 'bullets',
        bulletClass: 'item-pagination__bullet',
        bulletActiveClass: 'item-pagination__bullet_active',
        renderBullet: function (index, className) {
          return `
          <div class="${className}">
            <picture class="item-pagination__picture">
            <source srcset="./img/item-card/${index + 1}-1920.webp" media="(min-width: 1400px)">
            <source srcset="./img/item-card/${index + 1}-1024.webp" media="(min-width: 1024px) and (max-width: 1399px)">
            <source srcset="./img/item-card/${index + 1}-768.webp" media="(min-width: 576px) and (max-width: 1023px)">
              <img class="item-pagination__image" src="./img/item-card/${index + 1}.webp" alt="">
              </picture>
            </div>
                `;
        },
      },
    });
  }

  function initSimilarItemsSwiper() {
    similarItemsSwiper = new Swiper('.similar-items-swiper', {
      // Optional parameters
      direction: 'horizontal',
      preventClicks: false,
      preventClicksPropagation: false,
      // allowTouchMove: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
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
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 32,
        },
      },

      navigation: {
        nextEl: '.similar-items__next',
        prevEl: '.similar-items__prev',
        disabledClass: 'circle-button_disabled',
      },
    });
  }

})();
