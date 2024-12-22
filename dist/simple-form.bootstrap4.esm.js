/*!
 * Client Side Validations Simple Form JS (Default) - v0.5.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2024 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

import ClientSideValidations from '@client-side-validations/client-side-validations';

const addClass = (element, customClass) => {
  if (customClass) {
    element.classList.add(...customClass.split(' '));
  }
};
const removeClass = (element, customClass) => {
  if (customClass) {
    element.classList.remove(...customClass.split(' '));
  }
};

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function ($element, settings, message) {
    this.wrapper(settings.wrapper).add.call(this, $element[0], settings, message);
  },
  remove: function ($element, settings) {
    this.wrapper(settings.wrapper).remove.call(this, $element[0], settings);
  },
  wrapper: function (name) {
    return this.wrappers[name] || this.wrappers.default;
  },
  wrappers: {
    default: {
      add(element, settings, message) {
        const wrapperElement = element.parentElement;
        let errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".invalid-feedback"));
        if (!errorElement) {
          const formTextElement = wrapperElement.querySelector('.form-text');
          errorElement = document.createElement(settings.error_tag);
          addClass(errorElement, 'invalid-feedback');
          errorElement.textContent = message;
          if (formTextElement) {
            formTextElement.before(errorElement);
          } else {
            wrapperElement.appendChild(errorElement);
          }
        }
        addClass(wrapperElement, settings.wrapper_error_class);
        addClass(element, 'is-invalid');
        errorElement.textContent = message;
      },
      remove(element, settings) {
        const wrapperElement = element.parentElement;
        const errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".invalid-feedback"));
        removeClass(wrapperElement, settings.wrapper_error_class);
        removeClass(element, 'is-invalid');
        if (errorElement) {
          errorElement.remove();
        }
      }
    }
  }
};
