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
        const wrapperElement = element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, '.')}`)
        let errorElement = wrapperElement.querySelector(`${settings.error_tag}.${settings.error_class.replace(/ /g, '.')}`)

        if (!errorElement) {
          errorElement = document.createElement(settings.error_tag)
          addClass(errorElement, settings.error_class)
          errorElement.textContent = message

          wrapperElement.appendChild(errorElement)
        }

        addClass(wrapperElement, settings.wrapper_error_class)

        errorElement.textContent = message
      },

      remove (element, settings) {
        const wrapperElement = element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, '.')}`)
        const errorElement = wrapperElement.querySelector(`${settings.error_tag}.${settings.error_class.replace(/ /g, '.')}`)

        removeClass(wrapperElement, settings.wrapper_error_class)

        if (errorElement) {
          errorElement.remove()
        }
      }
    }
  }
}
