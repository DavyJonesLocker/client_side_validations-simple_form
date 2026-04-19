var currentFormBuilder
var wrappers = ['horizontal_form', 'vertical_form', 'inline_form']

QUnit.module('Validate SimpleForm Bootstrap 5', {
  before: function () {
    currentFormBuilder = window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder']
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = BS4_FORM_BUILDER
  },

  after: function () {
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = currentFormBuilder
  },

  beforeEach: function () {
    var fixture = document.getElementById('qunit-fixture')
    var form = document.createElement('form')
    var nameGroup = document.createElement('div')
    var nameLabel = document.createElement('label')
    var nameInput = document.createElement('input')
    var passwordGroup = document.createElement('div')
    var passwordLabel = document.createElement('label')
    var passwordInput = document.createElement('input')
    var passwordHelp = document.createElement('div')
    var usernameGroup = document.createElement('div')
    var usernameLabel = document.createElement('label')
    var inputGroup = document.createElement('div')
    var inputGroupText = document.createElement('span')
    var usernameInput = document.createElement('input')

    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: null,
        error_tag: 'div',
        wrapper_error_class: 'form-group-invalid',
        wrapper_tag: 'div',
        wrapper_class: 'mb-3'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', with: { options: 'g', source: '\\d+' } }] },
        'user[username]': { presence: [{ message: 'must be present' }] },
        'user[password]': { presence: [{ message: 'must be present' }] }
      }
    }

    form.action = '/users'
    form.dataset.clientSideValidations = JSON.stringify(dataCsv)
    form.method = 'post'
    form.id = 'new_user'

    nameGroup.className = 'mb-3'
    nameLabel.htmlFor = 'user_name'
    nameLabel.className = 'string form-label'
    nameLabel.textContent = 'Name'
    nameInput.className = 'form-control'
    nameInput.name = 'user[name]'
    nameInput.id = 'user_name'
    nameInput.type = 'text'

    passwordGroup.className = 'mb-3'
    passwordLabel.htmlFor = 'user_password'
    passwordLabel.className = 'string form-label'
    passwordLabel.textContent = 'Password'
    passwordInput.className = 'form-control'
    passwordInput.name = 'user[password]'
    passwordInput.id = 'user_password'
    passwordInput.type = 'password'
    passwordHelp.className = 'form-text'
    passwordHelp.textContent = 'Minimum 8 characters'

    usernameGroup.className = 'mb-3'
    usernameLabel.htmlFor = 'user_username'
    usernameLabel.className = 'string form-label'
    usernameLabel.textContent = 'Username'
    inputGroup.className = 'input-group'
    inputGroupText.className = 'input-group-text'
    inputGroupText.textContent = '@'
    usernameInput.className = 'form-control'
    usernameInput.name = 'user[username]'
    usernameInput.id = 'user_username'
    usernameInput.type = 'text'

    nameGroup.appendChild(nameLabel)
    nameGroup.appendChild(nameInput)

    passwordGroup.appendChild(passwordLabel)
    passwordGroup.appendChild(passwordInput)
    passwordGroup.appendChild(passwordHelp)

    inputGroup.appendChild(inputGroupText)
    inputGroup.appendChild(usernameInput)
    usernameGroup.appendChild(usernameLabel)
    usernameGroup.appendChild(inputGroup)

    form.appendChild(nameGroup)
    form.appendChild(passwordGroup)
    form.appendChild(usernameGroup)
    fixture.appendChild(form)

    ClientSideValidations.validate(form)
  },

  afterEach: function () {
    document.getElementById('qunit-fixture').replaceChildren()
  }
})

for (const wrapper of wrappers) {
  QUnit.test(wrapper + ' - Validate error attaching and detaching', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_name')
    var label = form.querySelector('label[for="user_name"]')
    var wrapperElement = input.parentElement

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.ok(wrapperElement.classList.contains('form-group-invalid'))
    assert.ok(label.parentElement.classList.contains('form-group-invalid'))
    assert.ok(wrapperElement.querySelector('div.invalid-feedback').textContent.includes('must be present'))

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.ok(wrapperElement.classList.contains('form-group-invalid'))
    assert.ok(wrapperElement.querySelector('div.invalid-feedback').textContent.includes('is invalid'))
    assert.ok(input.classList.contains('is-invalid'))

    input.value = '123'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.notOk(wrapperElement.classList.contains('form-group-invalid'))
    assert.notOk(wrapperElement.querySelector('div.invalid-feedback'))
    assert.notOk(input.classList.contains('is-invalid'))
  })

  QUnit.test(wrapper + ' - Validate pre-existing error blocks are re-used', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_name')
    var label = form.querySelector('label[for="user_name"]')
    var wrapperElement = input.parentElement
    var errorElement = document.createElement('div')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    errorElement.className = 'invalid-feedback'
    errorElement.textContent = 'Error from Server'
    wrapperElement.appendChild(errorElement)

    assert.ok(wrapperElement.querySelector('div.invalid-feedback').textContent.includes('Error from Server'))

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))

    assert.ok(wrapperElement.classList.contains('form-group-invalid'))
    assert.ok(label.parentElement.classList.contains('form-group-invalid'))
    assert.equal(wrapperElement.querySelectorAll('div.invalid-feedback').length, 1)
    assert.equal(form.querySelectorAll('div.invalid-feedback').length, 1)
    assert.ok(wrapperElement.querySelector('div.invalid-feedback').textContent.includes('is invalid'))
  })

  QUnit.test(wrapper + ' - Validate input-group', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_username')
    var inputGroup = input.closest('.input-group')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.equal(inputGroup.querySelectorAll('.input-group-text .invalid-feedback').length, 0)
    assert.equal(inputGroup.querySelectorAll('div.invalid-feedback').length, 1)

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.equal(inputGroup.querySelectorAll('div.invalid-feedback').length, 0)
  })

  QUnit.test(wrapper + ' - Inserts before form texts', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_password')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.ok(input.parentElement.querySelector('.invalid-feedback + .form-text'))
  })
}
