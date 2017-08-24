class OrdersController < ApplicationController
  before_action :authenticate_user!

  def create
    data = cart.data

    ActiveRecord::Base.transaction do
      order = current_user.orders.create!(order_params.merge({ total_price: data[:total] }))

      BillingInformation.create!(billing_params.merge(order: order))
      ShippingInformation.create!(shipping_params.merge(order: order)) unless order.ship_to_same_address
      PaymentInformation.create!(payment_params.merge(order: order))

      data[:items].each do |item|
        order.line_items.create!(product_id: item[:id], quantity: item[:count])
      end
    end

    session[:cart] = {}  # Clear shopping cart

    render json: [], status: 200
  end

  def receipt
    @order = Order.includes(:line_items).last
    redirect_to root_path and return unless @order
  end

  private
  def cart
    @cart ||= Cart.new(session[:cart])
  end

  def order_params
    params.require(:order).permit(:shipping_cost, :shipping_method, :ship_to_same_address)
  end

  def billing_params
    params.require(:order).require(:billing_information).permit(:first_name, :last_name, :email, :phone, :address, :city, :postal_code, :country)
  end

  def shipping_params
    params.require(:order).require(:shipping_information).permit(:first_name, :last_name, :phone, :address, :city, :postal_code, :country)
  end

  def payment_params
    params.require(:order).require(:payment_information).permit(:first_name, :last_name, :account_number, :cvv, :expiration_date_month, :expiration_date_year)
  end
end
