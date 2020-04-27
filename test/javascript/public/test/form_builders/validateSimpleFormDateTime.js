QUnit.module('Validate SimpleForm DateTime', {
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
        error_class: 'error',
        error_tag: 'span',
        wrapper_error_class: 'field_with_errors',
        wrapper_tag: 'div',
        wrapper_class: 'input',
        wrapper: 'default'
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
            class:'input date required user_date_of_birth field_with_hint'
          })
            .append($('<label class="date required" for="user_date_of_birth_1i">Date of birth <abbr title="required">*</abbr></label>'))
            .append($('<select>', {
              id: 'user_date_of_birth_1i',
              name: 'user[date_of_birth(1i)]',
              class: 'date required',
            })
              .append($('<option value=""></option>'))
              .append($('<option value="2015">2015</option>'))
              .append($('<option value="2025">2025</option>')))
            .append($('<select>', {
              id: 'user_date_of_birth_2i',
              name: 'user[date_of_birth(2i)]',
              class: 'date required',
            })
              .append($('<option value=""></option>'))
              .append($('<option value="1">January</option>'))
              .append($('<option value="2">February</option>')))
            .append($('<select>', {
              id: 'user_date_of_birth_3i',
              name: 'user[date_of_birth(3i)]',
              class: 'date required',
            })
              .append($('<option value=""></option>'))
              .append($('<option value="1">1</option>'))
              .append($('<option value="2">2</option>'))
              .append($('<option value="3">3</option>')))
              .append('<span class="hint">hint text</span>')
          )
          .append($('<div>', {
            class:'input time required box_price field_with_errors field_with_hint'
          })
            .append($('<label class="time required" for="user_time_of_birth_4i">Time of birth <abbr title="required">*</abbr></label>'))
            .append('<input type="hidden" id="user_time_of_birth_1i" name="user[time_of_birth(1i)]" value="1">')
            .append('<input type="hidden" id="user_time_of_birth_2i" name="user[time_of_birth(2i)]" value="1">')
            .append('<input type="hidden" id="user_time_of_birth_3i" name="user[time_of_birth(3i)]" value="1">')
            .append($('<select>', {
              id: 'user_time_of_birth_4i',
              name: 'user[time_of_birth(4i)]',
              class: 'time required',
              'aria-invalid': true
            })
              .append($('<option value=""></option>'))
              .append($('<option value="00">00</option>'))
              .append($('<option value="23">23</option>'))
            )
            .append(':')
            .append($('<select>', {
              id: 'user_time_of_birth_5i',
              name: 'user[time_of_birth(5i)]',
              class: 'time required',
              'aria-invalid': true
            })
              .append($('<option value=""></option>'))
              .append($('<option value="00">00</option>'))
              .append($('<option value="55">55</option>'))
            )
            .append('<span class="hint">Hint: At what time you were born?</span>')
            .append('<span class="error">Time of birth must be present.</span>')
        )
      )

    $('form#new_user').validate()
  }
  })

  QUnit.test('Validate date input', function (assert) {
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

  QUnit.test('Validate time input reusing server message', function (assert) {
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
