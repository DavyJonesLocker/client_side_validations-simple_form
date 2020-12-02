# frozen_string_literal: true

require 'base_helper'

require 'rails/generators/test_case'
require 'client_side_validations/simple_form'
require 'generators/client_side_validations/copy_assets_generator'
require 'generators/client_side_validations/install_generator'

class CopyAssetsGeneratorTest < Rails::Generators::TestCase
  tests ClientSideValidations::Generators::CopyAssetsGenerator
  destination File.expand_path('../tmp', __dir__)
  setup :prepare_destination

  test 'Assert file is properly created when no asset pipeline present' do
    stub_configuration
    run_generator
    assert_file 'public/javascripts/rails.validations.simple_form.js'
    assert_file 'public/javascripts/rails.validations.simple_form.bootstrap4.js'
  end

  private

  def stub_configuration
    Rails.stubs(:configuration).returns(mock('Configuration'))
  end
end
