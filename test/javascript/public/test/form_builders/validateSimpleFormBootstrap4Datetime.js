QUnit.module('Validate SimpleForm Bootstrap 4 Datetime Fields/Wrappers', {
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
        'user[date_of_birth]': { presence: [{ message: 'must be present' }] },
        'user[time_of_birth]': { presence: [{ message: 'must be present' }] }
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
          .append($('<div>', {
            class:'form-group date required user_date_of_birth'
          })
            .append($('<label class="form-control-label date required" for="user_date_of_birth_1i">Date of birth <abbr title="required">*</abbr></label>'))
            .append($('<div>', {
              class: 'd-flex flex-row justify-content-between align-items-center'
            })
              .append($('<select>', {
                id: 'user_date_of_birth_1i',
                name: 'user[date_of_birth(1i)]',
                class: 'form-control mx-1 date required',
                'data-client-side-validations-wrapper': 'vertical_multi_select'
              })
                .append($('<option value=""></option>'))
                .append($('<option value="2015">2015</option>'))
                .append($('<option value="2025">2025</option>')))
              .append($('<select>', {
                id: 'user_date_of_birth_2i',
                name: 'user[date_of_birth(2i)]',
                class: 'form-control mx-1 date required',
                'data-client-side-validations-wrapper': 'vertical_multi_select'
              })
                .append($('<option value=""></option>'))
                .append($('<option value="1">January</option>'))
                .append($('<option value="2">February</option>')))
              .append($('<select>', {
                id: 'user_date_of_birth_3i',
                name: 'user[date_of_birth(3i)]',
                class: 'form-control mx-1 date required',
                'data-client-side-validations-wrapper': 'vertical_multi_select'
              })
                .append($('<option value=""></option>'))
                .append($('<option value="1">1</option>'))
                .append($('<option value="2">2</option>'))
                .append($('<option value="3">3</option>')))
            )
            .append('<small class="form-text text-muted">hint text</small>')
          )
          .append($('<div>', {
            class:'form-group time required user_time_of_birth form-group-invalid'
          })
            .append($('<label class="form-control-label time required" for="user_time_of_birth_4i">Time of birth <abbr title="required">*</abbr></label>'))
            .append($('<div>', {
              class: 'd-flex flex-row justify-content-between align-items-center'
            })
              .append('<input type="hidden" id="user_time_of_birth_1i" name="user[time_of_birth(1i)]" value="1">')
              .append('<input type="hidden" id="user_time_of_birth_2i" name="user[time_of_birth(2i)]" value="1">')
              .append('<input type="hidden" id="user_time_of_birth_3i" name="user[time_of_birth(3i)]" value="1">')
              .append($('<select>', {
                id: 'user_time_of_birth_4i',
                name: 'user[time_of_birth(4i)]',
                class: 'form-control mx-1 is-invalid time required',
                'data-client-side-validations-wrapper': 'vertical_multi_select'
              })
                .append($('<option value=""></option>'))
                .append($('<option value="00">00</option>'))
                .append($('<option value="23">23</option>'))
              )
              .append(':')
              .append($('<select>', {
                id: 'user_time_of_birth_5i',
                name: 'user[time_of_birth(5i)]',
                class: 'form-control mx-1 is-invalid time required',
                'data-client-side-validations-wrapper': 'vertical_multi_select'
              })
                .append($('<option value=""></option>'))
                .append($('<option value="00">00</option>'))
                .append($('<option value="55">55</option>'))
              )
            )
            .append('<div class="invalid-feedback d-block">Time of birth must be present.</div>')
            .append('<small class="form-text text-muted">Hint: At what time you were born?</small>')
        )
      )

    $('form#new_user').validate()
  }
})

//I don think this multiple wrapper names makes sense here, because in SimpleForm different wrapper would have different DOM
//but here DOM ($('#qunit-fixture')) is same for all tests.
var wrappers = ['vertical_form']

for (var i = 0; i < wrappers.length; i++) {
  var wrapper = wrappers[i]

  QUnit.test(wrapper + ' - Validate date input', function (assert) {
    const form = $('form#new_user');
    const select_year = form.find('select#user_date_of_birth_1i')
    const select_month = form.find('select#user_date_of_birth_2i')
    const select_day = form.find('select#user_date_of_birth_3i')

    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    select_year.trigger('focusout')
    select_day.trigger('focusout')

    assert.ok(select_year.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_month.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_year.closest('.form-group').find('div.invalid-feedback').length === 1)

    select_year.val(2025).trigger('change').trigger('focusout')

    assert.ok(select_year.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_year.closest('.form-group').find('div.invalid-feedback').length === 1)

    select_month.val(1).trigger('change').trigger('focusout')
    select_day.val(1).trigger('change').trigger('focusout')

    assert.notOk(select_year.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_year.closest('.form-group').find('div.invalid-feedback').length === 0)
  })

  QUnit.test(wrapper + ' - Validate time input reusing server message', function (assert) {
    const form = $('form#new_user');
    const select_hour = form.find('select#user_time_of_birth_4i')
    const select_minute = form.find('select#user_time_of_birth_5i')

    form[0].ClientSideValidations.settings.html_settings.wrapper = wrapper

    assert.ok(select_hour.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_minute.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_hour.closest('.form-group').find('div.invalid-feedback').length === 1)

    select_hour.val(23).trigger('change').trigger('focusout')

    assert.ok(select_hour.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_minute.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_hour.closest('.form-group').find('div.invalid-feedback').length === 1)

    select_minute.val(55).trigger('change').trigger('focusout')

    assert.notOk(select_hour.closest('.form-group').hasClass('form-group-invalid'))
    assert.ok(select_hour.closest('.form-group').find('div.invalid-feedback').length === 0)
  })
}
