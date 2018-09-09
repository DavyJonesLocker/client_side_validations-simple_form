###!
 * Client Side Validations - SimpleForm (Bootstrap 4) - v<%= ClientSideValidations::SimpleForm::VERSION %> (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
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
        wrapperElement = element.parent()
        errorElement   = wrapperElement.find("#{settings.error_tag}.invalid-feedback")

        unless errorElement.length
          errorElement = $("<#{settings.error_tag}/>", { class: 'invalid-feedback', text: message })
          wrapperElement.append errorElement

        wrapperElement.addClass settings.wrapper_error_class
        element.addClass 'is-invalid'
        errorElement.text message

      remove: (element, settings) ->
        wrapperElement = element.parent()
        errorElement   = wrapperElement.find("#{settings.error_tag}.invalid-feedback")

        wrapperElement.removeClass settings.wrapper_error_class
        element.removeClass 'is-invalid'
        errorElement.remove()
