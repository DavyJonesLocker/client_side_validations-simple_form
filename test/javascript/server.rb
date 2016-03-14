require 'bundler'
Bundler.setup
require 'sinatra'
require 'json'
if RUBY_VERSION >= '2.0.0'
  require 'byebug'
else
  require 'debugger'
end
require File.join(File.expand_path('../../..', __FILE__), 'coffeescript/processor')

ClientSideValidations::Processor.run

rails_validations_path = Bundler.load.specs.find { |s| s.name == 'client_side_validations' }
raise 'Client Side Validations bundle not found' if rails_validations_path.nil?

class AssetPath
  def initialize(app, options = {})
    @app = app
    @urls = options[:urls] || ['/favicon.ico']
    @index = options[:index]
    root = options[:root] || Dir.pwd
    cache_control = options[:cache_control]
    @file_server = Rack::File.new(root, cache_control)
  end

  def overwrite_file_path(path)
    @urls.is_a?(Hash) && @urls.key?(path) || @index && path == '/'
  end

  def route_file(path)
    @urls.is_a?(Array) && @urls.any? { |url| path.index(url) == 0 }
  end

  def can_serve(path)
    route_file(path) || overwrite_file_path(path)
  end

  def call(env)
    path = env['PATH_INFO']

    if can_serve(path)
      env['PATH_INFO'] = (path == '/' ? @index : @urls[path]) if overwrite_file_path(path)
      response = @file_server.call(env)
      if response.first == 404
        @app.call(env)
      else
        response
      end
    else
      @app.call(env)
    end
  end
end

use AssetPath, urls: ['/vendor/assets/javascripts'], root: rails_validations_path.full_gem_path
use AssetPath, urls: ['/vendor/assets/javascripts'], root: File.expand_path('../..', settings.root)

JQUERY_VERSIONS = %w(1.7.0 1.7.1 1.7.2 1.8.0 1.8.1 1.8.2 1.8.3 1.9.0 1.9.1 1.10.0 1.10.1 1.10.2 1.11.0 1.11.1 1.11.2 1.11.3 1.12.0 1.12.1).freeze

helpers do
  def jquery_link(version)
    if params[:version] == version
      "[#{version}]"
    else
      "<a href='/?version=#{version}'>#{version}</a>"
    end
  end

  def jquery_src
    if params[:version] == 'edge' then '/vendor/jquery.js'
    else "http://code.jquery.com/jquery-#{params[:version]}.js"
    end
  end

  def test_base
    names = ['/vendor/qunit.js', 'settings']
    names.map { |name| script_tag name }.join("\n")
  end

  def test(*types)
    types.map do |type|
      Dir.glob(File.expand_path("public/test/#{type}", settings.root) + '/*.js').map { |file| File.basename(file) }.map do |file|
        script_tag "/test/#{type}/#{file}"
      end.join("\n")
    end.join("\n")
  end

  def script_tag(src)
    src = "/test/#{src}.js" unless src.index('/')
    %(<script src='#{src}' type='text/javascript'></script>)
  end

  def jquery_versions
    JQUERY_VERSIONS
  end
end

get '/' do
  params[:version] ||= JQUERY_VERSIONS.last
  erb :index
end
