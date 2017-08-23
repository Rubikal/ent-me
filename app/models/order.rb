class Order < ApplicationRecord
  belongs_to :user
  has_many :line_items
  has_one :billing_information
  has_one :shipping_information
  has_one :payment_information
end
