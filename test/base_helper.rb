# frozen_string_literal: true

# Configure Rails Environment
ENV['RAILS_ENV'] = 'test'

require 'simplecov'

SimpleCov.start do
  if ENV['CI']
    source_in_json false

    formatter SimpleCov::Formatter::JSONFormatter
  end

  skip %w[version.rb]
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
