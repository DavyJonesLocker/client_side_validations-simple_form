module('Validate SimpleForm No errors', {
  setup: function() {
    window.ClientSideValidations.forms['new_user'] = {
      type: 'SimpleForm::FormBuilder',
      wrapper: 'no_error',
      field_tag: 'div',
      field_class: 'field',
      field_with_errors_class: 'field_with_errors',
      validators: {
        "user[name]":{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":/\d+/}]}
      }
    }

    $('#qunit-fixture').append(`
      <form action="/users" data-validate="true" id="new_user" method="post" name="new_user">
        <div id="field_wrapper" class="field">
          <div class="input">
            <label for="user_name">Name</label>
            <input id="user_name" name="user[name]" type="text">
          </div>
        </div>
      </form>
    `);

    $('form#new_user').validate();
  }
});

test('Validate error attaching and detaching', function() {
  var form = $('form#new_user');
  var field_wrapper = form.find('#field_wrapper');
  var input = form.find('input#user_name');

  input.trigger('focusout');
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(!field_wrapper.find('span.error:contains("must be present")')[0]);

  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(!field_wrapper.find('span.error:contains("is invalid")')[0]);

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')
  ok(!field_wrapper.hasClass('field_with_errors'));
  ok(!field_wrapper.find('span.error')[0]);
});

test('Validate pre-existing error blocks are not re-used', function() {
  var form = $('form#new_user');
  var field_wrapper = form.find('#field_wrapper');
  var input = form.find('input#user_name');

  field_wrapper.append($('<span class="error">Error from Server</span>'));
  ok(field_wrapper.find('span.error:contains("Error from Server")')[0]);
  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(field_wrapper.find('span.error:contains("Error from Server")').size() === 1);
  ok(!field_wrapper.find('span.error:contains("is invalid")')[0]);
});
