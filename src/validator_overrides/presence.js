import ClientSideValidations from '@client-side-validations/client-side-validations'
import { checkedCheckboxesCount } from './helper'

const originalPresenceValidator = ClientSideValidations.validators.local.presence

ClientSideValidations.validators.local.presence = function (element, options) {
  if (element.attr('type') === 'checkbox') {
    if (checkedCheckboxesCount(element) === 0) {
      return options.message
    }
  } else {
    return originalPresenceValidator(element, options)
  }
}
