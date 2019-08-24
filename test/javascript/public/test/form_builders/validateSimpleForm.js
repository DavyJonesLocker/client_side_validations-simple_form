QUnit.module('Validate SimpleForm', {
  beforeEach: function () {
    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: 'error small',
        error_tag: 'span',
        wrapper_error_class: 'field_with_errors',
        wrapper_tag: 'div',
        wrapper_class: 'input',
        wrapper: 'default'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', 'with': { options: 'g', source: '\\d+' } }] }
      }
    }

    $('#qunit-fixture')
      .append($('<form />', {
        action: '/users',
        'data-client-side-validations': JSON.stringify(dataCsv),
        method: 'post',
        id: 'new_user'
      }))
      .find('form')
      .append($('<div />', {
        class: 'input'
      })).find('div')
      .append($('<input />', {
        name: 'user[name]',
        id: 'user_name',
        type: 'text'
      }))
      .append($('<label for="user_name">Name</label>'))
    $('form#new_user').validate()
  }
})

QUnit.test('Validate error attaching and detaching', function (assert) {
  var form = $('form#new_user'); var input = form.find('input#user_name')
  var label = $('label[for="user_name"]')

  input.trigger('focusout')
  assert.ok(input.parent().hasClass('field_with_errors'))
  assert.ok(label.parent().hasClass('field_with_errors'))
  assert.ok(input.parent().find('span.error:contains("must be present")')[0])

  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  assert.ok(input.parent().hasClass('field_with_errors'))
  assert.ok(label.parent().hasClass('field_with_errors'))
  assert.ok(input.parent().find('span.error:contains("is invalid")')[0])

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')
  assert.notOk(input.parent().hasClass('field_with_errors'))
  assert.notOk(label.parent().hasClass('field_with_errors'))
  assert.notOk(form.find('span.error')[0])
})

QUnit.test('Validate pre-existing error blocks are re-used', function (assert) {
  var form = $('form#new_user'); var input = form.find('input#user_name')
  var label = $('label[for="user_name"]')

  input.parent().append($('<span class="error small">Error from Server</span>'))
  assert.ok(input.parent().find('span.error:contains("Error from Server")')[0])
  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  assert.ok(input.parent().hasClass('field_with_errors'))
  assert.ok(label.parent().hasClass('field_with_errors'))
  assert.ok(input.parent().find('span.error:contains("is invalid")').length === 1)
  assert.ok(form.find('span.error').length === 1)
})
