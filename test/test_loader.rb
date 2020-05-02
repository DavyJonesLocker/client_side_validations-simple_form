# frozen_string_literal: true

# Sanity check to make sure the entire library loads OK

require 'base_helper'
require 'client_side_validations/simple_form'

SimpleForm.setup do |config|
  config.wrappers :custom_date_wrapper, tag: 'div' do |b|
    b.use :input, class: 'form-control'
  end
end

TestApp::Application.initialize!
