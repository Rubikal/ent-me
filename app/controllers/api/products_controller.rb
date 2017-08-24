class Api::ProductsController < ApplicationController

  def search
    query = params[:q]
    render json: Product.search_by_title(query).limit(10)
  end
end
