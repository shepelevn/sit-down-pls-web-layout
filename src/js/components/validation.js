import JustValidate from 'just-validate';

(() => {

  const localization = [
    {
      key: 'The field is required',
      dict: {
        Russian: 'Поле обязательно для заполнения',
      },
    },
    {
      key: 'Email has invalid format',
      dict: {
        Russian: 'Неправильно заполнен Email',
      },
    },
  ];

  const ruleRequired = {
    rule: 'required',
    errorMessage: 'The field is required',
  };

  const ruleEmail = {
    rule: 'email',
    errorMessage: 'Email has invalid format',
  };

  const subscribeValidator = new JustValidate('#subscribe-form', {
    errorLabelStyle: { color: '#f06666' },
  }, localization);

  subscribeValidator.setCurrentLocale('Russian');

  subscribeValidator.addField('#subscribe-email', [
    ruleRequired,
    ruleEmail,
  ]);

  const applicationValidator = new JustValidate('#application-form', {
    errorLabelStyle: { color: '#FF3030' },
  }, localization);

  applicationValidator.setCurrentLocale('Russian');

  applicationValidator
    .addField('#application-name', [
      ruleRequired,
    ])
    .addField('#application-email', [
      ruleRequired,
      ruleEmail,
    ])
    .addField('#application-commentary', [
      ruleRequired,
    ])

})();
