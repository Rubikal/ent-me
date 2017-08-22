class ProductsController < ApplicationController
  before_action :load_class

  def home
    @products = Product.featured.take(3)
    @featured = @products.any?

    unless @featured
      @products = Product.take(3)
    end
  end

  def index
    @products = @klass.page(params[:page])
    if params[:category]
      @products = @products.by_category(params[:category])
    end
  end

  protected
  def load_class
    @klass = params[:type].singularize.classify.constantize rescue Product
  end
end
