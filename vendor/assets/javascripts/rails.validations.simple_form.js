/*!
 * Client Side Validations - SimpleForm - v2.0.0.beta.2
 * https://github.com/dockyard/client_side_validations-simple_form
 *
 * Copyright (c) 2012 DockYard, LLC
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function(element, settings, message) {
    if (element.data('valid') !== false) {
      var wrapper = element.closest(settings.wrapper_tag);
      wrapper.addClass(settings.wrapper_error_class);
      var errorElement = $('<' + settings.error_tag + ' class="' + settings.error_class + '">' + message + '</' + settings.error_tag + '>');
      wrapper.append(errorElement);
    } else {
      element.parent().find(settings.error_tag + '.' + settings.error_class).text(message);
    }
  },
  remove: function(element, settings) {
    var wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_error_class);
    wrapper.removeClass(settings.wrapper_error_class);
    var errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class);
    errorElement.remove();
  }
}

