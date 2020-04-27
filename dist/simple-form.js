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
          console.log(this);

          if (element.is('select') && (element.hasClass('date') || element.hasClass('time'))) {
            console.log(this);
          }

          var wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.'));
          var errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class.replace(/ /g, '.'));

          if (!errorElement.length) {
            errorElement = $('<' + settings.error_tag + '>', {
              "class": settings.error_class,
              text: message
            });
            wrapper.append(errorElement);
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
      },
      multi_select: {
        add: function add(element, settings, message) {
          var wrapperElement = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.'));
          var parentElement = element.parent();
          var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');

          if (!errorElement.length) {
            errorElement = $('<' + settings.error_tag + '>', {
              "class": 'invalid-feedback d-block',
              text: message
            });
            parentElement.after(errorElement);
          }

          wrapperElement.addClass(settings.wrapper_error_class);
          element.addClass('is-invalid');
          errorElement.text(message);
        },
        remove: function remove(element, settings) {
          var wrapperElement = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.'));
          var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback');
          var invalidSiblingExists = element.siblings('.is-invalid').length;

          if (!invalidSiblingExists) {
            wrapperElement.removeClass(settings.wrapper_error_class);
            errorElement.remove();
          }

          element.removeClass('is-invalid');
        }
      }
    }
  };

})));
