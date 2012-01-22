require 'simple_form/cases/helper'

class ClientSideValidations::SimpleForm::EngineTest < Test::Unit::TestCase
  def test_client_side_form_js_hash
    assert defined?(ClientSideValidations::SimpleForm::Engine)
  end
end
