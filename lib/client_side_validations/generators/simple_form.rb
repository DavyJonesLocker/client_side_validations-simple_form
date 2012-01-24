module ClientSideValidations
  module Generators
    class SimpleForm
      def self.assets
        [{
          :path => File.expand_path('../../../../vendor/assets/javascripts', __FILE__),
          :file => 'rails.validations.simple_form.js'
        }]
      end

      Generators.register_assets(self)
    end
  end
end



