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

def custom_wrapper_with_full_error
  SimpleForm.build tag: :div, class: :input, error_class: :field_with_errors do |b|
    b.use :full_error, wrap_with: { tag: :span, class: :full_error }
  end
end

def custom_wrapper_with_nested_error
  SimpleForm.build tag: :div, class: :input, error_class: :field_with_errors do |b|
    b.wrapper tag: :div do |b_nested|
      b_nested.use :error, wrap_with: { tag: :span, class: :error }
    end
  end
end

def custom_wrapper_with_error_and_full_error
  SimpleForm.build tag: :div, class: :input, error_class: :field_with_errors do |b|
    b.use :error, wrap_with: { tag: :span, class: :error }
    b.use :full_error, wrap_with: { tag: :span, class: :full_error }
  end
end

def custom_wrapper_with_multiple_css_classes
  SimpleForm.build tag: :div, class: %i[input input2], error_class: :field_with_errors do |b|
    b.use :error, wrap_with: { tag: :span, class: %i[error error2] }
  end
end
