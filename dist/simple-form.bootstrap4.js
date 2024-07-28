/*!
 * Client Side Validations Simple Form JS (Bootstrap 4+) - v0.4.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2024 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@client-side-validations/client-side-validations')) :
  typeof define === 'function' && define.amd ? define(['@client-side-validations/client-side-validations'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ClientSideValidations));
})(this, (function (ClientSideValidations) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var addClass = function addClass(element, customClass) {
    if (customClass) {
      var _element$classList;
      (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(customClass.split(' ')));
    }
  };
  var removeClass = function removeClass(element, customClass) {
    if (customClass) {
      var _element$classList2;
      (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(customClass.split(' ')));
    }
  };

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
    add: function add($element, settings, message) {
      this.wrapper(settings.wrapper).add.call(this, $element[0], settings, message);
    },
    remove: function remove($element, settings) {
      this.wrapper(settings.wrapper).remove.call(this, $element[0], settings);
    },
    wrapper: function wrapper(name) {
      return this.wrappers[name] || this.wrappers.default;
    },
    wrappers: {
      default: {
        add: function add(element, settings, message) {
          var wrapperElement = element.parentElement;
          var errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".invalid-feedback"));
          if (!errorElement) {
            var formTextElement = wrapperElement.querySelector('.form-text');
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
        remove: function remove(element, settings) {
          var wrapperElement = element.parentElement;
          var errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".invalid-feedback"));
          removeClass(wrapperElement, settings.wrapper_error_class);
          removeClass(element, 'is-invalid');
          if (errorElement) {
            errorElement.remove();
          }
        }
      }
    }
  };

}));
