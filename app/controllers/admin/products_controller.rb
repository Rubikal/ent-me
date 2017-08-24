class Admin::ProductsController < Admin::AdminController
  before_action :constrain_type
  before_action :require_type, only: [:new, :create]
  before_action :load_class, only: [:index, :new, :create]

  def index
    @products = @klass.page(params[:page])
    if params[:category]
      @products = @products.by_category(params[:category])
    end
  end

  def show
    @product = Product.find(params[:id])
  end

  def new
    @product = @klass.new
  end

  def create
    @product = @klass.new product_params
    if @product.save
      redirect_to admin_products_path
    else
      render :new
    end
  end

  def update
    @product = Product.find(params[:id])
    if @product.update_attributes(product_params)
      redirect_to admin_product_path(@product)
    else
      render :show
    end
  end

  protected
  def load_class
    @klass = params[:type].singularize.classify.constantize rescue Product
  end

  def product_params
    case params[:type]
    when 'film'
      film_params
    when 'music'
      music_params
    when 'game'
      game_params
    end
  end

  def film_params
    params.require(:film).permit(:title, :description, :category, :price, :duration, :number_of_discs, :format, :image)
  end

  def music_params
    params.require(:film).permit(:title, :description, :category, :price, :format, :released_at, :image)
  end

  def game_params
    params.require(:film).permit(:title, :description, :category, :price, :released_at, :image)
  end

  def constrain_type
    head(:bad_request) if params[:type].present? && !(params[:type] =~ /^(#{Product::TYPES.join('|')})$/)
  end

  def require_type
    head(:bad_request) if !params[:type].present?
  end
end
