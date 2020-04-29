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

  for (const eventName in eventsToBind) {
    const eventFunction = eventsToBind[eventName]

    $input.filter(':radio').each(function () {
      return $(this).attr('data-validate', true)
    }).on(eventName, eventFunction)
  }
}
