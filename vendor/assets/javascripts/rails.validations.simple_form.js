
/*!
 * Client Side Validations - SimpleForm - v6.6.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2018 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
 */

(function() {
  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
    add: function(element, settings, message) {
      return this.wrapper(settings.wrapper).add.call(this, element, settings, message);
    },
    remove: function(element, settings) {
      return this.wrapper(settings.wrapper).remove.call(this, element, settings);
    },
    wrapper: function(name) {
      return this.wrappers[name] || this.wrappers["default"];
    },
    wrappers: {
      "default": {
        add: function(element, settings, message) {
          var errorElement, wrapper;
          wrapper = element.closest(settings.wrapper_tag + "." + (settings.wrapper_class.replace(/\ /g, '.')));
          errorElement = wrapper.find(settings.error_tag + "." + (settings.error_class.replace(/\ /g, '.')));
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
          errorElement = wrapper.find(settings.error_tag + "." + (settings.error_class.replace(/\ /g, '.')));
          wrapper.removeClass(settings.wrapper_error_class);
          return errorElement.remove();
        }
      }
    }
  };

}).call(this);
