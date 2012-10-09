
/*
  Client Side Validations - SimpleForm - v2.0.0.rc.2
  https://github.com/dockyard/client_side_validations-simple_form

  Copyright (c) 2012 DockYard, LLC
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
          if (element.data('valid') !== false) {
            wrapper = element.closest(settings.wrapper_tag);
            wrapper.addClass(settings.wrapper_error_class);
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": settings.error_class,
              text: message
            });
            return wrapper.append(errorElement);
          } else {
            return element.parent().find("" + settings.error_tag + "." + settings.error_class).text(message);
          }
        },
        remove: function(element, settings) {
          var errorElement, wrapper;
          wrapper = element.closest("" + settings.wrapper_tag + "." + settings.wrapper_error_class);
          wrapper.removeClass(settings.wrapper_error_class);
          errorElement = wrapper.find("" + settings.error_tag + "." + settings.error_class);
          return errorElement.remove();
        }
      },
      bootstrap: {
        add: function(element, settings, message) {
          var errorElement, wrapper_class_element, wrapper_tag_element;
          if (element.data('valid') !== false) {
            wrapper_class_element = element.closest("." + settings.wrapper_class);
            wrapper_tag_element = element.closest(settings.wrapper_tag);
            wrapper_class_element.addClass(settings.wrapper_error_class);
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": settings.error_class,
              text: message
            });
            return wrapper_tag_element.append(errorElement);
          } else {
            return element.parent().find("" + settings.error_tag + "." + settings.error_class).text(message);
          }
        },
        remove: function(element, settings) {
          var errorElement, wrapper_class_element, wrapper_tag_element;
          wrapper_class_element = element.closest("." + settings.wrapper_class + "." + settings.wrapper_error_class);
          wrapper_tag_element = element.closest(settings.wrapper_tag);
          wrapper_class_element.removeClass(settings.wrapper_error_class);
          errorElement = wrapper_tag_element.find("" + settings.error_tag + "." + settings.error_class);
          return errorElement.remove();
        }
      }
    }
  };

}).call(this);
