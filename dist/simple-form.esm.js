/*!
 * Client Side Validations Simple Form JS (Default) - v0.1.2 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2020 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */

import $ from 'jquery';
import ClientSideValidations from '@client-side-validations/client-side-validations';

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
    }
  }
};
