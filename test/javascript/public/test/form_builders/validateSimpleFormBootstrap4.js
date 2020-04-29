QUnit.module('Validate SimpleForm Bootstrap 4', {
  before: function () {
    currentFormBuilder = window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder']
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = BS4_FORM_BUILDER
  },

  after: function () {
    window.ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = currentFormBuilder
  },

  beforeEach: function () {
    dataCsv = {
      html_settings: {
        type: 'SimpleForm::FormBuilder',
        error_class: null,
        error_tag: 'div',
        wrapper_error_class: 'form-group-invalid',
        wrapper_tag: 'div',
        wrapper_class: 'form-group'
      },
      validators: {
        'user[name]': { presence: [{ message: 'must be present' }], format: [{ message: 'is invalid', 'with': { options: 'g', source: '\\d+' } }] },
        'user[username]': { presence: [{ message: 'must be present' }] },
        'user[role_ids]': {
          presence: [{ message: 'must be present' }],
          length:[{ messages: { maximum: 'is too long (maximum is 2 characters)' }, maximum: 2 }]
        },
        'user[department_id]': { presence: [{ message: 'must be present' }] },
      }
    }

    $('#qunit-fixture')
      .append(
        $('<form>', {
          action: '/users',
          'data-client-side-validations': JSON.stringify(dataCsv),
          method: 'post',
          id: 'new_user'
        })
          .append(
            $('<div>', { 'class': 'form-group' })
              .append(
                $('<label for="user_name" class="string form-control-label">Name</label>'))
              .append(
                $('<input />', { 'class': 'form-control', name: 'user[name]', id: 'user_name', type: 'text' })))
          .append(
            $('<div>', { 'class': 'form-group' })
              .append(
                $('<label for="user_username" class="string control-label">Username</label>'))
              .append(
                $('<div>', { 'class': 'input-group' })
                  .append(
                    $('<div>', { 'class': 'input-group-prepend' })
                      .append(
                        $('<span>', { 'class': 'input-group-text', text: '@' })))
                  .append(
                    $('<input />', { 'class': 'form-control', name: 'user[username]', id: 'user_username', type: 'text' })))))
        .append(
          $('<form>', {
            action: '/users',
            'data-client-side-validations': JSON.stringify(dataCsv),
            method: 'post',
            id: 'new_user_vertical_form'
          })
            .append(
              $('<fieldset>', { 'class': 'form-group check_boxes required user_roles' })
                .append(
                  $('<legend class="col-form-label pt-0">Check roles <abbr title="required">*</abbr></legend>'))
                .append(
                  $('<input type="hidden" name="user[role_ids][]" value="">'))
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input check_boxes required',
                        name: 'user[role_ids][]',
                        id: 'user_role_ids_1',
                        value: 1,
                        type: 'checkbox',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_role_ids_1">Manager</label>')
                )
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input check_boxes required',
                        name: 'user[role_ids][]',
                        id: 'user_role_ids_2',
                        value: 2,
                        type: 'checkbox',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_role_ids_2">Technical support</label>')
                )
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input check_boxes required',
                        name: 'user[role_ids][]',
                        id: 'user_role_ids_3',
                        value: 3,
                        type: 'checkbox',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_role_ids_3">Tester</label>')
                )
            )
            .append(
              $('<fieldset>', { 'class': 'form-group radio_buttons required user_department' })
                .append(
                  $('<legend class="col-form-label pt-0">Radio department <abbr title="required">*</abbr></legend>'))
                .append(
                  $('<input type="hidden" name="user[department_id]" value="">'))
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input radio_buttons required',
                        name: 'user[department_id]',
                        id: 'user_department_id_1',
                        value: 1,
                        type: 'radio',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_department_id_1">IT</label>')
                )
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input radio_buttons required',
                        name: 'user[department_id]',
                        id: 'user_department_id_2',
                        value: 2,
                        type: 'radio',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_department_id_2">HR</label>')
                )
                .append(
                  $('<div>', { 'class': 'form-check' })
                    .append(
                      $('<input />', {
                        class: 'form-check-input radio_buttons required',
                        name: 'user[department_id]',
                        id: 'user_department_id_3',
                        value: 3,
                        type: 'radio',
                        'data-client-side-validations-wrapper': 'vertical_collection' }
                      ))
                    .append('<label class="collection_check_boxes" for="user_department_id_3">PR</label>')
                )
            )
        )
        .append(
          $('<form>', {
            action: '/users',
            'data-client-side-validations': JSON.stringify(dataCsv),
            method: 'post',
            id: 'new_user_horizontal_form'
          })
            .append(
              $('<div>', { 'class': 'form-group row check_boxes required user_roles' })
                .append(
                  $('<label class="col-sm-3 col-form-label check_boxes required">Check roles <abbr title="required">*</abbr></label>'))
                .append($('<div>', { class: 'col-sm-9' })
                  .append(
                    $('<input type="hidden" name="user[role_ids][]" value="">'))
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input check_boxes required',
                          name: 'user[role_ids][]',
                          id: 'user_role_ids_1',
                          value: 1,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection' }
                        ))
                      .append('<label class="collection_check_boxes" for="user_role_ids_1">Manager</label>')
                  )
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input check_boxes required',
                          name: 'user[role_ids][]',
                          id: 'user_role_ids_2',
                          value: 2,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection' }
                        ))
                      .append('<label class="collection_check_boxes" for="user_role_ids_2">Technical support</label>')
                  )
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input check_boxes required',
                          name: 'user[role_ids][]',
                          id: 'user_role_ids_3',
                          value: 3,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection' }
                        ))
                      .append('<label class="collection_check_boxes" for="user_role_ids_3">Tester</label>')
                  )

              )
            )
            .append(
              $('<div>', { 'class': 'form-group row radio_buttons required user_department' })
                .append(
                  $('<label class="col-sm-3 col-form-label radio_buttons required">Radio department<abbr title="required">*</abbr></label>'))
                .append($('<div>', { class: 'col-sm-9' })
                  .append(
                    $('<input type="hidden" name="user[department_ids]" value="">'))
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input radio_buttons required',
                          name: 'user[department_id]',
                          id: 'user_department_id_1',
                          value: 1,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection',
                          'data-validate': true }
                        ))
                      .append('<label class="collection_radio_buttons" for="user_department_id_1">IT</label>')
                  )
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input radio_buttons required',
                          name: 'user[department_id]',
                          id: 'user_department_id_2',
                          value: 2,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection',
                          'data-validate': true }
                        ))
                      .append('<label class="collection_radio_buttons" for="user_department_id_2">HR</label>')
                  )
                  .append(
                    $('<div>', { 'class': 'form-check' })
                      .append(
                        $('<input />', {
                          class: 'form-check-input radio_buttons required',
                          name: 'user[department_id]',
                          id: 'user_department_id_3',
                          value: 3,
                          type: 'checkbox',
                          'data-client-side-validations-wrapper': 'horizontal_collection',
                          'data-validate': true }
                        ))
                      .append('<label class="collection_radio_buttons" for="user_department_id_3">PR</label>')
                  )
              )
            )
        )

    $('form#new_user').validate()
    $('form#new_user_vertical_form').validate()
    $('form#new_user_horizontal_form').validate()
  }
})

