# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'client_side_validations/simple_form/version'

Gem::Specification.new do |spec|
  spec.name        = 'client_side_validations-simple_form'
  spec.version     = ClientSideValidations::SimpleForm::VERSION
  spec.authors     = ['Geremia Taglialatela', 'Brian Cardarella']
  spec.email       = ['tagliala.dev@gmail.com', 'bcardarella@gmail.com']

  spec.summary     = 'SimpleForm Plugin for ClientSideValidations'
  spec.description = 'SimpleForm Plugin for ClientSideValidations'
  spec.homepage    = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form'
  spec.license     = 'MIT'

  spec.platform    = Gem::Platform::RUBY

  spec.files         = `git ls-files -z -- {README.md,lib,vendor}`.split("\x0")
  spec.require_paths = ['lib']

  spec.add_dependency 'client_side_validations', '~> 4.2.0'
  spec.add_dependency 'simple_form', '~> 3.2'

  spec.add_development_dependency 'appraisal', '~> 2.1'
  spec.add_development_dependency 'coveralls', '~> 0.8.11'
  spec.add_development_dependency 'm', '~> 1.4'
  spec.add_development_dependency 'minitest', '>= 4.7.5', '< 6.0.0'
  spec.add_development_dependency 'mocha', '~> 1.1'
  spec.add_development_dependency 'rubocop', '~> 0.37.2'
  spec.add_development_dependency 'simplecov', '~> 0.11.2'

  if Gem::Version.new(RUBY_VERSION.dup) >= Gem::Version.new('2.0')
    spec.add_development_dependency 'byebug', '~> 8.2'
  else
    spec.add_development_dependency 'debugger', '~> 1.6'
  end

  # For QUnit testing
  spec.add_development_dependency 'sinatra', '~> 1.4'
  spec.add_development_dependency 'shotgun', '~> 0.9.1'
  spec.add_development_dependency 'thin', '~> 1.6'
  spec.add_development_dependency 'json', '~> 1.8'
  spec.add_development_dependency 'coffee-script', '~> 2.4'
end
