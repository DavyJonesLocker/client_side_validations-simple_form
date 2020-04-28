# frozen_string_literal: true

users_table = %{CREATE TABLE roles (id INTEGER PRIMARY KEY, name VARCHAR(255), permissions VARCHAR(255)); }
ActiveRecord::Base.connection.execute(users_table)

class Role < ApplicationRecord
  has_and_belongs_to_many :users
end
