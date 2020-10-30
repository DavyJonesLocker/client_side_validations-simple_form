# frozen_string_literal: true

# Sanity check to make sure the entire library loads OK

require 'base_helper'
require 'client_side_validations/simple_form'

SimpleForm.setup do
  # Sanity check
end

TestApp::Application.initialize!
