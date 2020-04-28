# frozen_string_literal: true

users_table = %{CREATE TABLE users (id INTEGER PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), department_id INTEGER); }
ActiveRecord::Base.connection.execute(users_table)

class User < ApplicationRecord
  validates :roles, length: { maximum: 99 }

  has_and_belongs_to_many :roles
  belongs_to :department, optional: false
end
