
/*!
 * Client Side Validations - SimpleForm - v3.2.3 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2016 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
 */

(function() {
  var join_tag_and_classes;

  join_tag_and_classes = function(tag, classes) {
    return tag + '.' + classes.filter(Boolean).map(function(cls) {
      return cls.replace(/\ /g, '.');
    }).join('.');
  };

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
          var errorElement, errorParent, fieldWrapper;
          fieldWrapper = element.closest(join_tag_and_classes(settings.field_tag, [settings.field_class]));
          if (settings.error_parent_tag) {
            errorParent = element.closest(join_tag_and_classes(settings.error_parent_tag, [settings.error_parent_class]));
            errorElement = errorParent.find(join_tag_and_classes(settings.error_tag, [settings.error_class]));
            if (errorElement.length) {
              errorElement.text(message);
            } else {
              errorElement = $("<" + settings.error_tag + "/>", {
                "class": settings.error_class,
                text: message
              });
              errorParent.append(errorElement);
            }
            errorParent.addClass(settings.error_parent_with_errors_class);
          }
          return fieldWrapper.addClass(settings.field_with_errors_class);
        },
        remove: function(element, settings) {
          var errorElement, errorParent, fieldWrapper;
          fieldWrapper = element.closest(join_tag_and_classes(settings.field_tag, [settings.field_class, settings.field_with_errors_class]));
          if (settings.error_parent_tag) {
            errorParent = element.closest(join_tag_and_classes(settings.error_parent_tag, [settings.error_parent_class, settings.error_parent_with_errors_class]));
            errorElement = errorParent.find(join_tag_and_classes(settings.error_tag, [settings.error_class]));
            errorParent.removeClass(settings.error_parent_with_errors_class);
            errorElement.remove();
          }
          return fieldWrapper.removeClass(settings.field_with_errors_class);
        }
      }
    }
  };

}).call(this);
