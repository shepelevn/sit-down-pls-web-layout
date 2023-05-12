import htmlToDom from "../functions/htmlToDom.js";
import tingle from 'tingle.js';
import noUiSlider from '../vendor/nouislider.min';

(() => {
  window.createCommonRangeSlider = createCommonRangeSlider;
  window.initModal = initModal;
  window.initPhoneMask = initPhoneMask;
  window.createFormValidation = createFormValidation;

  document.addEventListener('DOMContentLoaded', initMain);

  function initMain() {
    initSelects();
    initTooltips();
    initDropdowns();
    initHorizontallScroll();
    initInputMasks();

    window.lazyLoad = new LazyLoad({
    });
  }

  function createFormValidation(formSelector) {
    return new JustValidate(formSelector, {
      errorLabelStyle: {
        color: '#ff6972',
      },
      errorFieldCssClass: 'input-primary_error',
      errorLabelCssClass: 'common-label__error-label',
      successFieldCssClass: 'input-primary_success',
      colorDisabled: true,
    });
  }

  function initInputMasks() {
    const phoneInputs = document.querySelectorAll('.phone-mask');

    for (const phoneInput of phoneInputs) {
      initPhoneMask(phoneInput);
    }
  }

  function initPhoneMask(phoneInput) {
    Inputmask('+ 7 (999) 999-99-99').mask(phoneInput);
  }

  function initHorizontallScroll() {
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');

    for (const scrollContainer of scrollContainers) {
      const step = parseInt(scrollContainer.dataset.scrollStep);

      scrollContainer.addEventListener("wheel", function (e) {
        const overflowYStyle = getComputedStyle(scrollContainer).overflowY;

        if (overflowYStyle === 'scroll') {
          e.preventDefault();

          if (e.deltaY > 0) scrollContainer.scrollLeft += step;
          else scrollContainer.scrollLeft -= step;
        }
      });
    }
  }

  function createCommonRangeSlider(element, {start, margin, range}) {
    const slider = noUiSlider.create(element, {
      start: start,
      connect: [false, true, false],
      margin: margin,
      range: range,
    });

    // Set connected inputs
    const minInputId = element.dataset.minInputId;
    const maxInputId = element.dataset.maxInputId;
    const minInput = document.getElementById(minInputId);
    const maxInput = document.getElementById(maxInputId);

    minInput.addEventListener('change', () => {
      const value = parseInt(minInput.value);
      if (value) slider.set([value, null], true, true);
    })

    maxInput.addEventListener('change', () => {
      const value = parseInt(maxInput.value);
      if (value) slider.set([null, value], true, true);
    })

    slider.on('update', () => {
      const [minValue, maxValue] = slider.get(true);
      minInput.value = Math.round(minValue);
      maxInput.value = Math.round(maxValue);
    });

    // Add svg sprite icons to handles
    const handles = element.querySelectorAll('.noUi-handle');

    for (const handle of handles) {
      const handleSprite = htmlToDom(`
      <svg class="common-slider__icon">
        <use xlink:href="img/sprite.svg#slider-handle"></use>
        </svg>
      `);

      handle.appendChild(handleSprite);
    }
  }

  function initDropdowns() {
    // Create dropdown static copy
    const transformerDropdowns = document.querySelectorAll('.common-dropdown_transformer');

    for (const transformerDropdown of transformerDropdowns) {
      const contentDiv = transformerDropdown.querySelector('.common-dropdown__content');
      const button = transformerDropdown.querySelector('.common-dropdown__button');

      const title = htmlToDom(`
      <h3 class="common-dropdown__title">
        ${button.textContent}
        </h3>
      `);

      const contentCloneDiv = contentDiv.cloneNode(true);
      contentCloneDiv.classList.add('common-dropdown__content_static');

      contentDiv.classList.add('common-dropdown__content_dynamic');

      transformerDropdown.appendChild(title);
      transformerDropdown.appendChild(contentCloneDiv);
    }

    const dropdowns = document.querySelectorAll('.common-dropdown');

    for (const dropdown of dropdowns) {
      const button = dropdown.querySelector('.common-dropdown__button');
      const content = dropdown.querySelector('.common-dropdown__content');

      tippy(button, {
        content: content,
        trigger: 'click',
        interactive: true,
        animation: true,
        // hideOnClick: 'toggle',
        placement: 'bottom',
        // arrow: false,
        zIndex: 500,
        render(instance) {
          const popper = document.createElement('div');
          popper.classList.add('common-dropdown__popper', 'popper');

          // const parentWidth = instance.reference.parentElement.offsetWidth;
          // popper.style.maxWidth = parentWidth + 'px';

          const dropdownContent = instance.props.content;

          popper.appendChild(dropdownContent);

          return {popper};
        },
        onHide(instance) {
          const dropdown = instance.reference.parentElement;
          dropdown.onHide();

          instance.reference.classList.remove('common-dropdown__button_active');

          requestAnimationFrame(instance.unmount);
        },
        onShow(instance) {
          tippy.hideAll();
          instance.reference.classList.add('common-dropdown__button_active');
        },
        popperOptions: {
          strategy: 'absolute',
          placement: 'bottom',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top'],
              },
            },
          ],
        },
      });
    }
  }

  function initTooltips() {
    tippy('.tippy', {
      maxWidth: '',
    });
  }

  function initSelects() {
    const primarySelects = document.querySelectorAll('.select-primary');

    for(const primarySelect of primarySelects) {
      initSelect(primarySelect, 'select-primary');
    }

    const regionSelectChangeHandler = function () {
      addIconToRegionSelect();
      getRegionSelectWidth();
    };

    const regionSelect = document.getElementById('select-region');

    const regionChoices = initSelect(regionSelect, 'select-region', {callbackOnInit: regionSelectChangeHandler}, regionSelectChangeHandler);

    regionChoices.setChoiceByValue('moscow');
  }

  function getRegionSelectWidth() {
    const regionSelect = document.querySelector('.select-region');
    document.documentElement.style.setProperty('--select-region-width', regionSelect.scrollWidth + 'px');
  }

  function addIconToRegionSelect() {
    const regionChoice = document.querySelector('.select-region__single .select-region__item');
    const iconDown = htmlToDom(`
        <svg class="select-region__icon select-region__icon-down">
          <use xlink:href="img/sprite.svg#down"></use>
        </svg>
      `);

    const iconUp = htmlToDom(`
      <svg class="select-region__icon select-region__icon-up">
        <use xlink:href="img/sprite.svg#up"></use>
      </svg>
    `);

    regionChoice.append(iconDown);
    regionChoice.append(iconUp);
  }

  function initSelect(select, className, options, changeHandler) {
    const choiceClassnames = {
      containerOuter: `${className}`,
      list: `${className}__list`,
      listSingle: `${className}__single`,
      listDropdown: `${className}__dropdown`,
      item: `${className}__item`,
      placeholder: `${className}__placeholder`,
    };

    select.classList.remove(className);

    const choices = new Choices(select, {
      classNames: choiceClassnames,
      searchEnabled: false,
      shouldSort: false,
      placeholder: true,
      ...options
    });

    choices.passedElement.element.addEventListener('change', changeHandler);
    // const selectSingleDiv = select.parentElement.querySelector('.select-primary__single');
    const selectSingleDiv = select.parentElement.parentElement;
    selectSingleDiv.setAttribute('aria-label', select.dataset.label);

    if (select.dataset.noFlip) {
      choices.containerOuter.element.classList.add(`no-flip`);
      // console.log(choices.containerOuter);
    }

    return choices;
  }

  function initModal(modalId, closeButtonId, {focusBackElement, classNames = [], openButtonId} = {}) {
    const modal = new tingle.modal({
      footer: false,
      closeMethods: ['overlay', 'escape'],
      closeLabel: "Close",
      cssClass: classNames,
      onOpen: function () {
        if (!focusBackElement) {
          focusBackElement = document.activeElement;
        }

        const closeButton = document.getElementById(closeButtonId);
        closeButton.focus();
      },
      onClose: function() {
        focusBackElement.focus();
      }
    });

    const modalDiv = document.getElementById(modalId);
    modal.setContent(modalDiv.innerHTML);
    modalDiv.remove();

    if(openButtonId) setOpenModalButton(modal, openButtonId);

    setCloseModalButton(modal);

    return modal;
  }

  function setOpenModalButton(tingle, buttonId) {
    const button = document.getElementById(buttonId);

    button.addEventListener('click', () => {
      tingle.open();
    })
  }

  function setCloseModalButton(tingle) {
    const closeButton = tingle.modal.querySelector('.common-modal__close');

    closeButton.addEventListener('click', () => {
      tingle.close();
    });
  }
})();
