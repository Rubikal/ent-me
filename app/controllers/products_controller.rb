class ProductsController < ApplicationController
  before_filter :load_class

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
