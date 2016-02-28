###!
 * Client Side Validations - SimpleForm - v<%= ClientSideValidations::SimpleForm::VERSION %> (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) <%= DateTime.now.year %> Geremia Taglialatela, Brian Cardarella
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
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_class.replace(/\ /g, '.')}")
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class}")
        unless errorElement.length
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapper.append(errorElement)
        wrapper.addClass(settings.wrapper_error_class)
        errorElement.text(message)
      remove: (element, settings) ->
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_class.replace(/\ /g, '.')}.#{settings.wrapper_error_class}")
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class}")
        wrapper.removeClass(settings.wrapper_error_class)
        errorElement.remove()

# Alias default wrapper to Bootstrap and Foundation wrappers
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.vertical_form   = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.default
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.horizontal_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.default
ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.inline_form     = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.default
