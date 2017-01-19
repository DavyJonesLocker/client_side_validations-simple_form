require 'action_view/test_helper'
require 'simple_form/cases/helper'

module ClientSideValidations
  module SimpleForm
    class FormHelperTest < ::ActionView::TestCase
      include ::ActionViewTestSetup
      include ::SimpleForm::ActionViewExtensions::FormHelper

      def client_side_form_settings_helper
        ''
      end

      def setup
        super
        ::ActionView::TestCase::TestController.any_instance.stubs(:action_name).returns('edit')
      end

      def test_simple_form_for
        simple_form_for(@post, validate: true) do |f|
          concat f.input(:cost)
        end

        expected = %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"error_class\":\"error\",\"error_tag\":\"span\",\"wrapper_error_class\":\"field_with_errors\",\"wrapper_tag\":\"div\",\"wrapper_class\":\"input\",\"wrapper\":\"default\",\"validators\":{\"post[cost]\":{\"presence\":[{\"message\":\"can't be blank\"}]}}};\n//]]>\n</script>)

        assert_dom_equal expected, output_buffer
      end

      def test_input_override
        simple_form_for(@post, validate: true) do |f|
          concat f.input(:cost, validate: false)
        end

        expected = %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"error_class\":\"error\",\"error_tag\":\"span\",\"wrapper_error_class\":\"field_with_errors\",\"wrapper_tag\":\"div\",\"wrapper_class\":\"input\",\"wrapper\":\"default\",\"validators\":{}};\n//]]>\n</script>)

        assert_dom_equal expected, output_buffer
      end
    end
  end
end
