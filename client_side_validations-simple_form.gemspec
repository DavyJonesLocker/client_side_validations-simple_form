# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'client_side_validations/simple_form/version'

Gem::Specification.new do |spec|
  spec.name        = 'client_side_validations-simple_form'
  spec.version     = ClientSideValidations::SimpleForm::VERSION
  spec.authors     = ['Geremia Taglialatela', 'Brian Cardarella']
  spec.email       = ['tagliala.dev@gmail.com', 'bcardarella@gmail.com']

  spec.summary     = 'ClientSideValidations SimpleForm'
  spec.description = 'SimpleForm Plugin for ClientSideValidations'
  spec.homepage    = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form'
  spec.license     = 'MIT'

  spec.metadata['bug_tracker_uri'] = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form/issues'
  spec.metadata['changelog_uri']   = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form/blob/master/CHANGELOG.md'
  spec.metadata['source_code_uri'] = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form'

  spec.files         = `git ls-files -z -- {CHANGELOG.md,LICENSE.md,README.md,lib,vendor}`.split("\x0")
  spec.require_paths = ['lib']

  spec.platform              = Gem::Platform::RUBY
  spec.required_ruby_version = '~> 2.4'

  spec.add_dependency 'client_side_validations', '>= 15.0', '< 18.0'
  spec.add_dependency 'simple_form', '~> 5.0'

  spec.add_development_dependency 'appraisal', '~> 2.3'
  spec.add_development_dependency 'byebug', '~> 11.1'
  spec.add_development_dependency 'coveralls_reborn', '~> 0.19.0'
  spec.add_development_dependency 'm', '~> 1.5'
  spec.add_development_dependency 'minitest', '~> 5.14'
  spec.add_development_dependency 'mocha', '~> 1.11'
  spec.add_development_dependency 'rake', '~> 13.0'
  spec.add_development_dependency 'rubocop', '~> 1.5'
  spec.add_development_dependency 'rubocop-minitest', '~> 0.10.1'
  spec.add_development_dependency 'rubocop-performance', '~> 1.9'
  spec.add_development_dependency 'rubocop-rails', '~> 2.8'
  spec.add_development_dependency 'rubocop-rake', '~> 0.5.1'
  spec.add_development_dependency 'simplecov', '>= 0.18.5', '< 0.21'

  # For QUnit testing
  spec.add_development_dependency 'shotgun', '~> 0.9.2'
  spec.add_development_dependency 'sinatra', '~> 2.0'
  spec.add_development_dependency 'thin', '~> 1.7'
end
