import jQuery from 'jquery'
import ClientSideValidations from '@client-side-validations/client-side-validations'

ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
  add: function ($element, settings, message) {
    this.wrapper(settings.wrapper).add.call(this, $element, settings, message)
  },
  remove: function ($element, settings) {
    this.wrapper(settings.wrapper).remove.call(this, $element, settings)
  },
  wrapper: function (name) {
    return this.wrappers[name] || this.wrappers.default
  },

  wrappers: {
    default: {
      add ($element, settings, message) {
        const $wrapperElement = $element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, '.')}`)
        let $errorElement = $wrapperElement.find(`${settings.error_tag}.${settings.error_class.replace(/ /g, '.')}`)

        if (!$errorElement.length) {
          $errorElement = jQuery(`<${settings.error_tag}>`, { class: settings.error_class, text: message })
          $wrapperElement.append($errorElement)
        }

        $wrapperElement.addClass(settings.wrapper_error_class)
        $errorElement.text(message)
      },

      remove ($element, settings) {
        const $wrapperElement = $element.closest(`${settings.wrapper_tag}.${settings.wrapper_class.replace(/ /g, '.')}.${settings.wrapper_error_class}`)
        const $errorElement = $wrapperElement.find(`${settings.error_tag}.${settings.error_class.replace(/ /g, '.')}`)

        $wrapperElement.removeClass(settings.wrapper_error_class)
        $errorElement.remove()
      }
    }
  }
}
