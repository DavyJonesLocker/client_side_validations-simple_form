# frozen_string_literal: true

users_table = %{CREATE TABLE departments (id INTEGER PRIMARY KEY, name VARCHAR(255)); }
ActiveRecord::Base.connection.execute(users_table)

class Department < ApplicationRecord
  has_many :users
end
