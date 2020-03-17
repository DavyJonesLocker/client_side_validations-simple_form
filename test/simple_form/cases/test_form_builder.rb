# frozen_string_literal: true

require 'simple_form/cases/helper'

module ClientSideValidations
  module SimpleForm
    class FormBuilderTest < MiniTest::Test
      def expected_hash
        {
          type:                'SimpleForm::FormBuilder',
          error_class:         'error',
          error_tag:           :span,
          wrapper_error_class: :field_with_errors,
          wrapper_tag:         :div,
          wrapper_class:       'input',
          wrapper:             :default
        }
      end

      def test_client_side_form_js_hash
        expected = expected_hash
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, {})
        assert_equal expected, builder.client_side_form_settings({}, nil)
      end

      def test_client_side_form_js_hash_with_multiple_classes
        expected = expected_hash.merge(error_class: 'error error2', wrapper_class: 'input input2')

        swap_wrapper(custom_wrapper_with_multiple_classes) do
          builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, {})
          assert_equal expected, builder.client_side_form_settings({}, nil)
        end
      end

      def test_client_side_form_js_hash_with_custom_wrapper
        expected = expected_hash.merge(wrapper: :bootstrap)
        builder = ::SimpleForm::FormBuilder.new(:user, nil, {}, {})
        assert_equal expected, builder.client_side_form_settings({ wrapper: :bootstrap }, nil)
      end
    end
  end
end
