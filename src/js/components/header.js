import {popupInitElements, popupEnableAllInteractiveElements, popupDisableAllInteractiveElements} from "../functions/popup.js";

(() => {
  document.addEventListener("DOMContentLoaded", initHeader);

  function initHeader() {
    initHeaderTabindexes();
    initBurger();
    initBurgerMenu();
  }

  function initHeaderTabindexes() {
    setHeaderTabindexes();
    window.addEventListener('resize', setHeaderTabindexes);
  }

  function setHeaderTabindexes() {
    const header = document.querySelector('.header');
    const focusableElements = header.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const elementsFlexOrder = [];

    for (const focusableElement of focusableElements) {
      let order = parseInt(window.getComputedStyle(focusableElement).order);

      let higherElement = focusableElement.parentElement;

      while ((higherElement.tagName !== 'BODY') && (order === 0)) {
        order = parseInt(window.getComputedStyle(higherElement).order);
        higherElement = higherElement.parentElement;
      }

      elementsFlexOrder.push(order);
    }

    const minOrder = Math.min(...elementsFlexOrder);

    for (const [index, focusableElement] of Object.entries(focusableElements)) {
      focusableElement.tabIndex = elementsFlexOrder[index] - minOrder + 1;
    }
  }

  function initBurger() {
    let openButton = document.getElementById('open-burger');
    let closeButton = document.getElementById('close-burger');

    openButton.addEventListener('click', openBurgerMenus);
    closeButton.addEventListener('click', closeBurgerMenus);
    window.addEventListener('keyup', checkForBurgerCloseKey)

    window.addEventListener('resize', () => checkScreenForBurger('.menu'));
    window.addEventListener('resize', () => checkScreenForBurger('.secondary-menu', 576));
    checkScreenForBurger('.menu');
    checkScreenForBurger('.secondary-menu', 576);

    setBurgerMenuPosition();
  }

  function checkScreenForBurger(menuSelector, breakpoint = 992) {
    let menu = document.querySelector(menuSelector);
    popupInitElements(menu);

    if(window.innerWidth < breakpoint) {
      popupDisableAllInteractiveElements(menu);
    }
    else {
      popupEnableAllInteractiveElements(menu);
    }
  }

  function checkForBurgerCloseKey(event) {
    if (event.key === 'Escape') {
      if (window.innerWidth < 992) {
        closeBurgerMenus();
      }
    }
  }

  function openBurgerMenus() {
    openBurger('menu', 999);

    if (window.innerWidth < 576) {
      openBurger('secondary-menu', 1000);
    }
  }

  function closeBurgerMenus() {
    if (window.innerWidth < 992) {
      closeBurger('menu');
    }
    if (window.innerWidth < 576) {
      closeBurger('secondary-menu');
    }

    checkScreenForBurger('.menu')
    checkScreenForBurger('.secondary-menu', 576)
  }

  function openBurger(menuClassName, tabIndex = 1) {
    let menu = document.querySelector('.' + menuClassName);
    menu.classList.add(menuClassName + '_visible');

    popupEnableAllInteractiveElements(menu, tabIndex);

    let closeButton = document.getElementById('close-burger');
    closeButton.focus();

    // Disable scroll
    let siteContainer = document.querySelector('.site-container');
    siteContainer.classList.add('site-container_locked');
  }

  function closeBurger(menuClassName) {
    let menu = document.querySelector('.' + menuClassName);
    menu.classList.remove(menuClassName + '_visible');

    popupDisableAllInteractiveElements(menu);

    let openButton = document.getElementById('open-burger');
    openButton.focus();

    // Enable scroll
    let siteContainer = document.querySelector('.site-container');
    siteContainer.classList.remove('site-container_locked');
  }

  function initBurgerMenu() {
    window.addEventListener('resize', setBurgerMenuPosition);
    setBurgerMenuPosition();
  }

  function setBurgerMenuPosition() {
    setBottomMenuPosition();
    setMainBurgerMenuPosition();
  }

  function setMainBurgerMenuPosition() {
    if((window.innerWidth >= 576) && (window.innerWidth < 992)) {
      const secondaryMenuRect = document.querySelector('.secondary-menu').getBoundingClientRect();
      const top = secondaryMenuRect.top + window.scrollY + secondaryMenuRect.height;

      document.documentElement.style.setProperty('--burger-menu-top', top + 'px');
    }
  }

  function setBottomMenuPosition() {
    if(window.innerWidth < 576) {
      const menuRect = document.querySelector('.menu').getBoundingClientRect();
      const top = menuRect.top + window.scrollY + menuRect.height;

      document.documentElement.style.setProperty('--bottom-burger-menu-position', top + 'px');
    }
  }
})();
