(() => {
  document.addEventListener('DOMContentLoaded', initCallback);

  let callbackModal;

  function initCallback() {
    initCallbackForm();
    initCallbackModal();
  }

  function initCallbackForm() {
    initCallbackFormValidation()
  }

  function initCallbackFormValidation() {
    const callbackValidator = createFormValidation('#callback-form');

    callbackValidator.addField('#callback-name', [
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

    callbackValidator.addField('#callback-phone', [
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

    callbackValidator.addField('#callback-email', [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'email',
        errorMessage: 'Неверно введен email',
      },
    ]);

    callbackValidator.addField('#callback-license', [
      {
        rule: 'required',
        errorMessage: 'Необходимо принять пользовательское соглашение',
      },
    ]);

    callbackValidator.onSuccess(() => {
      callbackModal.open();
    });
  }

  function initCallbackModal() {
    const submitButton = document.getElementById('callback-submit');

    callbackModal = initModal('callback-modal', 'callback-modal-close', {
      classNames: ['tingle-modal_small'],
      focusBackElement: submitButton,
    });
  }

})();
