/*!
 * Client Side Validations Simple Form JS (Default) - v0.1.2 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2020 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('@client-side-validations/client-side-validations')) :
  typeof define === 'function' && define.amd ? define(['jquery', '@client-side-validations/client-side-validations'], factory) :
  (global = global || self, factory(global.$, global.ClientSideValidations));
}(this, (function ($, ClientSideValidations) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  ClientSideValidations = ClientSideValidations && Object.prototype.hasOwnProperty.call(ClientSideValidations, 'default') ? ClientSideValidations['default'] : ClientSideValidations;

  function checkedInputsCount(element) {
    var formSettings = element.closest('form[data-client-side-validations]').data('clientSideValidations');
    var wrapperClass = formSettings.html_settings.wrapper_class;
    return element.closest(".".concat(wrapperClass.replace(/ /g, '.'))).find('input:checked').length;
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
      var count = checkedInputsCount(element);

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
    if (element.attr('type') === 'checkbox' || element.attr('type') === 'radio') {
      if (checkedInputsCount(element) === 0) {
        return options.message;
      }
    } else {
      return originalPresenceValidator(element, options);
    }
  };

  // It could be fixed in main CSV if radio_buttons validations are needed there and
  // in that case we may removed it from here

  var originalInputEnabler = window.ClientSideValidations.enablers.input;

  window.ClientSideValidations.enablers.input = function (input) {
    originalInputEnabler(input);
    var $input = $(input);
    var form = input.form;
    var eventsToBind = window.ClientSideValidations.eventsToBind.input(form);
    var wrapperClass = form.ClientSideValidations.settings.html_settings.wrapper_class;

    for (var eventName in eventsToBind) {
      var eventFunction = eventsToBind[eventName];
      $input.filter(':radio').each(function () {
        return $(this).attr('data-validate', true);
      }).on(eventName, eventFunction);
    }

    $input.filter(':radio').on('change.ClientSideValidations', function () {
      $(this).isValid(form.ClientSideValidations.settings.validators);
    }); // when we change radio/check mark also all sibling radios/checkboxes as changed to revalidate on submit

    $input.filter(':radio,:checkbox').on('change.ClientSideValidations', function () {
      $(this).closest(".".concat(wrapperClass.replace(/ /g, '.'))).find(':radio,:checkbox').data('changed', true);
    });
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
          var wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.'));
          var errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class.replace(/ /g, '.'));

          if (!errorElement.length) {
            errorElement = $('<' + settings.error_tag + '>', {
              "class": settings.error_class,
              text: message
            });

            if (wrapper.hasClass('check_boxes') || wrapper.hasClass('radio_buttons')) {
              element.closest('.checkbox,.radio').parent().children('.checkbox:last, .radio:last').after(errorElement);
            } else {
              wrapper.append(errorElement);
            }
          }

          wrapper.addClass(settings.wrapper_error_class);
          return errorElement.text(message);
        },
        remove: function remove(element, settings) {
          var wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.') + '.' + settings.wrapper_error_class);
          var errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class.replace(/ /g, '.'));
          wrapper.removeClass(settings.wrapper_error_class);
          return errorElement.remove();
        }
      }
    }
  };

})));
