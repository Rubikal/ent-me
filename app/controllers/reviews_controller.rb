class ReviewsController < ApplicationController
  before_action :authenticate_user!

  def create
    product = Product.find(params[:product_id])
    product.reviews.create(review_params.merge(user: current_user))
    redirect_to product_path(product)
  end

  private
  def review_params
    params.require(:review).permit(:message, :rating)
  end
end
