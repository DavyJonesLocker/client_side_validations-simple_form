var currentFormBuilder

QUnit.module('Validate SimpleForm Bootstrap', {
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
    var formInputs = document.createElement('div')
    var nameGroup = document.createElement('div')
    var nameLabel = document.createElement('label')
    var nameControls = document.createElement('div')
    var nameInput = document.createElement('input')
    var usernameGroup = document.createElement('div')
    var usernameLabel = document.createElement('label')
    var inputGroup = document.createElement('div')
    var inputGroupAddon = document.createElement('span')
    var usernameInput = document.createElement('input')

    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: 'help-inline',
        error_tag: 'span',
        wrapper_error_class: 'error',
        wrapper_tag: 'div',
        wrapper_class: 'control-group control-group-2 control-group-3',
        wrapper: 'bootstrap'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', with: { options: 'g', source: '\\d+' } }] },
        'user[username]': { presence: [{ message: 'must be present' }] }
      }
    }

    form.action = '/users'
    form.dataset.clientSideValidations = JSON.stringify(dataCsv)
    form.method = 'post'
    form.id = 'new_user'

    formInputs.className = 'form-inputs'

    nameGroup.className = 'control-group control-group-2 control-group-3 control-group-user-name'
    nameLabel.htmlFor = 'user_name'
    nameLabel.className = 'string control-label'
    nameLabel.textContent = 'Name'
    nameControls.className = 'controls'
    nameInput.name = 'user[name]'
    nameInput.id = 'user_name'
    nameInput.type = 'text'

    usernameGroup.className = 'control-group control-group-2 control-group-3 control-group-user-username'
    usernameLabel.htmlFor = 'user_username'
    usernameLabel.className = 'string control-label'
    usernameLabel.textContent = 'Username'
    inputGroup.className = 'input-group'
    inputGroupAddon.className = 'input-group-addon'
    inputGroupAddon.textContent = '@'
    usernameInput.name = 'user[username]'
    usernameInput.id = 'user_username'
    usernameInput.type = 'text'

    nameControls.appendChild(nameInput)
    nameGroup.appendChild(nameLabel)
    nameGroup.appendChild(nameControls)

    inputGroup.appendChild(inputGroupAddon)
    inputGroup.appendChild(usernameInput)
    usernameGroup.appendChild(usernameLabel)
    usernameGroup.appendChild(inputGroup)

    formInputs.appendChild(nameGroup)
    formInputs.appendChild(usernameGroup)
    form.appendChild(formInputs)
    fixture.appendChild(form)

    ClientSideValidations.validate(form)
  },

  afterEach: function () {
    document.getElementById('qunit-fixture').replaceChildren()
  }
})

var wrappers = ['horizontal_form', 'vertical_form', 'inline_form']

for (const wrapper of wrappers) {
  QUnit.test(wrapper + ' - Validate error attaching and detaching', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_name')
    var label = form.querySelector('label[for="user_name"]')
    var wrapperElement = input.closest('.control-group-user-name')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.ok(wrapperElement.classList.contains('error'))
    assert.ok(label.parentElement.classList.contains('error'))
    assert.ok(wrapperElement.querySelector('span.help-inline').textContent.includes('must be present'))

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.ok(wrapperElement.classList.contains('error'))
    assert.ok(wrapperElement.querySelector('span.help-inline').textContent.includes('is invalid'))
    assert.ok(label.parentElement.classList.contains('error'))

    input.value = '123'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.notOk(wrapperElement.classList.contains('error'))
    assert.notOk(wrapperElement.querySelector('span.help-inline'))
    assert.notOk(label.parentElement.classList.contains('error'))
  })

  QUnit.test(wrapper + ' - Validate pre-existing error blocks are re-used', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_name')
    var label = form.querySelector('label[for="user_name"]')
    var wrapperElement = input.closest('.control-group-user-name')
    var errorElement = document.createElement('span')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    errorElement.className = 'help-inline'
    errorElement.textContent = 'Error from Server'
    input.parentElement.appendChild(errorElement)

    assert.ok(input.parentElement.querySelector('span.help-inline').textContent.includes('Error from Server'))

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))

    assert.ok(wrapperElement.classList.contains('error'))
    assert.ok(label.parentElement.classList.contains('error'))
    assert.equal(wrapperElement.querySelectorAll('span.help-inline').length, 1)
    assert.equal(form.querySelectorAll('span.help-inline').length, 1)
    assert.ok(wrapperElement.querySelector('span.help-inline').textContent.includes('is invalid'))
  })

  QUnit.test(wrapper + ' - Validate input-group', function (assert) {
    var form = document.getElementById('new_user')
    var input = document.getElementById('user_username')
    var wrapperElement = input.closest('.control-group-user-username')
    var inputGroup = input.closest('.input-group')

    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.equal(inputGroup.querySelectorAll('span.help-inline').length, 0)
    assert.equal(wrapperElement.querySelectorAll('span.help-inline').length, 1)

    input.value = 'abc'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    input.dispatchEvent(new Event('focusout', { bubbles: true }))
    assert.equal(wrapperElement.querySelectorAll('span.help-inline').length, 0)
  })
}
