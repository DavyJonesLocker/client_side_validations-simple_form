import ClientSideValidations from '@client-side-validations/client-side-validations'
import { checkedCheckboxesCount } from './helper'

const originalLengthValidator = ClientSideValidations.validators.local.length

const VALIDATIONS = {
  is: (a, b) => {
    return (a === parseInt(b, 10))
  },
  minimum: (a, b) => {
    return (a >= parseInt(b, 10))
  },
  maximum: (a, b) => {
    return (a <= parseInt(b, 10))
  }
}

const runValidations = (valueLength, options) => {
  for (const validation in VALIDATIONS) {
    const validationOption = options[validation]
    const validationFunction = VALIDATIONS[validation]

    if (validationOption && !validationFunction(valueLength, validationOption)) {
      return options.messages[validation]
    }
  }
}

ClientSideValidations.validators.local.length = (element, options) => {
  if (element.attr('type') === 'checkbox') {
    const count = checkedCheckboxesCount(element)
    if (options.allow_blank && count === 0) {
      return
    }
    return runValidations(count, options)
  } else {
    return originalLengthValidator(element, options)
  }
}
