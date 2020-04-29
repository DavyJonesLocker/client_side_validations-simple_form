/*!
 * Client Side Validations Simple Form JS (Default) - v0.1.2 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2020 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

import $ from 'jquery';
import ClientSideValidations from '@client-side-validations/client-side-validations';

function checkedCheckboxesCount(element) {
  var formSettings = element.closest('form[data-client-side-validations]').data('clientSideValidations');
  var wrapperClass = formSettings.html_settings.wrapper_class;
  return element.closest(".".concat(wrapperClass.replace(/ /g, '.'))).find('input[type="checkbox"]:checked').length;
}

var originalLengthValidator = ClientSideValidations.validators.local.length;
var VALIDATIONS = {
  is: function is(a, b) {
    return a === parseInt(b, 10);
  },
  minimum: function minimum(a, b) {
    return a >= parseInt(b, 10);
  },
  maximum: function maximum(a, b) {
    return a <= parseInt(b, 10);
  }
};

var runValidations = function runValidations(valueLength, options) {
  for (var validation in VALIDATIONS) {
    var validationOption = options[validation];
    var validationFunction = VALIDATIONS[validation];

    if (validationOption && !validationFunction(valueLength, validationOption)) {
      return options.messages[validation];
    }
  }
};

ClientSideValidations.validators.local.length = function (element, options) {
  if (element.attr('type') === 'checkbox') {
    var count = checkedCheckboxesCount(element);

    if (options.allow_blank && count === 0) {
      return;
    }

    return runValidations(count, options);
  } else {
    return originalLengthValidator(element, options);
  }
};

var originalPresenceValidator = ClientSideValidations.validators.local.presence;

ClientSideValidations.validators.local.presence = function (element, options) {
  if (element.attr('type') === 'checkbox') {
    if (checkedCheckboxesCount(element) === 0) {
      return options.message;
    }
  } else {
    return originalPresenceValidator(element, options);
  }
};

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function add(element, settings, message) {
    this.wrapper(this.wrapperName(element, settings)).add.call(this, element, settings, message);
  },
  remove: function remove(element, settings) {
    this.wrapper(this.wrapperName(element, settings)).remove.call(this, element, settings);
  },
  wrapper: function wrapper(name) {
    return this.wrappers[name] || this.wrappers["default"];
  },
  wrapperName: function wrapperName(element, settings) {
    return element.data('clientSideValidationsWrapper') || settings.wrapper;
  },
  wrappers: {
    "default": {
      add: function add(element, settings, message) {
        var wrapperElement = element.parent();
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');

        if (!errorElement.length) {
          errorElement = $('<' + settings.error_tag + '>', {
            "class": 'invalid-feedback',
            text: message
          });
          wrapperElement.append(errorElement);
        }

        wrapperElement.addClass(settings.wrapper_error_class);
        element.addClass('is-invalid');
        errorElement.text(message);
      },
      remove: function remove(element, settings) {
        var wrapperElement = element.parent();
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');
        wrapperElement.removeClass(settings.wrapper_error_class);
        element.removeClass('is-invalid');
        errorElement.remove();
      }
    },

    get horizontal_collection() {
      return this.vertical_collection;
    },

    vertical_collection: {
      add: function add(element, settings, message) {
        var wrapperElement = element.closest('.' + settings.wrapper_class.replace(/ /g, '.'));
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');

        if (!errorElement.length) {
          errorElement = $('<' + settings.error_tag + '>', {
            "class": 'invalid-feedback d-block',
            text: message
          });
          element.closest('.form-check').parent().children('.form-check:last').after(errorElement);
        }

        wrapperElement.addClass(settings.wrapper_error_class);
        wrapperElement.find('input:visible').addClass('is-invalid');
        errorElement.text(message);
      },
      remove: function remove(element, settings) {
        var wrapperElement = element.closest('.' + settings.wrapper_class.replace(/ /g, '.'));
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');
        wrapperElement.removeClass(settings.wrapper_error_class);
        errorElement.remove();
        wrapperElement.find('input:visible').removeClass('is-invalid');
      }
    }
  }
};
