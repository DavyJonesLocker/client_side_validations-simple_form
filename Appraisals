# frozen_string_literal: true

gem 'json', '< 3.0' # TODO: relax this constraint when rails/rails#58601 will be released

appraise 'csv-25.0' do
  gem 'client_side_validations', '~> 25.0'
end

appraise 'csv-edge' do
  gem 'client_side_validations', git: 'https://github.com/DavyJonesLocker/client_side_validations.git', branch: 'main'
end
