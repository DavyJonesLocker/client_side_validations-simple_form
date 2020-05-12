# frozen_string_literal: true

class Post
  extend ActiveModel::Naming
  extend ActiveModel::Translation
  include ActiveModel::Validations
  include ActiveModel::Conversion

  attr_accessor :title, :author_name, :body, :secret, :written_on, :cost

  validates :cost, presence: true

  def initialize(params = {})
    params.each do |attr, value|
      public_send("#{attr}=", value)
    end
  end

  def persisted?
    false
  end

  attr_accessor :comments, :comment_ids

  def comments_attributes=(attributes); end

  attr_accessor :category

  def category_attributes=(attributes); end
end
