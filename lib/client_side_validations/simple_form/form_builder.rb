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
    end
  end
end

SimpleForm::FormBuilder.prepend ClientSideValidations::SimpleForm::FormBuilder
