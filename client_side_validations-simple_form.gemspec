# -*- encoding: utf-8 -*-
require File.expand_path('../lib/client_side_validations/simple_form/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'client_side_validations-simple_form'
  s.version     = ClientSideValidations::SimpleForm::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Brian Cardarella"]
  s.email       = ["bcardarella@gmail.com"]
  s.homepage    = 'https://github.com/dockyard/client_side_validations-simple_form'
  s.summary     = %q{SimpleForm Plugin for ClientSideValidations}
  s.description = %q{SimpleForm Plugin for ClientSideValidaitons}
  s.license     = 'MIT'

  s.files         = `git ls-files -- {lib/*,vendor/*,*.gemspec}`.split("\n")
  s.require_paths = ['lib']

  s.add_dependency 'client_side_validations', '~> 4.2.0'
  s.add_dependency 'simple_form', '~> 3.1'

  s.add_development_dependency 'rails', '>= 4.0.0', '< 5.0.0'
  s.add_development_dependency 'mocha', '~> 1.1'
  s.add_development_dependency 'm', '~> 1.3'
  s.add_development_dependency 'minitest', '>= 4.7.5', '< 6.0.0'
  s.add_development_dependency 'simplecov', '~> 0.9.1'
  s.add_development_dependency 'coveralls', '~> 0.7.2'
  s.add_development_dependency 'appraisal', '~> 1.0'

  # For QUnit testing
  s.add_development_dependency 'sinatra', '~> 1.4'
  s.add_development_dependency 'shotgun', '~> 0.9'
  s.add_development_dependency 'thin', '~> 1.6'
  s.add_development_dependency 'json', '~> 1.8'
  s.add_development_dependency 'coffee-script', '~> 2.3'
end
