# frozen_string_literal: true

module ClientSideValidations
  module SimpleForm
    module FormBuilder
      def client_side_form_settings(options, _form_helper)
        {
          type:                self.class.to_s,
          error_class:         wrapper_error_component.defaults[:class].join(' '),
          error_tag:           wrapper_error_component.defaults[:tag],
          wrapper_error_class: wrapper.defaults[:error_class],
          wrapper_tag:         wrapper.defaults[:tag],
          wrapper_class:       wrapper.defaults[:class].join(' '),
          wrapper:             options[:wrapper] || ::SimpleForm.default_wrapper
        }
      end

      def input(attribute_name, options = {}, &block)
        if options.key?(:validate)
          options[:input_html] ||= {}
          options[:input_html][:validate] = options[:validate]
          options.delete(:validate)
        end

        add_field_specific_wrapper_name_to_field_options(attribute_name, options, &block)

        super(attribute_name, options, &block)
      end

      private

      def wrapper_error_component
        if wrapper.components.map(&:namespace).include?(:error)
          wrapper.find(:error)
        else
          wrapper.find(:full_error)
        end
      end

      def add_field_specific_wrapper_name_to_field_options(attribute_name, options, &block)
        wrapper_name = options[:wrapper] || find_wrapper_mapping(find_input(attribute_name, options, &block).input_type)
        return if wrapper_name.nil?

        options[:input_html] ||= {}
        options[:input_html][:'data-client-side-validations-wrapper'] = wrapper_name
      end
    end
  end
end

SimpleForm::FormBuilder.prepend ClientSideValidations::SimpleForm::FormBuilder
