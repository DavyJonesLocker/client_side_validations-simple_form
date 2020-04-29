import $ from 'jquery'
import ClientSideValidations from '@client-side-validations/client-side-validations'
import './validator_overrides/index'

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function (element, settings, message) {
    this.wrapper(this.wrapperName(element, settings)).add.call(this, element, settings, message)
  },
  remove: function (element, settings) {
    this.wrapper(this.wrapperName(element, settings)).remove.call(this, element, settings)
  },
  wrapper: function (name) {
    return this.wrappers[name] || this.wrappers.default
  },
  wrapperName: function (element, settings) {
    return element.data('clientSideValidationsWrapper') || settings.wrapper
  },

  wrappers: {
    default: {
      add (element, settings, message) {
        const wrapperElement = element.parent()
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback')

        if (!errorElement.length) {
          errorElement = $('<' + settings.error_tag + '>', { class: 'invalid-feedback', text: message })
          wrapperElement.append(errorElement)
        }

        wrapperElement.addClass(settings.wrapper_error_class)
        element.addClass('is-invalid')
        errorElement.text(message)
      },

      remove (element, settings) {
        const wrapperElement = element.parent()
        const errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback')

        wrapperElement.removeClass(settings.wrapper_error_class)
        element.removeClass('is-invalid')
        errorElement.remove()
      }
    },
    get horizontal_collection () {
      return this.vertical_collection
    },
    vertical_collection: {
      add (element, settings, message) {
        const wrapperElement = element.closest('.' + settings.wrapper_class.replace(/ /g, '.'))
        var errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback')

        if (!errorElement.length) {
          errorElement = $('<' + settings.error_tag + '>', { class: 'invalid-feedback d-block', text: message })
          element.closest('.form-check').parent().children('.form-check:last').after(errorElement)
          element.closest('.form-check').parent().children('.form-check:last').after(errorElement)
        }

        wrapperElement.addClass(settings.wrapper_error_class)
        wrapperElement.find('input:visible').addClass('is-invalid')
        errorElement.text(message)
      },
      remove (element, settings) {
        const wrapperElement = element.closest('.' + settings.wrapper_class.replace(/ /g, '.'))
        const errorElement = wrapperElement.find(settings.error_tag + '.invalid-feedback')

        wrapperElement.removeClass(settings.wrapper_error_class)
        errorElement.remove()
        wrapperElement.find('input:visible').removeClass('is-invalid')
      }

    }
  }
}
