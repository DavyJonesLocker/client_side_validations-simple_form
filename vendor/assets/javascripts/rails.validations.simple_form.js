
/*!
 * Client Side Validations - SimpleForm - v3.2.1 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2016 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
 */

(function() {
  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
    add: function(element, settings, message) {
      return this.wrappers[settings.wrapper].add.call(this, element, settings, message);
    },
    remove: function(element, settings) {
      return this.wrappers[settings.wrapper].remove.call(this, element, settings);
    },
    wrappers: {
      "default": {
        add: function(element, settings, message) {
          var errorElement, wrapper;
          wrapper = element.closest(settings.wrapper_tag + "." + (settings.wrapper_class.replace(/\ /g, '.')));
          errorElement = wrapper.find(settings.error_tag + "." + settings.error_class);
          if (!errorElement.length) {
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": settings.error_class,
              text: message
            });
            wrapper.append(errorElement);
          }
          wrapper.addClass(settings.wrapper_error_class);
          return errorElement.text(message);
        },
        remove: function(element, settings) {
          var errorElement, wrapper;
          wrapper = element.closest(settings.wrapper_tag + "." + (settings.wrapper_class.replace(/\ /g, '.')) + "." + settings.wrapper_error_class);
          errorElement = wrapper.find(settings.error_tag + "." + settings.error_class);
          wrapper.removeClass(settings.wrapper_error_class);
          return errorElement.remove();
        }
      }
    }
  };

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.vertical_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.horizontal_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.inline_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

}).call(this);
