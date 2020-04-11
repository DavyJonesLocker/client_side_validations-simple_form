QUnit.module('Validate SimpleForm Bootstrap', {
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
        error_class: 'help-inline',
        error_tag: 'span',
        wrapper_error_class: 'error',
        wrapper_tag: 'div',
        wrapper_class: 'control-group control-group-2 control-group-3',
        wrapper: 'bootstrap'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', 'with': { options: 'g', source: '\\d+' } }] },
        'user[username]': { presence: [{ message: 'must be present' }] }
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
      .append($('<div>', {
        'class': 'form-inputs'
      }))
      .find('div')
      .append($('<div>', {
        'class': 'control-group control-group-2 control-group-3 control-group-user-name'
      }))
      .find('div.control-group-user-name')
      .append($('<label for="user_name" class="string control-label">Name</label>'))
      .append($('<div>', {
        'class': 'controls'
      }))
      .find('div')
      .append($('<input />', {
        name: 'user[name]',
        id: 'user_name',
        type: 'text'
      }))
      .append($('<div>', {
        'class': 'control-group control-group-2 control-group-3 control-group-user-username'
      }))
      .find('div.control-group-user-username')
      .append($('<label for="user_username" class="string control-label">Username</label>'))
      .append($('<div>', {
        'class': 'input-group'
      }))
      .find('div')
      .append($('<span>', {
        'class': 'input-group-addon',
        text: '@'
      }))
      .append($('<input />', {
        name: 'user[username]',
        id: 'user_username',
        type: 'text'
      }))

    $('form#new_user').validate()
  }
})

var wrappers = ['horizontal_form', 'vertical_form', 'inline_form']

for (var i = 0; i < wrappers.length; i++) {
  var wrapper = wrappers[i]

  QUnit.test(wrapper + ' - Validate error attaching and detaching', function (assert) {
    var form = $('form#new_user'); var input = form.find('input#user_name')
    var label = $('label[for="user_name"]')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('focusout')
    assert.ok(input.parent().parent().hasClass('error'))
    assert.ok(label.parent().hasClass('error'))
    assert.ok(input.parent().parent().find('span.help-inline:contains("must be present")')[0])

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().parent().hasClass('error'))
    assert.ok(input.parent().parent().find('span.help-inline:contains("is invalid")')[0])
    assert.ok(label.parent().hasClass('error'))

    input.val('123')
    input.trigger('change')
    input.trigger('focusout')
    assert.notOk(input.parent().parent().hasClass('error'))
    assert.notOk(input.parent().parent().find('span.help-inline')[0])
    assert.notOk(label.parent().hasClass('error'))
  })

  QUnit.test(wrapper + ' - Validate pre-existing error blocks are re-used', function (assert) {
    var form = $('form#new_user'); var input = form.find('input#user_name')
    var label = $('label[for="user_name"]')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.parent().append($('<span class="help-inline">Error from Server</span>'))
    assert.ok(input.parent().find('span.help-inline:contains("Error from Server")')[0])
    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().parent().hasClass('error'))
    assert.ok(label.parent().hasClass('error'))
    assert.ok(input.parent().find('span.help-inline:contains("is invalid")').length === 1)
    assert.ok(form.find('span.help-inline').length === 1)
  })

  QUnit.test(wrapper + ' - Validate input-group', function (assert) {
    var form = $('form#new_user'); var input = form.find('input#user_username')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.input-group').find('span.help-inline').length === 0)
    assert.ok(input.closest('.control-group').find('span.help-inline').length === 1)

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.control-group').find('span.help-inline').length === 0)
  })
}
