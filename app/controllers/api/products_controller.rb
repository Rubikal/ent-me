class Api::ProductsController < ApplicationController

  def search
    query = params[:q]
    render json: Product.limit(10)
  end
end
