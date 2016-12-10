module('Validate SimpleForm', {
  setup: function() {
    window.ClientSideValidations.forms['new_user'] = {
      type: 'SimpleForm::FormBuilder',
      wrapper: 'default',
      field_tag: 'div',
      field_class: 'input',
      field_with_errors_class: 'field_with_errors',
      error_parent_tag: 'div',
      error_parent_class: 'input',
      error_parent_with_errors_class: 'field_with_errors',
      error_tag: 'span',
      error_class: 'error small',
      validators: {
        "user[name]":{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":/\d+/}]}
      }
    }

    $('#qunit-fixture')
      .append($('<form />', {
        action: '/users',
        'data-validate': true,
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
          .append($('<label for="user_name">Name</label>'));
    $('form#new_user').validate();
  }
});

test('Validate error attaching and detaching', function() {
  var form = $('form#new_user'), input = form.find('input#user_name');
  var label = $('label[for="user_name"]');

  input.trigger('focusout');
  ok(input.parent().hasClass('field_with_errors'));
  ok(label.parent().hasClass('field_with_errors'));
  ok(input.parent().find('span.error:contains("must be present")')[0]);

  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(input.parent().hasClass('field_with_errors'));
  ok(label.parent().hasClass('field_with_errors'));
  ok(input.parent().find('span.error:contains("is invalid")')[0]);

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')
  ok(!input.parent().hasClass('field_with_errors'));
  ok(!label.parent().hasClass('field_with_errors'));
  ok(!form.find('span.error')[0]);
});

test('Validate pre-existing error blocks are re-used', function() {
  var form = $('form#new_user'), input = form.find('input#user_name');
  var label = $('label[for="user_name"]');

  input.parent().append($('<span class="error small">Error from Server</span>'))
  ok(input.parent().find('span.error:contains("Error from Server")')[0]);
  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(input.parent().hasClass('field_with_errors'));
  ok(label.parent().hasClass('field_with_errors'));
  ok(input.parent().find('span.error:contains("is invalid")').length === 1);
  ok(form.find('span.error').length === 1);
});
