class OrdersController < ApplicationController
  # before_action :authenticate_user!

  def create
    session[:cart] = {}
    redirect_to receipt_orders_path
  end

  def receipt
    @order = Order.includes(:line_items).last
    redirect_to root_path and return unless @order
  end
end
