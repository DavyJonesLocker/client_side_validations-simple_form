###!
 * Client Side Validations - SimpleForm - v<%= ClientSideValidations::SimpleForm::VERSION %> (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) <%= DateTime.now.year %> Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
###

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] =
  add: (element, settings, message) ->
    @wrapper(settings.wrapper).add.call(@, element, settings, message)
  remove: (element, settings) ->
    @wrapper(settings.wrapper).remove.call(@, element, settings)
  wrapper: (name) ->
    @wrappers[name] || @wrappers.default

  wrappers:
    default:
      add: (element, settings, message) ->
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_class.replace(/\ /g, '.')}")
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class.replace(/\ /g, '.')}")
        unless errorElement.length
          errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
          wrapper.append(errorElement)
        wrapper.addClass(settings.wrapper_error_class)
        errorElement.text(message)
      remove: (element, settings) ->
        wrapper = element.closest("#{settings.wrapper_tag}.#{settings.wrapper_class.replace(/\ /g, '.')}.#{settings.wrapper_error_class}")
        errorElement = wrapper.find("#{settings.error_tag}.#{settings.error_class.replace(/\ /g, '.')}")
        wrapper.removeClass(settings.wrapper_error_class)
        errorElement.remove()
