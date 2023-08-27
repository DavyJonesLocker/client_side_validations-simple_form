import ClientSideValidations from '@client-side-validations/client-side-validations'
import { addClass, removeClass } from './utils'

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function ($element, settings, message) {
    this.wrapper(settings.wrapper).add.call(this, $element[0], settings, message)
  },
  remove: function ($element, settings) {
    this.wrapper(settings.wrapper).remove.call(this, $element[0], settings)
  },
  wrapper: function (name) {
    return this.wrappers[name] || this.wrappers.default
  },

  wrappers: {
    default: {
      add (element, settings, message) {
        const wrapperElement = element.parentElement
        let errorElement = wrapperElement.querySelector(`${settings.error_tag}.invalid-feedback`)

        if (!errorElement) {
          const formTextElement = wrapperElement.querySelector('.form-text')

          errorElement = document.createElement(settings.error_tag)
          addClass(errorElement, 'invalid-feedback')
          errorElement.textContent = message

          if (formTextElement) {
            formTextElement.before(errorElement)
          } else {
            wrapperElement.appendChild(errorElement)
          }
        }

        addClass(wrapperElement, settings.wrapper_error_class)
        addClass(element, 'is-invalid')

        errorElement.textContent = message
      },

      remove (element, settings) {
        const wrapperElement = element.parentElement
        const errorElement = wrapperElement.querySelector(`${settings.error_tag}.invalid-feedback`)

        removeClass(wrapperElement, settings.wrapper_error_class)
        removeClass(element, 'is-invalid')

        if (errorElement) {
          errorElement.remove()
        }
      }
    }
  }
}