var wrappers = ['horizontal_form', 'vertical_form', 'inline_form']

for (var i = 0; i < wrappers.length; i++) {
  const wrapper = wrappers[i]

  QUnit.test(wrapper + ' - Validate error attaching and detaching', function (assert) {
    var form = $('form#new_user')
    var input = form.find('input#user_name')
    var label = $('label[for="user_name"]')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('focusout')
    assert.ok(input.parent().hasClass('form-group-invalid'))
    assert.ok(label.parent().hasClass('form-group-invalid'))
    assert.ok(input.parent().find('div.invalid-feedback:contains("must be present")')[0])

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().hasClass('form-group-invalid'))
    assert.ok(input.parent().find('div.invalid-feedback:contains("is invalid")')[0])
    assert.ok(input.hasClass('is-invalid'))

    input.val('123')
    input.trigger('change')
    input.trigger('focusout')
    assert.notOk(input.parent().parent().hasClass('form-group-invalid'))
    assert.notOk(input.parent().parent().find('span.help-inline')[0])
    assert.notOk(input.hasClass('is-invalid'))
  })

  QUnit.test(wrapper + ' - Validate pre-existing error blocks are re-used', function (assert) {
    var form = $('form#new_user'); var input = form.find('input#user_name')
    var label = $('label[for="user_name"]')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.parent().append($('<div class="invalid-feedback">Error from Server</span>'))
    assert.ok(input.parent().find('div.invalid-feedback:contains("Error from Server")')[0])
    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.parent().hasClass('form-group-invalid'))
    assert.ok(label.parent().hasClass('form-group-invalid'))
    assert.ok(input.parent().find('div.invalid-feedback:contains("is invalid")').length === 1)
    assert.ok(form.find('div.invalid-feedback').length === 1)
  })

  QUnit.test(wrapper + ' - Validate input-group', function (assert) {
    var form = $('form#new_user'); var input = form.find('input#user_username')
    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.input-group-prepend').find('div.invalid-feedback').length === 0)
    assert.ok(input.closest('.input-group').find('div.invalid-feedback').length === 1)

    input.val('abc')
    input.trigger('change')
    input.trigger('focusout')
    assert.ok(input.closest('.input-group').find('div.invalid-feedback').length === 0)
  })

  QUnit.test(wrapper + ' - Validate associations checkboxes', function (assert) {
    var form = $('form#new_user_' +  wrapper)[0] || $('form#new_user_vertical_form')[0]
    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    form = $(form)

    var wrapperElement = form.find('.form-group.user_roles')
    var checkbox1 = form.find('input#user_role_ids_1')
    var checkbox2 = form.find('input#user_role_ids_2')
    var checkbox3 = form.find('input#user_role_ids_3')

    assert.ok(wrapperElement.find('div.invalid-feedback').length === 0)

    checkbox3.trigger('change')
    checkbox3.trigger('focusout')

    assert.ok(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(checkbox1.hasClass('is-invalid'))
    assert.ok(checkbox3.hasClass('is-invalid'))

    assert.ok(checkbox3.closest('.form-check').next('.invalid-feedback').length === 1)
    assert.ok(wrapperElement.find('div.invalid-feedback').length === 1)

    checkbox1.attr('checked', true)
    checkbox1.trigger('change')
    checkbox1.trigger('focusout')

    assert.notOk(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(wrapperElement.find('.is-invalid').length===0)
    assert.ok(wrapperElement.find('.invalid-feedback').length === 0)

    checkbox2.attr('checked', true)
    checkbox3.attr('checked', true)
    checkbox3.trigger('change')
    checkbox3.trigger('focusout')

    assert.ok(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(wrapperElement.find('.invalid-feedback').html().includes('is too long'))
  })

  QUnit.test(wrapper + ' - Validate associations checkboxes server feedback reused', function (assert) {
    var form = $('form#new_user_' +  wrapper)[0] || $('form#new_user_vertical_form')[0]
    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    form = $(form)

    var wrapperElement = form.find('.form-group.user_roles')
    var checkbox3 = form.find('input#user_role_ids_3')

    assert.ok(wrapperElement.find('.invalid-feedback').length === 0)
    checkbox3.closest('.form-check').after($('<div class="invalid-feedback">Error from Server</span>'))

    checkbox3.trigger('change')
    checkbox3.trigger('focusout')

    assert.ok(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(wrapperElement.find('input.is-invalid').length === 3)
    assert.ok(wrapperElement.find('.invalid-feedback').length === 1)
  })

  QUnit.test(wrapper + ' - Validate associations radio_buttons', function (assert) {
    var form = $('form#new_user_' +  wrapper)[0] || $('form#new_user_vertical_form')[0]
    form.ClientSideValidations.settings.html_settings.wrapper = wrapper

    form = $(form)

    var wrapperElement = form.find('.form-group.user_department')
    var radio1 = form.find('input#user_department_id_1')
    var radio3 = form.find('input#user_department_id_3')

    assert.ok(wrapperElement.find('div.invalid-feedback').length === 0)

    radio1.trigger('change')
    radio1.trigger('focusout')

    assert.ok(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(radio1.hasClass('is-invalid'))
    assert.ok(radio3.hasClass('is-invalid'))

    assert.ok(radio3.closest('.form-check').next('.invalid-feedback').length === 1)
    assert.ok(wrapperElement.find('div.invalid-feedback').length === 1)

    radio1.attr('checked', true)
    radio1.trigger('change')
    radio1.trigger('focusout')

    assert.notOk(wrapperElement.hasClass('form-group-invalid'))
    assert.ok(wrapperElement.find('.is-invalid').length===0)
    assert.ok(wrapperElement.find('.invalid-feedback').length === 0)
  })

}
