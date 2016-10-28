# Sanity check to make sure the entire library loads OK

require 'base_helper'
require 'client_side_validations/simple_form'

SimpleForm.setup do
end

TestApp::Application.initialize!
