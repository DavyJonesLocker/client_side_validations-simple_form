module('Validate SimpleForm Nested wrappers', {
  setup: function() {
    window.ClientSideValidations.forms['new_user'] = {
      type: 'SimpleForm::FormBuilder',
      wrapper: 'nested_wrappers',
      field_tag: 'tr',
      field_class: 'field',
      field_with_errors_class: 'field_with_errors',
      error_parent_tag: 'td',
      error_parent_class: 'input',
      error_parent_with_errors_class: 'input_with_errors',
      error_tag: 'span',
      error_class: 'error small',
      validators: {
        "user[name]":{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":/\d+/}]}
      }
    }

    $('#qunit-fixture').append(`
      <form action="/users" data-validate="true" id="new_user" method="post" name="new_user">
        <table>
          <tbody>
            <tr id="field_wrapper" class="field">
              <th>
                <label for="user_name">Name</label>
              </th>
              <td id="error_parent" class="input">
                <input id="user_name" name="user[name]" type="text">
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    `);

    $('form#new_user').validate();
  }
});

test('Validate error attaching and detaching', function() {
  var form = $('form#new_user');
  var field_wrapper = form.find('#field_wrapper');
  var error_parent = form.find('#error_parent');
  var input = form.find('input#user_name');

  input.trigger('focusout');
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(error_parent.hasClass('input_with_errors'));
  ok(error_parent.find('span.error:contains("must be present")')[0]);

  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(error_parent.hasClass('input_with_errors'));
  ok(error_parent.find('span.error:contains("is invalid")')[0]);

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')
  ok(!field_wrapper.hasClass('field_with_errors'));
  ok(!error_parent.hasClass('input_with_errors'));
  ok(!field_wrapper.find('span.error')[0]);
});

test('Validate pre-existing error blocks are re-used', function() {
  var form = $('form#new_user');
  var field_wrapper = form.find('#field_wrapper');
  var error_parent = form.find('#error_parent');
  var input = form.find('input#user_name');

  error_parent.append($('<span class="error">Error from Server</span>'));
  ok(error_parent.find('span.error:contains("Error from Server")')[0]);
  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('field_with_errors'));
  ok(error_parent.hasClass('input_with_errors'));
  ok(field_wrapper.find('span.error:contains("is invalid")').size() === 1);
});
