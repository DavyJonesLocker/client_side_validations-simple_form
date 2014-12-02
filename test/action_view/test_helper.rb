require 'base_helper'
require 'action_view'
require 'action_view/models'
require 'client_side_validations/action_view'

module ActionController
  class Base
    include ActionDispatch::Routing::RouteSet.new.url_helpers
  end
end

module ActionViewTestSetup
  include ::ClientSideValidations::ActionView::Helpers::FormHelper
  include ::ClientSideValidations::ActionView::Helpers::FormTagHelper

  def form_for(*)
    @output_buffer = super
  end

  Routes = ActionDispatch::Routing::RouteSet.new
  include Routes.url_helpers
  def _routes
    Routes
  end

  Routes.draw do
    resources :posts
  end

  def default_url_options
    { only_path: true }
  end

  def url_for(object)
    @url_for_options = object
    if object.is_a?(Hash) && object[:use_route].blank? && object[:controller].blank?
      object.merge!(controller: "main", action: "index")
    end
    super
  end

  def setup
    super
    @post = Post.new

    if defined?(ActionView::OutputFlow)
      @view_flow        = ActionView::OutputFlow.new
    else
      @_content_for     = Hash.new { |h,k| h[k] = ActiveSupport::SafeBuffer.new }
    end
  end

  protected
    def posts_path(options={})
      "/posts"
    end

    def post_path(post, options = {})
      if options[:format]
        "/posts/#{post.id}.#{options[:format]}"
      else
        "/posts/#{post.id}"
      end
    end

    def protect_against_forgery?
      false
    end
end
