class Admin::ReviewsController < Admin::AdminController

  def index
    @product = Product.find(params[:product_id])
    @reviews = @product.reviews
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    redirect_to admin_product_reviews_path(product_id: params[:product_id])
  end
end
