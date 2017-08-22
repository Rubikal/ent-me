class CartsController < ApplicationController
  def index
    render json: cart.data, status: 200
  end

  def add
    product = cart.add_product(params[:id], params[:count])
    session[:cart] = cart.info

    render json: cart.data, status: 200
  end

  def remove
    cart.remove_product(params[:id])
    session[:cart] = cart.info

    render json: cart.data, status: 200
  end

  private

  def cart
    @cart ||= Cart.new(session[:cart])
  end
end
