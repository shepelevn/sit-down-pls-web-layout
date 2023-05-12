import htmlToDom from "./functions/htmlToDom.js";

(() => {
  document.addEventListener('DOMContentLoaded', initIndexOverflow);

  function initIndexOverflow() {
    addElements('.menu__list', '.menu__item');
    addElements('.secondary-menu__list', '.secondary-menu__item');
    addElements('.contacts', '.contacts__item');
    addElements('.footer-menu__list', '.footer-menu__item');
    addElements('.footer-menu', '.footer-menu__submenu', 3);

    specialOverflow();
  }

  function specialOverflow() {
    const newPrice = document.querySelector('.special-card__new-price');
    newPrice.innerText = '150 990 руб';

    const oldPrice = document.querySelector('.special-card__old-price');
    oldPrice.innerText = '150 990 руб';
  }

  function addElements(containerSelector, elementSelector, newElementsCount = 5) {
    const container = document.querySelector(containerSelector);
    const element = container.querySelector(elementSelector);

    for (let i = 0; i < newElementsCount; i++) {
      container.appendChild(element.cloneNode(true));
    }
  }

})();
