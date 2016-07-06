###!
 * Client Side Validations - SimpleForm - v<%= ClientSideValidations::SimpleForm::VERSION %> (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) <%= DateTime.now.year %> Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
###

join_tag_and_classes = (tag, classes) ->
  tag + '.' + classes.filter(Boolean).map((cls) -> cls.replace(/\ /g, '.')).join('.')

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
        fieldWrapper = element.closest(join_tag_and_classes(settings.field_tag, [settings.field_class]))
        if settings.error_parent_tag
          errorParentSelector = join_tag_and_classes(settings.error_parent_tag, [settings.error_parent_class])
          errorParent = fieldWrapper.filter(errorParentSelector)
          errorParent = fieldWrapper.find(errorParentSelector) unless errorParent.length 
          errorElement = errorParent.find(join_tag_and_classes(settings.error_tag, [settings.error_class]))
          if errorElement.length
            errorElement.text(message)
          else
            errorElement = $("<#{settings.error_tag}/>", { class: settings.error_class, text: message })
            errorParent.append(errorElement)
          errorParent.addClass(settings.error_parent_with_errors_class)
        fieldWrapper.addClass(settings.field_with_errors_class)
      remove: (element, settings) ->
        fieldWrapper = element.closest(join_tag_and_classes(settings.field_tag, [settings.field_class, settings.field_with_errors_class]))
        if settings.error_parent_tag
          errorParentSelector = join_tag_and_classes(settings.error_parent_tag, [settings.error_parent_class, settings.error_parent_with_errors_class])
          errorParent = fieldWrapper.filter(errorParentSelector)
          errorParent = fieldWrapper.find(errorParentSelector) unless errorParent.length
          errorElement = errorParent.find(join_tag_and_classes(settings.error_tag, [settings.error_class]))
          errorParent.removeClass(settings.error_parent_with_errors_class)
          errorElement.remove()
        fieldWrapper.removeClass(settings.field_with_errors_class)
