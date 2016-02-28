module('Validate SimpleForm Bootstrap', {
  setup: function() {
    window.ClientSideValidations.forms['new_user'] = {
      type: 'SimpleForm::FormBuilder',
      error_class: 'help-inline',
      error_tag: 'span',
      wrapper_error_class: 'error',
      wrapper_tag: 'div',
      wrapper_class: 'control-group control-group-2 control-group-3',
      wrapper: 'bootstrap',
      validators: {
        "user[name]":{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":/\d+/}]},
        "user[username]":{"presence":[{"message": "must be present"}]}
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
          class: 'form-inputs'
        }))
        .find('div')
        	.append($('<div />', {
            class: 'control-group control-group-2 control-group-3 control-group-user-name'
          }))
          .find('div.control-group-user-name')
            .append($('<label for="user_name" class="string control-label">Name</label>'))
            .append($('<div />', {
              class: 'controls'
            })).find('div')
              .append($('<input />', {
                name: 'user[name]',
                id: 'user_name',
                type: 'text'
              }))
        	.append($('<div />', {
            class: 'control-group control-group-2 control-group-3 control-group-user-username'
          }))
          .find('div.control-group-user-username')
            .append($('<label for="user_username" class="string control-label">Username</label>'))
            .append($('<div />', {
              class: 'input-group'
            })).find('div')
              .append($('<span />', {
                class: 'input-group-addon',
                text: '@'
              }))
              .append($('<input />', {
                name: 'user[username]',
                id: 'user_username',
                type: 'text'
              }));

    $('form#new_user').validate();
  }
});

for (wrapper of ['horizontal_form', 'vertical_form', 'inline_form']) {
  test(wrapper + ' - Validate error attaching and detaching', function() {
    var form = $('form#new_user'), input = form.find('input#user_name');
    var label = $('label[for="user_name"]');
    window.ClientSideValidations.forms['new_user'].wrapper = wrapper

    input.trigger('focusout');
    ok(input.parent().parent().hasClass('error'));
    ok(label.parent().hasClass('error'));
    ok(input.parent().parent().find('span.help-inline:contains("must be present")')[0]);

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    ok(input.parent().parent().hasClass('error'));
    ok(input.parent().parent().find('span.help-inline:contains("is invalid")')[0]);
    ok(label.parent().hasClass('error'));

    input.val('123')
    input.trigger('change')
    input.trigger('focusout')
    ok(!input.parent().parent().hasClass('error'));
    ok(!input.parent().parent().find('span.help-inline')[0]);
    ok(!label.parent().hasClass('error'));
  });

  test(wrapper + ' - Validate pre-existing error blocks are re-used', function() {
    var form = $('form#new_user'), input = form.find('input#user_name');
    var label = $('label[for="user_name"]');
    window.ClientSideValidations.forms['new_user'].wrapper = wrapper

    input.parent().append($('<span class="help-inline">Error from Server</span>'))
    ok(input.parent().find('span.help-inline:contains("Error from Server")')[0]);
    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    ok(input.parent().parent().hasClass('error'));
    ok(label.parent().hasClass('error'));
    ok(input.parent().find('span.help-inline:contains("is invalid")').size() === 1);
  });

  test(wrapper + ' - Validate input-group', function() {
    var form = $('form#new_user'), input = form.find('input#user_username');
    window.ClientSideValidations.forms['new_user'].wrapper = wrapper

    input.trigger('change')
    input.trigger('focusout')
    ok(input.closest('.input-group').find('span.help-inline').size() === 0);
    ok(input.closest('.control-group').find('span.help-inline').size() === 1);

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    ok(input.closest('.control-group').find('span.help-inline').size() === 0);
  });
}
