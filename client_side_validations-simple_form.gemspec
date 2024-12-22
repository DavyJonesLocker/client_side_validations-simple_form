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

  spec.metadata['rubygems_mfa_required'] = 'true'

  spec.metadata['bug_tracker_uri'] = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form/issues'
  spec.metadata['changelog_uri']   = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form/blob/main/CHANGELOG.md'
  spec.metadata['source_code_uri'] = 'https://github.com/DavyJonesLocker/client_side_validations-simple_form'

  spec.files         = Dir.glob('{CHANGELOG.md,LICENSE.md,README.md,lib/**/*.rb,vendor/**/*.js}', File::FNM_DOTMATCH)
  spec.require_paths = ['lib']

  spec.platform              = Gem::Platform::RUBY
  spec.required_ruby_version = '>= 3.1'

  spec.add_dependency 'client_side_validations', '>= 22.0', '< 24'
  spec.add_dependency 'simple_form', '~> 5.2'
end
