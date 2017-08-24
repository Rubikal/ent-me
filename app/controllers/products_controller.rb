class ProductsController < ApplicationController
  before_action :load_class

  def home
    @products = Product.featured.take(3)
    @featured = @products.any?

    unless @featured
      @products = Product.take(3)
    end
  end

  def autocomplete
    products = Product.select(:id, :title).search_by_title(params[:keyward]).with_pg_search_highlight
    render json: products, status: 200
  end

  def index
    @products = @klass.page(params[:page] || 1).per(6)
    if @category = params[:category]
      @products = @products.by_category(@category)
    end
    @categories = @klass.categories.keys
    @products_categories_count = @klass.group(:category).count
    @type = params[:type]
  end

  def show
    @product = Product.find params[:id]
    @reviews = @product.reviews.includes(:user)
    @reviews_rating = @reviews.average_rating

    @review = @product.reviews.new if current_user
  end

  def search
    @search = params[:keyward]
    @products = Product.search(@search)
  end

  protected
  def load_class
    @klass = params[:type].singularize.classify.constantize rescue Product
  end
end
