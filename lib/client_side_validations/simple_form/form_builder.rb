module ClientSideValidations
  module SimpleForm
    module FormBuilder

      def self.included(base)
        base.class_eval do
          def client_side_form_settings(options, form_helper)
            {
              :type => self.class.to_s,
              :error_class => ::SimpleForm.error_class,
              :error_tag => ::SimpleForm.error_tag,
              :wrapper_error_class => ::SimpleForm.wrapper_error_class,
              :wrapper_tag => ::SimpleForm.wrapper_tag
            }
          end
          alias_method_chain :input, :client_side_validations
        end
      end

      def input_with_client_side_validations(attribute_name, options = {}, &block)
        if options.key?(:validate)
          options[:input_html] ||= {}
          options[:input_html].merge!(:validate => options[:validate])
          options.delete(:validate)
        end

        input_without_client_side_validations(attribute_name, options, &block)
      end

    end
  end
end

SimpleForm::FormBuilder.send(:include, ClientSideValidations::SimpleForm::FormBuilder)
