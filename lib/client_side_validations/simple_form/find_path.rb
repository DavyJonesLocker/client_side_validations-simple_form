module SimpleForm
  module Wrappers
    class Many
      def find_path(name, current_path = [self])
        return current_path if namespace == name

        @components.each do |c|
          return nil if c.is_a?(Symbol) && c == namespace
          path = c.find_path(name, current_path + [c])
          return path unless path.nil?
        end

        nil
      end
    end

    class Leaf
      def find_path(name, current_path = [self])
        current_path if @namespace == name
      end
    end
  end
end
