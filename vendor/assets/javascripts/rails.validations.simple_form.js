
/*
  Client Side Validations - SimpleForm - v3.2.0
  https://github.com/DavyJonesLocker/client_side_validations-simple_form

  Copyright (c) 2015 DockYard, LLC
  Licensed under the MIT license
  http://www.opensource.org/licenses/mit-license.php
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
          errorElement = element.parent().find(settings.error_tag + "." + settings.error_class);
          wrapper = element.closest(settings.wrapper_tag);
          if (errorElement[0] == null) {
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
          wrapper = element.closest(settings.wrapper_tag + "." + settings.wrapper_error_class);
          wrapper.removeClass(settings.wrapper_error_class);
          errorElement = wrapper.find(settings.error_tag + "." + settings.error_class);
          return errorElement.remove();
        }
      },
      bootstrap: {
        add: function(element, settings, message) {
          var errorElement, wrapperClassElement, wrapperTagElement;
          errorElement = element.parent().find(settings.error_tag + "." + settings.error_class);
          if (errorElement[0] == null) {
            wrapperTagElement = element.closest(settings.wrapper_tag);
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": settings.error_class,
              text: message
            });
            wrapperTagElement.append(errorElement);
          }
          wrapperClassElement = element.closest("." + (settings.wrapper_class.replace(/\ /g, '.')));
          wrapperClassElement.addClass(settings.wrapper_error_class);
          return errorElement.text(message);
        },
        remove: function(element, settings) {
          var errorElement, wrapperClassElement, wrapperTagElement;
          wrapperClassElement = element.closest("." + (settings.wrapper_class.replace(/\ /g, '.')) + "." + settings.wrapper_error_class);
          wrapperClassElement.removeClass(settings.wrapper_error_class);
          wrapperTagElement = element.closest(settings.wrapper_tag);
          errorElement = wrapperTagElement.find(settings.error_tag + "." + settings.error_class);
          return errorElement.remove();
        }
      }
    }
  };

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.vertical_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap;

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.horizontal_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap;

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.inline_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap;

}).call(this);
