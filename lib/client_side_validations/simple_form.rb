# frozen_string_literal: true

require 'simple_form'
require 'client_side_validations'

require_relative 'simple_form/form_builder'

if defined?(Rails)
  require_relative 'simple_form/engine'
  require_relative 'generators/simple_form'
end
