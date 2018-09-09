# frozen_string_literal: true

module ClientSideValidations
  module Generators
    class SimpleForm
      def self.assets
        [{
          path: File.expand_path('../../../vendor/assets/javascripts', __dir__),
          file: 'rails.validations.simple_form.js'
        },
         {
           path: File.expand_path('../../../vendor/assets/javascripts', __dir__),
           file: 'rails.validations.simple_form.bootstrap4.js'
         }]
      end

      Generators.register_assets(self)
    end
  end
end
