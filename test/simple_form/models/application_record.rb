# frozen_string_literal: true

require 'active_record'

# Connection must be establised before anything else
ActiveRecord::Base.establish_connection(
  adapter:  defined?(JRUBY_VERSION) ? 'jdbcsqlite3' : 'sqlite3',
  database: ':memory:'
)

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
