require 'action_view/test_helper'
require 'simple_form/cases/helper'

class ClientSideValidations::SimpleForm::FormHelperTest < MiniTest::Test
  include ActionViewTestSetup
  include SimpleForm::ActionViewExtensions::FormHelper

  def client_side_form_settings_helper
    ""
  end

  def setup
    super
    ActionView::TestCase::TestController.any_instance.stubs(:action_name).returns('edit')
  end

  def test_simple_form_for
    simple_form_for(@post, validate: true) do |f|
      concat f.input(:cost)
    end

    expected = %{<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input class="string required" id="post_cost" name="post[cost]" required="required" size="50" type="text" /></div></form><script>//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.remote_validators_prefix===undefined)window.ClientSideValidations.remote_validators_prefix='';if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"error_class\":\"error\",\"error_tag\":\"span\",\"wrapper_error_class\":\"field_with_errors\",\"wrapper_tag\":\"div\",\"wrapper_class\":\"input\",\"wrapper\":\"default\",\"validators\":{\"post[cost]\":{\"presence\":[{\"message\":\"can't be blank\"}]}}};\n//]]></script>}
    assert_equal expected, output_buffer, "\n\n *** If you're running Ruby 1.8 and this test fails is is most likely due to 1.8's lack of insertion order persistence with Hashes ***\n"
  end

  def test_input_override
    simple_form_for(@post, validate: true) do |f|
      concat f.input(:cost, validate: false)
    end

    expected = %{<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-validate="true" id="new_post" method="post" novalidate="novalidate"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input class="string required" id="post_cost" name="post[cost]" required="required" size="50" type="text" /></div></form><script>//<![CDATA[\nif(window.ClientSideValidations===undefined)window.ClientSideValidations={};window.ClientSideValidations.disabled_validators=[];window.ClientSideValidations.number_format={\"separator\":\".\",\"delimiter\":\",\"};if(window.ClientSideValidations.patterns===undefined)window.ClientSideValidations.patterns = {};window.ClientSideValidations.patterns.numericality=/^(-|\\+)?(?:\\d+|\\d{1,3}(?:\\,\\d{3})+)(?:\\.\\d*)?$/;if(window.ClientSideValidations.remote_validators_prefix===undefined)window.ClientSideValidations.remote_validators_prefix='';if(window.ClientSideValidations.forms===undefined)window.ClientSideValidations.forms={};window.ClientSideValidations.forms['new_post'] = {\"type\":\"SimpleForm::FormBuilder\",\"error_class\":\"error\",\"error_tag\":\"span\",\"wrapper_error_class\":\"field_with_errors\",\"wrapper_tag\":\"div\",\"wrapper_class\":\"input\",\"wrapper\":\"default\",\"validators\":{}};\n//]]></script>}
    assert_equal expected, output_buffer, "\n\n *** If you're running Ruby 1.8 and this test fails is is most likely due to 1.8's lack of insertion order persistence with Hashes ***\n"
  end
end
