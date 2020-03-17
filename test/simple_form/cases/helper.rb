# frozen_string_literal: true

require 'base_helper'
require 'action_view'
require 'client_side_validations/simple_form'

def swap_wrapper(wrapper, name = :default)
  old = SimpleForm.wrappers[name.to_s]
  SimpleForm.wrappers[name.to_s] = wrapper
  yield
ensure
  SimpleForm.wrappers[name.to_s] = old
end

def custom_wrapper_with_multiple_classes
  SimpleForm.build tag: :div, class: %i[input input2], error_class: :field_with_errors do |b|
    b.wrapper :error_wrapper, tag: :div, class: 'error_wrapper' do |be|
      be.use :error, wrap_with: { tag: :span, class: %i[error error2] }
    end
  end
end
