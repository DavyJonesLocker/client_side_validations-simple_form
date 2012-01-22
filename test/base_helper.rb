require 'rubygems'
require 'bundler'
Bundler.setup
require 'test/unit'
require 'mocha'

module Rails
  def self.env
    self
  end

  def self.development?
    false
  end
end

module ClientSideValidations; end
