
/*!
 * Client Side Validations - SimpleForm (Bootstrap 4) - v6.9.0 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2019 Geremia Taglialatela, Brian Cardarella
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
          var errorElement, wrapperElement;
          wrapperElement = element.parent();
          errorElement = wrapperElement.find(settings.error_tag + ".invalid-feedback");
          if (!errorElement.length) {
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": 'invalid-feedback',
              text: message
            });
            wrapperElement.append(errorElement);
          }
          wrapperElement.addClass(settings.wrapper_error_class);
          element.addClass('is-invalid');
          return errorElement.text(message);
        },
        remove: function(element, settings) {
          var errorElement, wrapperElement;
          wrapperElement = element.parent();
          errorElement = wrapperElement.find(settings.error_tag + ".invalid-feedback");
          wrapperElement.removeClass(settings.wrapper_error_class);
          element.removeClass('is-invalid');
          return errorElement.remove();
        }
      }
    }
  };

}).call(this);
