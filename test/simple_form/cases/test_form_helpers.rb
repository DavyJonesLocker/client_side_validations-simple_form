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

        expected =
          if Rails.version.starts_with?('4.0')
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{\"post[cost]\":{\"presence\":[{\"message\":\"can't be blank\"}]}}};\n//]]>\n</script>)
          elsif Rails.version.starts_with?('4.1')
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="display:none"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{\"post[cost]\":{\"presence\":[{\"message\":\"can't be blank\"}]}}};\n//]]>\n</script>)
          else
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{\"post[cost]\":{\"presence\":[{\"message\":\"can't be blank\"}]}}};\n//]]>\n</script>)
          end

        assert_dom_equal expected, output_buffer
      end

      def test_input_override
        simple_form_for(@post, validate: true) do |f|
          concat f.input(:cost, validate: false)
        end

        expected =
          if Rails.version.starts_with?('4.0')
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{}};\n//]]>\n</script>)
          elsif Rails.version.starts_with?('4.1')
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="display:none"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{}};\n//]]>\n</script>)
          else
            %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form><script>\n//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[\"uniqueness\"];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"wrapper\":\"default\",\"field_tag\":\"div\",\"field_class\":\"input\",\"field_with_errors_class\":\"field_with_errors\",\"error_parent_tag\":\"div\",\"error_parent_class\":\"input\",\"error_parent_with_errors_class\":\"field_with_errors\",\"error_tag\":\"span\",\"error_class\":\"error\",\"validators\":{}};\n//]]>\n</script>)
          end

        assert_dom_equal expected, output_buffer
      end
    end
  end
end
