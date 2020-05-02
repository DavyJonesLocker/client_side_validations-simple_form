
export function checkedInputsCount (element) {
  const formSettings = element.closest('form[data-client-side-validations]').data('clientSideValidations')
  const wrapperClass = formSettings.html_settings.wrapper_class

  return element.closest(`.${wrapperClass.replace(/ /g, '.')}`).find('input:checked').length
}
