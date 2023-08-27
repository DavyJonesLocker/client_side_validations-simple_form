/*!
 * Client Side Validations Simple Form JS (Default) - v0.4.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2023 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

import ClientSideValidations from '@client-side-validations/client-side-validations';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
        var wrapperElement = element.closest("".concat(settings.wrapper_tag, ".").concat(settings.wrapper_class.replace(/ /g, '.')));
        var errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".").concat(settings.error_class.replace(/ /g, '.')));
        if (!errorElement) {
          errorElement = document.createElement(settings.error_tag);
          addClass(errorElement, settings.error_class);
          errorElement.textContent = message;
          wrapperElement.appendChild(errorElement);
        }
        addClass(wrapperElement, settings.wrapper_error_class);
        errorElement.textContent = message;
      },
      remove: function remove(element, settings) {
        var wrapperElement = element.closest("".concat(settings.wrapper_tag, ".").concat(settings.wrapper_class.replace(/ /g, '.')));
        var errorElement = wrapperElement.querySelector("".concat(settings.error_tag, ".").concat(settings.error_class.replace(/ /g, '.')));
        removeClass(wrapperElement, settings.wrapper_error_class);
        if (errorElement) {
          errorElement.remove();
        }
      }
    }
  }
};
