QUnit.module('Validate SimpleForm', {
  before: function () {
    currentFormBuilder = window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder']
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = DEFAULT_FORM_BUILDER
  },

  after: function () {
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = currentFormBuilder
  },

  beforeEach: function () {
    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: 'error',
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
      .append($('<form>', {
        action: '/users',
        'data-client-side-validations': JSON.stringify(dataCsv),
        method: 'post',
        id: 'new_user'
      }))
      .find('form')
      .append($('<div class="input">'))
      .find('div')
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

QUnit.test("Display error messages when wrapper and error tags have more than two css classes", function (assert) {
  dataCsv = {
    html_settings: {
      type: 'SimpleForm::FormBuilder',
      error_class: 'error error_class_one error_class_two',
      error_tag: 'span',
      wrapper_error_class: 'field_with_errors',
      wrapper_tag: 'div',
      wrapper_class: 'input wrapper_class_one wrapper_class_two',
      wrapper: 'default'
    },
    validators: {
      'user_2[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', 'with': { options: 'g', source: '\\d+' } }] }
    }
  }

  $('#qunit-fixture')
    .html('')
    .append($('<form>', {
      action: '/users',
      'data-client-side-validations': JSON.stringify(dataCsv),
      method: 'post',
      id: 'new_user_2'
    }))
    .find('form')
    .append($('<div class="input wrapper_class_one wrapper_class_two">'))
    .find('div')
    .append($('<input />', {
      name: 'user_2[name]',
      id: 'user_2_name',
      type: 'text'
    }))
    .append($('<label for="user_2_name">Name</label>'))
  $('form#new_user_2').validate()

  var form = $('form#new_user_2')
  var input = form.find('input#user_2_name')

  input.val('')
  input.trigger('focusout')

  assert.ok(input.parent().hasClass('field_with_errors'))

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')

  assert.notOk(input.parent().hasClass('field_with_errors'))
  assert.notOk(form.find('span.error').length)
})
