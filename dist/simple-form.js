/*!
 * Client Side Validations Simple Form JS (Default) - v0.3.1 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2022 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('@client-side-validations/client-side-validations')) :
  typeof define === 'function' && define.amd ? define(['jquery', '@client-side-validations/client-side-validations'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jQuery, global.ClientSideValidations));
})(this, (function (jQuery, ClientSideValidations) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var jQuery__default = /*#__PURE__*/_interopDefaultLegacy(jQuery);
  var ClientSideValidations__default = /*#__PURE__*/_interopDefaultLegacy(ClientSideValidations);

  ClientSideValidations__default["default"].formBuilders['SimpleForm::FormBuilder'] = {
    add: function add($element, settings, message) {
      this.wrapper(settings.wrapper).add.call(this, $element, settings, message);
    },
    remove: function remove($element, settings) {
      this.wrapper(settings.wrapper).remove.call(this, $element, settings);
    },
    wrapper: function wrapper(name) {
      return this.wrappers[name] || this.wrappers.default;
    },
    wrappers: {
      default: {
        add: function add($element, settings, message) {
          var $wrapperElement = $element.closest("".concat(settings.wrapper_tag, ".").concat(settings.wrapper_class.replace(/ /g, '.')));
          var $errorElement = $wrapperElement.find("".concat(settings.error_tag, ".").concat(settings.error_class.replace(/ /g, '.')));

          if (!$errorElement.length) {
            $errorElement = jQuery__default["default"]("<".concat(settings.error_tag, ">"), {
              class: settings.error_class,
              text: message
            });
            $wrapperElement.append($errorElement);
          }

          $wrapperElement.addClass(settings.wrapper_error_class);
          $errorElement.text(message);
        },
        remove: function remove($element, settings) {
          var $wrapperElement = $element.closest("".concat(settings.wrapper_tag, ".").concat(settings.wrapper_class.replace(/ /g, '.'), ".").concat(settings.wrapper_error_class));
          var $errorElement = $wrapperElement.find("".concat(settings.error_tag, ".").concat(settings.error_class.replace(/ /g, '.')));
          $wrapperElement.removeClass(settings.wrapper_error_class);
          $errorElement.remove();
        }
      }
    }
  };

}));
