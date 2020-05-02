import './length'
import './presence'
import $ from 'jquery'

// main CSV enabler doesnt attach validation events to radio buttons.. I do it here
// It could be fixed in main CSV if radio_buttons validations are needed there and
// in that case we may removed it from here
const originalInputEnabler = window.ClientSideValidations.enablers.input

window.ClientSideValidations.enablers.input = function (input) {
  originalInputEnabler(input)

  const $input = $(input)
  const form = input.form
  const eventsToBind = window.ClientSideValidations.eventsToBind.input(form)
  const wrapperClass = form.ClientSideValidations.settings.html_settings.wrapper_class

  for (const eventName in eventsToBind) {
    const eventFunction = eventsToBind[eventName]

    $input.filter(':radio').each(function () {
      return $(this).attr('data-validate', true)
    }).on(eventName, eventFunction)
  }

  $input.filter(':radio').on('change.ClientSideValidations', function () {
    $(this).isValid(form.ClientSideValidations.settings.validators)
  })

  // when we change radio/check mark also all sibling radios/checkboxes as changed to revalidate on submit
  $input.filter(':radio,:checkbox').on('change.ClientSideValidations', function () {
    $(this).closest(`.${wrapperClass.replace(/ /g, '.')}`).find(':radio,:checkbox').data('changed', true)
  })
}
