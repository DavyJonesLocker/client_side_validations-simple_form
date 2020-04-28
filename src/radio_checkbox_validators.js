import ClientSideValidations from '@client-side-validations/client-side-validations'

const originalPresenceValidator = ClientSideValidations.validators.local.presence

function checkedCheckboxesCount (element, formSettings) {
  const wrapperClass = formSettings.html_settings.wrapper_class

  return element.closest(`.${wrapperClass.replace(/ /g, '.')}`).find('input[type="checkbox"]:checked').length
}

ClientSideValidations.validators.local.presence = function (element, options) {
  if (element.attr('type') === 'checkbox') {
    const formSettings = element.closest('form[data-client-side-validations]').data('clientSideValidations')

    if (checkedCheckboxesCount(element, formSettings) === 0) {
      return options.message
    }
  } else {
    return originalPresenceValidator(element, options)
  }
}
