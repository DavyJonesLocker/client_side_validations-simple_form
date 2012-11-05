###
  Client Side Validations - SimpleForm - v<%= ClientSideValidations::SimpleForm::VERSION %>
  https://github.com/dockyard/client_side_validations-simple_form

  Copyright (c) <%= DateTime.now.year %> DockYard, LLC
  Licensed under the MIT license
  http://www.opensource.org/licenses/mit-license.php
###

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] =
  add: (element, settings, message) ->
    @wrappers[settings.wrapper].add.call(@, element, settings, message)
  remove: (element, settings) ->
    @wrappers[settings.wrapper].remove.call(@, element, settings)

  wrappers:
    default:
      add: (element, settings, message) ->
        if element.data('valid') != false
          wrapper = element.closest(settings.wrapper_tag)
          wrapper.addClass(settings.wrapper_error_class)
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapper.append(errorElement)
        else
          element.parent().find("#{settings.error_tag}.#{settings.error_class}").text(message)
      remove: (element, settings) ->
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_error_class}")
        wrapper.removeClass(settings.wrapper_error_class)
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class}")
        errorElement.remove()

    bootstrap:
      add: (element, settings, message) ->
        errorElement = element.parent().find "#{settings.error_tag}.#{settings.error_class}"
        if not errorElement[0]?
          wrapper_tag_element = element.closest(settings.wrapper_tag)
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapper_tag_element.append(errorElement)
        wrapper_class_element = element.closest(".#{settings.wrapper_class}");
        wrapper_class_element.addClass(settings.wrapper_error_class)
        errorElement.text message
      remove: (element, settings) ->
        wrapper_class_element = element.closest(".#{settings.wrapper_class}.#{settings.wrapper_error_class}")
        wrapper_tag_element = element.closest(settings.wrapper_tag)
        wrapper_class_element.removeClass(settings.wrapper_error_class)
        errorElement = wrapper_tag_element.find("#{settings.error_tag}.#{settings.error_class}")
        errorElement.remove()
