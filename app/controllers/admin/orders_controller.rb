class Admin::OrdersController < ApplicationController
  layout 'admin_application'

  def index
    @orders = Order.page(params[:page])
  end

  def fulfill
    @order = Order.find(params[:id])
    @order.fulfill
    redirect_to admin_orders_path
  end

  def cancel
    @order = Order.find(params[:id])
    @order.cancel
    redirect_to admin_orders_path
  end

  def show
    @order = Order.find(params[:id])
  end
end
