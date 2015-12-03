# -*- encoding: utf-8 -*-
require File.expand_path('../lib/client_side_validations/simple_form/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'client_side_validations-simple_form'
  s.version     = ClientSideValidations::SimpleForm::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Brian Cardarella"]
  s.email       = ["bcardarella@gmail.com"]
  s.homepage    = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form'
  s.summary     = %q{SimpleForm Plugin for ClientSideValidations}
  s.description = %q{SimpleForm Plugin for ClientSideValidations}
  s.license     = 'MIT'

  s.files         = `git ls-files -- {lib/*,vendor/*,*.gemspec}`.split("\n")
  s.require_paths = ['lib']

  s.add_dependency 'client_side_validations', '~> 4.2.0'
  s.add_dependency 'simple_form', '~> 3.2'

  s.add_development_dependency 'appraisal', '~> 2.1'
  s.add_development_dependency 'coveralls', '~> 0.8.10'
  s.add_development_dependency 'm', '~> 1.4'
  s.add_development_dependency 'minitest', '>= 4.7.5', '< 6.0.0'
  s.add_development_dependency 'mocha', '~> 1.1'
  s.add_development_dependency 'simplecov', '~> 0.11.1'

  if Gem::Version.new(RUBY_VERSION.dup) >= Gem::Version.new('2.0')
    s.add_development_dependency 'byebug', '~> 8.2'
  else
    s.add_development_dependency 'debugger', '~> 1.6'
  end

  # For QUnit testing
  s.add_development_dependency 'sinatra', '~> 1.4'
  s.add_development_dependency 'shotgun', '~> 0.9.1'
  s.add_development_dependency 'thin', '~> 1.6'
  s.add_development_dependency 'json', '~> 1.8'
  s.add_development_dependency 'coffee-script', '~> 2.4'
end
