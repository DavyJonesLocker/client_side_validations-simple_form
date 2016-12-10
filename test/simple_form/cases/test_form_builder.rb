require 'simple_form/cases/helper'
require 'simple_form/cases/simple_form_setup'

module ClientSideValidations
  module SimpleForm
    class FormBuilderTest < MiniTest::Test
      DEFAULT_BASIC_SETTINGS = {
        type: 'SimpleForm::FormBuilder',
        wrapper: :default,

        field_tag: :div,
        field_class: :input,
        field_with_errors_class: :field_with_errors
      }.freeze
      DEFAULT_ERROR_SETTINGS = {
        error_parent_tag: :div,
        error_parent_class: :input,
        error_parent_with_errors_class: :field_with_errors,

        error_tag: :span,
        error_class: :error
      }.freeze
      DEFAULT_SETTINGS = DEFAULT_BASIC_SETTINGS.merge DEFAULT_ERROR_SETTINGS

      def test_client_side_form_js_hash
        expected = DEFAULT_SETTINGS
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, {})
        assert_equal expected, builder.client_side_form_settings({}, nil)
      end

      def test_client_side_form_js_hash_with_bootstrap_wrapper
        expected = DEFAULT_SETTINGS.merge(wrapper: :bootstrap)
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, {})
        assert_equal expected, builder.client_side_form_settings({ wrapper: :bootstrap }, nil)
      end

      def test_client_side_form_js_hash_with_nested_wrappers_wrapper
        expected = DEFAULT_SETTINGS.merge(
          wrapper: :nested_wrappers,
          field_tag: :tr,
          field_class: :field,
          error_parent_tag: :td,
          error_parent_with_errors_class: nil
        )
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, wrapper: :nested_wrappers)
        assert_equal expected, builder.client_side_form_settings({ wrapper: :nested_wrappers }, nil)
      end

      def test_client_side_form_js_hash_with_error_parent_not_an_input_ancestor_wrapper
        expected = DEFAULT_SETTINGS.merge(
          wrapper: :error_parent_not_ancestor_of_input,
          field_tag: 'div',
          field_class: 'form-group row',
          field_with_errors_class: 'has-error',

          error_parent_tag: 'div',
          error_parent_class: 'col-md-3',
          error_parent_with_errors_class: nil,

          error_tag: 'span',
          error_class: 'help-block'
        )
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, wrapper: :error_parent_not_ancestor_of_input)
        assert_equal expected, builder.client_side_form_settings({ wrapper: :error_parent_not_ancestor_of_input }, nil)
      end

      def test_client_side_form_js_hash_with_no_error_wrapper
        expected = DEFAULT_BASIC_SETTINGS.merge(
          wrapper: :no_error,
          field_class: :field
        )
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, wrapper: :no_error)
        assert_equal expected, builder.client_side_form_settings({ wrapper: :no_error }, nil)
      end
    end
  end
end
