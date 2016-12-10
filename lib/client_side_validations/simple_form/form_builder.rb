require 'client_side_validations/simple_form/find_path'

module ClientSideValidations
  module SimpleForm
    module FormBuilder
      def self.included(base)
        base.class_eval do
          alias_method_chain :input, :client_side_validations
        end
      end

      def client_side_form_settings(options, _form_helper)
        settings = client_side_form_basic_settings(options)
        error_wrapper_path = wrapper.find_path(:error) || wrapper.find_path(:full_error)
        if error_wrapper_path.nil?
          settings
        else
          settings.merge client_side_form_error_settings(error_wrapper_path.last, error_wrapper_path[-2])
        end
      end

      def client_side_form_basic_settings(options)
        {
          type: self.class.to_s,
          wrapper: options[:wrapper] || ::SimpleForm.default_wrapper,

          field_tag: wrapper.defaults[:tag],
          field_class: wrapper.defaults[:class].first,
          field_with_errors_class: wrapper.defaults[:error_class]
        }
      end

      def client_side_form_error_settings(error_wrapper, error_wrapper_parent)
        {
          error_parent_tag: error_wrapper_parent.defaults[:tag],
          error_parent_class: error_wrapper_parent.defaults[:class].first,
          error_parent_with_errors_class: error_wrapper_parent.defaults[:error_class],

          error_tag: error_wrapper.defaults[:tag],
          error_class: error_wrapper.defaults[:class].first
        }
      end

      def input_with_client_side_validations(attribute_name, options = {}, &block)
        if options.key?(:validate)
          options[:input_html] ||= {}
          options[:input_html][:validate] = options[:validate]
          options.delete(:validate)
        end

        input_without_client_side_validations(attribute_name, options, &block)
      end
    end
  end
end

SimpleForm::FormBuilder.send(:include, ClientSideValidations::SimpleForm::FormBuilder)
