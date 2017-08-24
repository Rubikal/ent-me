class CheckoutController < ApplicationController
  def index
    @cart_empty = cart.empty?
    @cart_total = cart.total
  end

  private

  def cart
    @cart ||= Cart.new(session[:cart])
  end
end
