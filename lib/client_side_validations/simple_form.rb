# frozen_string_literal: true

require 'simple_form'
require 'client_side_validations'
require 'client_side_validations/simple_form/form_builder'

if defined?(::Rails)
  require 'client_side_validations/simple_form/engine'
  require 'client_side_validations/generators/simple_form'
end
