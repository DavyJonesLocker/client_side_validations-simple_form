var currentFormBuilder

QUnit.module('Validate SimpleForm', {
  before: function () {
    currentFormBuilder = window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder']
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = DEFAULT_FORM_BUILDER
  },

  after: function () {
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = currentFormBuilder
  },

  beforeEach: function () {
    var fixture = document.getElementById('qunit-fixture')
    var form = document.createElement('form')
    var wrapper = document.createElement('div')
    var input = document.createElement('input')
    var label = document.createElement('label')

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
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', with: { options: 'g', source: '\\d+' } }] }
      }
    }

    form.action = '/users'
    form.dataset.clientSideValidations = JSON.stringify(dataCsv)
    form.method = 'post'
    form.id = 'new_user'

    wrapper.className = 'input'

    input.name = 'user[name]'
    input.id = 'user_name'
    input.type = 'text'

    label.htmlFor = 'user_name'
    label.textContent = 'Name'

    wrapper.appendChild(input)
    wrapper.appendChild(label)
    form.appendChild(wrapper)
    fixture.appendChild(form)

    ClientSideValidations.validate(form)
  },

  afterEach: function () {
    document.getElementById('qunit-fixture').replaceChildren()
  }
})

QUnit.test('Validate error attaching and detaching', function (assert) {
  var form = document.getElementById('new_user')
  var input = document.getElementById('user_name')
  var label = form.querySelector('label[for="user_name"]')

  input.dispatchEvent(new Event('focusout', { bubbles: true }))
  assert.ok(input.parentElement.classList.contains('field_with_errors'))
  assert.ok(label.parentElement.classList.contains('field_with_errors'))
  assert.ok(input.parentElement.querySelector('span.error').textContent.includes('must be present'))

  input.value = 'abc'
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focusout', { bubbles: true }))
  assert.ok(input.parentElement.classList.contains('field_with_errors'))
  assert.ok(label.parentElement.classList.contains('field_with_errors'))
  assert.ok(input.parentElement.querySelector('span.error').textContent.includes('is invalid'))

  input.value = '123'
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focusout', { bubbles: true }))
  assert.notOk(input.parentElement.classList.contains('field_with_errors'))
  assert.notOk(label.parentElement.classList.contains('field_with_errors'))
  assert.notOk(form.querySelector('span.error'))
})

QUnit.test('Validate pre-existing error blocks are re-used', function (assert) {
  var form = document.getElementById('new_user')
  var input = document.getElementById('user_name')
  var label = form.querySelector('label[for="user_name"]')
  var errorElement = document.createElement('span')

  errorElement.className = 'error small'
  errorElement.textContent = 'Error from Server'
  input.parentElement.appendChild(errorElement)

  assert.ok(input.parentElement.querySelector('span.error').textContent.includes('Error from Server'))

  input.value = 'abc'
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focusout', { bubbles: true }))

  assert.ok(input.parentElement.classList.contains('field_with_errors'))
  assert.ok(label.parentElement.classList.contains('field_with_errors'))
  assert.equal(input.parentElement.querySelectorAll('span.error').length, 1)
  assert.equal(form.querySelectorAll('span.error').length, 1)
  assert.ok(input.parentElement.querySelector('span.error').textContent.includes('is invalid'))
})

QUnit.test('Display error messages when wrapper and error tags have more than two css classes', function (assert) {
  var fixture = document.getElementById('qunit-fixture')
  var form = document.createElement('form')
  var wrapper = document.createElement('div')
  var input = document.createElement('input')
  var label = document.createElement('label')

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
      'user_2[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', with: { options: 'g', source: '\\d+' } }] }
    }
  }

  fixture.replaceChildren()

  form.action = '/users'
  form.dataset.clientSideValidations = JSON.stringify(dataCsv)
  form.method = 'post'
  form.id = 'new_user_2'

  wrapper.className = 'input wrapper_class_one wrapper_class_two'

  input.name = 'user_2[name]'
  input.id = 'user_2_name'
  input.type = 'text'

  label.htmlFor = 'user_2_name'
  label.textContent = 'Name'

  wrapper.appendChild(input)
  wrapper.appendChild(label)
  form.appendChild(wrapper)
  fixture.appendChild(form)

  ClientSideValidations.validate(form)

  input.dispatchEvent(new Event('focusout', { bubbles: true }))

  assert.ok(input.parentElement.classList.contains('field_with_errors'))

  input.value = '123'
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focusout', { bubbles: true }))

  assert.notOk(input.parentElement.classList.contains('field_with_errors'))
  assert.notOk(form.querySelector('span.error'))
})
