# -*- encoding: utf-8 -*-
require File.expand_path('../lib/client_side_validations/simple_form/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Brian Cardarella"]
  gem.email         = ["bcardarella@gmail.com"]
  gem.description   = %q{SimpleForm Plugin for ClientSideValidaitons}
  gem.summary       = %q{SimpleForm Plugin for ClientSideValidations}
  gem.homepage      = 'https://github.com/dockyard/client_side_validations-simple_form'

  gem.files         = `git ls-files -- {lib/*,vendor/*,*.gemspec}`.split("\n")
  gem.name          = 'client_side_validations-simple_form'
  gem.require_paths = ['lib']
  gem.version       = ClientSideValidations::SimpleForm::VERSION

  gem.add_dependency 'client_side_validations', '~> 3.2.0.beta.1'
  gem.add_dependency 'simple_form', '~> 1.5.0'

  gem.add_development_dependency 'rails', '~> 3.2.0'
  gem.add_development_dependency 'mocha'

  # For QUnit testing
  gem.add_development_dependency 'sinatra', '~> 1.0'
  gem.add_development_dependency 'shotgun'
  gem.add_development_dependency 'thin'
  gem.add_development_dependency 'json'
  gem.add_development_dependency 'coffee-script'
end
