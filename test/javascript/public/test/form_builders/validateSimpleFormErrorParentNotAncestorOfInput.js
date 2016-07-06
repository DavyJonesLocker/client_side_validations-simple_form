module('Validate SimpleForm Error parent not ancestor of input', {
  setup: function() {
    window.ClientSideValidations.forms['new_user'] = {
      type: 'SimpleForm::FormBuilder',
      wrapper: 'error_parent_not_ancestor_of_input',
      field_tag: 'div',
      field_class: 'form-group row',
      field_with_errors_class: 'has-error',
      error_parent_tag: 'div',
      error_parent_class: 'col-md-3',
      error_parent_with_errors_class: null,
      error_tag: 'span',
      error_class: 'help-block',
      validators: {
        "user[name]":{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":/\d+/}]}
      }
    }

    $('#qunit-fixture').append(`
      <form action="/users" data-validate="true" id="new_user" method="post" name="new_user">
        <div id="field_wrapper" class="form-group row">
          <div class="col-md-6">
            <label for="user_name" class="col-sm-3 control-label">Name</label>
            <div class="col-sm-9">
              <input id="user_name" class="form-control" name="user[name]" type="text">
            </div>
          </div>
          <div id="error_parent" class="col-md-3">
            <div class="progress"></div>
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
  var error_parent  = form.find('#error_parent');
  var input = form.find('input#user_name');

  input.trigger('focusout');
  ok(field_wrapper.hasClass('has-error'));
  ok(error_parent.find('span.help-block:contains("must be present")')[0]);

  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('has-error'));
  ok(error_parent.find('span.help-block:contains("is invalid")')[0]);

  input.val('123')
  input.trigger('change')
  input.trigger('focusout')
  ok(!field_wrapper.hasClass('has-error'));
  ok(!field_wrapper.find('span.help-block')[0]);
});

test('Validate pre-existing error blocks are re-used', function() {
  var form = $('form#new_user');
  var field_wrapper = form.find('#field_wrapper');
  var error_parent  = form.find('#error_parent');
  var input = form.find('input#user_name');

  error_parent.append($('<span class="help-block">Error from Server</span>'));
  ok(error_parent.find('span.help-block:contains("Error from Server")')[0]);
  input.val('abc')
  input.trigger('change')
  input.trigger('focusout')
  ok(field_wrapper.hasClass('has-error'));
  ok(field_wrapper.find('span.help-block:contains("is invalid")').size() === 1);
});
