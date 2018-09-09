QUnit.module('Validate SimpleForm Bootstrap 4', {
  before: function() {
    oldCSV = window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'];
    $('body').append($('<script id="twbs4_script" src="/vendor/assets/javascripts/rails.validations.simple_form.bootstrap4.js"><\/script>'));
  },

  after: function() {
    $('#twbs4_script').remove()
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = oldCSV;
  },

  beforeEach: function() {
    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: null,
        error_tag: 'div',
        wrapper_error_class: 'form-group-invalid',
        wrapper_tag: 'div',
        wrapper_class: 'form-group',
      },
      validators: {
        'user[name]':{"presence":[{"message": "must be present"}], "format":[{"message":"is invalid","with":{"options":"g", "source": "\\d+"}}]},
        'user[username]':{"presence":[{"message": "must be present"}]}
      }
    }

    $('#qunit-fixture')
      .append(
        $('<form />', {
          action: '/users',
          'data-client-side-validations': JSON.stringify(dataCsv),
          method: 'post',
          id: 'new_user' })
        .append(
          $('<div />', { class: 'form-group' })
          .append(
            $('<label for="user_name" class="string form-control-label">Name</label>'))
          .append(
            $('<input />', { class: 'form-control', name: 'user[name]', id: 'user_name', type: 'text' })))
        .append(
          $('<div />', { class: 'form-group' })
          .append(
            $('<label for="user_username" class="string control-label">Username</label>'))
          .append(
            $('<div />', { class: 'input-group' })
            .append(
              $('<div />', { class: 'input-group-prepend' })
              .append(
                $('<span />', { class: 'input-group-text', text: '@' })))
            .append(
              $('<input />', { class: 'form-control', name: 'user[username]', id: 'user_username', type: 'text' })))))

    $('form#new_user').validate();
  }
});

for (wrapper of ['horizontal_form', 'vertical_form', 'inline_form']) {
  QUnit.test(wrapper + ' - Validate error attaching and detaching', function(assert) {
    var form = $('form#new_user'), input = form.find('input#user_name');
    var label = $('label[for="user_name"]');
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('focusout');
    assert.ok(input.parent().hasClass('form-group-invalid'));
    assert.ok(label.parent().hasClass('form-group-invalid'));
    assert.ok(input.parent().find('div.invalid-feedback:contains("must be present")')[0]);

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().hasClass('form-group-invalid'));
    assert.ok(input.parent().find('div.invalid-feedback:contains("is invalid")')[0]);
    assert.ok(input.hasClass('is-invalid'));

    input.val('123')
    input.trigger('change')
    input.trigger('focusout')
    assert.notOk(input.parent().parent().hasClass('form-group-invalid'));
    assert.notOk(input.parent().parent().find('span.help-inline')[0]);
    assert.notOk(input.hasClass('is-invalid'));
  });

  QUnit.test(wrapper + ' - Validate pre-existing error blocks are re-used', function(assert) {
    var form = $('form#new_user'), input = form.find('input#user_name');
    var label = $('label[for="user_name"]');
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.parent().append($('<div class="invalid-feedback">Error from Server</span>'))
    assert.ok(input.parent().find('div.invalid-feedback:contains("Error from Server")')[0]);
    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().hasClass('form-group-invalid'));
    assert.ok(label.parent().hasClass('form-group-invalid'));
    assert.ok(input.parent().find('div.invalid-feedback:contains("is invalid")').length === 1);
    assert.ok(form.find('div.invalid-feedback').length === 1);
  });

  QUnit.test(wrapper + ' - Validate input-group', function(assert) {
    var form = $('form#new_user'), input = form.find('input#user_username');
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.input-group-prepend').find('div.invalid-feedback').length === 0);
    assert.ok(input.closest('.input-group').find('div.invalid-feedback').length === 1);

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.input-group').find('div.invalid-feedback').length === 0);
  });
}
