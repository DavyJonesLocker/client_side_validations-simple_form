import $ from 'jquery'
import ClientSideValidations from '@client-side-validations/client-side-validations'

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function (element, settings, message) {
    this.wrapper(settings.wrapper).add.call(this, element, settings, message)
  },
  remove: function (element, settings) {
    this.wrapper(settings.wrapper).remove.call(this, element, settings)
  },
  wrapper: function (name) {
    return this.wrappers[name] || this.wrappers.default
  },

  wrappers: {
    default: {
      add (element, settings, message) {
        const wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.'))
        let errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class.replace(/ /g, '.'))

        if (!errorElement.length) {
          errorElement = $('<' + settings.error_tag + '/>', { class: settings.error_class, text: message })
          wrapper.append(errorElement)
        }

        wrapper.addClass(settings.wrapper_error_class)
        return errorElement.text(message)
      },

      remove (element, settings) {
        const wrapper = element.closest(settings.wrapper_tag + '.' + settings.wrapper_class.replace(/ /g, '.') + '.' + settings.wrapper_error_class)
        const errorElement = wrapper.find(settings.error_tag + '.' + settings.error_class.replace(/ /g, '.'))

        wrapper.removeClass(settings.wrapper_error_class)
        return errorElement.remove()
      }
    }
  }
}
