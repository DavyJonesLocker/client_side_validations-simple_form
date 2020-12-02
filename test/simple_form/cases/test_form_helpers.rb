# frozen_string_literal: true

require 'action_view/test_helper'
require 'simple_form/cases/helper'

module ClientSideValidations
  module SimpleForm
    class FormHelperTest < ::ActionView::TestCase
      include ::ActionViewTestSetup
      include ::SimpleForm::ActionViewExtensions::FormHelper

      def setup
        super
        ::ActionView::TestCase::TestController.any_instance.stubs(:action_name).returns('edit')
      end

      def test_simple_form_for
        simple_form_for(@post, validate: true) do |f|
          concat f.input(:cost)
        end

        csv_data = {
          html_settings: {
            type:                'SimpleForm::FormBuilder',
            error_class:         'error',
            error_tag:           'span',
            wrapper_error_class: 'field_with_errors',
            wrapper_tag:         'div',
            wrapper_class:       'input',
            wrapper:             'default'
          },
          number_format: { separator: '.', delimiter: ',' },
          validators:    {
            'post[cost]' => {
              presence: [{ message: "can't be blank" }]
            }
          }
        }

        expected = %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-client-side-validations="#{CGI.escapeHTML(csv_data.to_json)}" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form>)

        assert_dom_equal expected, output_buffer
      end

      def test_nested_simple_fields_for_inherit_validation_settings
        post_with_category = Post.new
        post_with_category.category = Category.new

        simple_form_for(post_with_category, validate: true) do |f|
          concat f.simple_fields_for(:category) { |c|
            concat c.input(:title)
          }
        end

        csv_data = {
          html_settings: {
            type:                'SimpleForm::FormBuilder',
            error_class:         'error',
            error_tag:           'span',
            wrapper_error_class: 'field_with_errors',
            wrapper_tag:         'div',
            wrapper_class:       'input',
            wrapper:             'default'
          },
          number_format: { separator: '.', delimiter: ',' },
          validators:    {
            'post[category_attributes][title]' => {
              presence: [{ message: "can't be blank" }]
            }
          }
        }

        expected = %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-client-side-validations="#{CGI.escapeHTML(csv_data.to_json)}" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_category_title"><label class="string required" for="post_category_attributes_title"><abbr title="required">*</abbr> Title</label><input class="string required" required="required" aria-required="true" type="text" name="post[category_attributes][title]" id="post_category_attributes_title" /></div></form>)

        assert_dom_equal expected, output_buffer
      end

      def test_input_override
        simple_form_for(@post, validate: true) do |f|
          concat f.input(:cost, validate: false)
        end

        csv_data = {
          html_settings: {
            type:                'SimpleForm::FormBuilder',
            error_class:         'error',
            error_tag:           'span',
            wrapper_error_class: 'field_with_errors',
            wrapper_tag:         'div',
            wrapper_class:       'input',
            wrapper:             'default'
          },
          number_format: { separator: '.', delimiter: ',' },
          validators:    {}
        }

        expected = %(<form accept-charset="UTF-8" action="/posts" class="simple_form new_post" data-client-side-validations="#{CGI.escapeHTML(csv_data.to_json)}" id="new_post" method="post" novalidate="novalidate"><input name="utf8" type="hidden" value="&#x2713;" /><div class="input string required post_cost"><label class="string required" for="post_cost"><abbr title="required">*</abbr> Cost</label><input aria-required="true" class="string required" id="post_cost" name="post[cost]" required="required" type="text" /></div></form>)

        assert_dom_equal expected, output_buffer
      end

      private

      def client_side_form_settings_helper
        ''
      end
    end
  end
end
