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
        error_class: 'error small',
        error_tag: 'span',
        wrapper_error_class: 'field_with_errors',
        wrapper_tag: 'div',
        wrapper_class: 'input',
        wrapper: 'default'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', 'with': { options: 'g', source: '\\d+' } }] },
        'user[date_of_birth]': { presence: [{ message: 'must be present' }] },
        'user[role_ids]': { presence: [{ message: 'must be present' }] }
      }
    }

    $('#qunit-fixture')
      .append($('<form>', {
        action: '/users',
        'data-client-side-validations': JSON.stringify(dataCsv),
        method: 'post',
        id: 'new_user'
      })
      .append($('<div class="input">')
        .append($('<input />', {
          name: 'user[name]',
          id: 'user_name',
          type: 'text'
        }))
        .append($('<label for="user_name">Name</label>'))
      )
      .append($('<div class="input">')
        .append($('<input />', {
          name: 'user[date_of_birth]',
          id: 'date_of_birth',
          type: 'text',
          'data-client-side-validations-wrapper': 'custom_date_wrapper'
        }))
      )
      .append($('<div>', { class: "input check_boxes required user_roles" })
        .append('<label class="check_boxes required"><abbr title="required">*</abbr> Roles</label>')
        .append('<input type="hidden" name="user[role_ids][]" value="">')
        .append($('<span class="checkbox">')
          .append($('<label for="user_role_ids_1">')
            .append($('<input />', {
              class: 'check_boxes required',
              type: 'checkbox',
              value: '1',
              name: 'user[role_ids][]',
              id: 'user_role_ids_1',
              'data-validate': 'true'
            }))
          .append('Manager'))
        )
        .append($('<span class="checkbox">')
          .append($('<label for="user_role_ids_2">')
            .append($('<input />', {
              class: 'check_boxes required',
              type: 'checkbox',
              value: '2',
              name: 'user[role_ids][]',
              id: 'user_role_ids_2',
              'data-validate': 'true'
            }))
          .append('Technical'))
        )
        .append($('<span class="checkbox">')
          .append($('<label for="user_role_ids_3">')
            .append($('<input />', {
              class: 'check_boxes required',
              type: 'checkbox',
              value: '3',
              name: 'user[role_ids][]',
              id: 'user_role_ids_3',
              'data-validate': 'true'
            }))
          .append('Driver'))
        )

      )
    )

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

QUnit.test('Validate correct JS Builder\'s wrapper is called for custom_wrapper', function (assert) {
  const oldWrappers = $.extend({}, ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers)

  // It would be probably better to use some stub library but I want to keep it simple
  const flag = {}
  flag['customWrapperCalled'] = false;

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers['custom_date_wrapper'] = {
    add: function(element, settings, message) { flag['customWrapperCalled']=true; },
    remove: function(element, settings) {}
  }

  var form = $('form#new_user');
  var input = form.find('input#date_of_birth')
  input.trigger('focusout')

  assert.ok(flag['customWrapperCalled']);
  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers = oldWrappers
})

QUnit.test('Validate error attaching and detaching for checkboxes', function (assert) {
  const form = $('form#new_user');
  const wrapperElement = form.find('div.input.user_roles')
  const checkbox1 = $('#user_role_ids_1');
  const checkbox3 = $('#user_role_ids_3');

  checkbox1.trigger('change')
  checkbox1.trigger('focusout')

  assert.ok(wrapperElement.hasClass('field_with_errors'))
  assert.ok(checkbox3.closest('.checkbox').next('span.error').length == 1)

  checkbox3.attr('checked', true)
  checkbox3.trigger('change')
  checkbox3.trigger('focusout')

  assert.notOk(wrapperElement.hasClass('field_with_errors'))
  assert.ok(form.find('span.error').length == 0)
})
