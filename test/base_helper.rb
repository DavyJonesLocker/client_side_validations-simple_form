# frozen_string_literal: true

# Configure Rails Environment
ENV['RAILS_ENV'] = 'test'

require 'simplecov'

SimpleCov.start 'rails' do
  if ENV['CI']
    require 'simplecov-lcov'

    SimpleCov::Formatter::LcovFormatter.config do |c|
      c.report_with_single_file = true
      c.single_report_path = 'coverage/lcov.info'
    end

    formatter SimpleCov::Formatter::LcovFormatter
  end

  add_filter %w[version.rb]
end

require 'rubygems'
require 'minitest/autorun'
require 'byebug'
require 'mocha/minitest'
require 'rails'

module TestApp
  class Application < Rails::Application
    config.try :load_defaults, "#{Rails::VERSION::MAJOR}.#{Rails::VERSION::MINOR}"

    config.root = __dir__
    config.active_support.deprecation = :log
    config.active_support.test_order = :random
    config.eager_load = false
    config.secret_key_base = '42'
    I18n.enforce_available_locales = true
  end
end

module ClientSideValidations; end
