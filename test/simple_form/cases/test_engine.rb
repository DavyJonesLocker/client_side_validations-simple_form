require 'simple_form/cases/helper'

module ClientSideValidations
  module SimpleForm
    class EngineTest < MiniTest::Test
      def test_client_side_form_js_hash
        assert defined?(ClientSideValidations::SimpleForm::Engine)
      end
    end
  end
end
