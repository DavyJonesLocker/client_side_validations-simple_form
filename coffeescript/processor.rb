# frozen_string_literal: true

$LOAD_PATH.unshift(File.expand_path('../lib', __dir__))

require 'client_side_validations/simple_form/version'
require 'coffee_script'
require 'erb'
require 'date'

module ClientSideValidations
  class Processor
    def self.run
      write_files
    end

    def self.root_path
      File.expand_path('..', __dir__)
    end

    def self.file_names
      Dir["#{root_path}/coffeescript/*.coffee"]
    end

    def self.template(coffeefile)
      ERB.new(File.open(coffeefile).read)
    end

    def self.compile(file_name)
      CoffeeScript.compile(template(file_name).result(binding))
    end

    def self.new_javascript_file(file_name)
      basename = File.basename(file_name, '.coffee')
      File.new(File.join(root_path, "vendor/assets/javascripts/#{basename}.js"), 'w')
    end

    def self.write_files
      file_names.each do |file_name|
        file = new_javascript_file(file_name)
        file << compile(file_name)
        file.close
      end
    end
  end
end
