###!
 * Client Side Validations - SimpleForm - v<%= ClientSideValidations::SimpleForm::VERSION %> (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) <%= DateTime.now.year %> Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
###

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] =
  add: (element, settings, message) ->
    @wrappers[settings.wrapper].add.call(@, element, settings, message)
  remove: (element, settings) ->
    @wrappers[settings.wrapper].remove.call(@, element, settings)

  wrappers:
    default:
      add: (element, settings, message) ->
        errorElement = element.parent().find "#{settings.error_tag}.#{settings.error_class}"
        wrapper = element.closest(settings.wrapper_tag)
        if not errorElement[0]?
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapper.append(errorElement)
        wrapper.addClass(settings.wrapper_error_class)
        errorElement.text(message)
      remove: (element, settings) ->
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_error_class}")
        wrapper.removeClass(settings.wrapper_error_class)
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class}")
        errorElement.remove()

    bootstrap:
      add: (element, settings, message) ->
        errorElement = element.closest(settings.wrapper_tag).find "#{settings.error_tag}.#{settings.error_class}"
        if not errorElement[0]?
          wrapperTagElement = element.closest(settings.wrapper_tag)
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapperTagElement.append(errorElement)
        wrapperClassElement = element.closest(".#{settings.wrapper_class.replace(/\ /g, '.')}");
        wrapperClassElement.addClass(settings.wrapper_error_class)
        errorElement.text(message)
      remove: (element, settings) ->
        wrapperClassElement = element.closest(".#{settings.wrapper_class.replace(/\ /g, '.')}.#{settings.wrapper_error_class}")
        wrapperClassElement.removeClass(settings.wrapper_error_class)
        wrapperTagElement = element.closest(settings.wrapper_tag)
        errorElement = wrapperTagElement.find("#{settings.error_tag}.#{settings.error_class}")
        errorElement.remove()

# Alias simple_form's default bootstrap wrappers to bootstrap
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.vertical_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.horizontal_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.inline_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.bootstrap
