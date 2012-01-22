source 'http://rubygems.org'

gemspec

ruby_minor_version = RUBY_VERSION.split('.')[1].to_i
if ruby_minor_version == 8
  gem 'minitest'
  gem 'ruby-debug'
elsif ruby_minor_version == 9
  gem 'ruby-debug19', :require => 'ruby-debug'
end

