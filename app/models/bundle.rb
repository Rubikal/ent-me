class Bundle < ApplicationRecord
  has_many :bundle_products
  has_many :products, through: :bundle_products

  validates :discount_percentage, presence: true
  validates :products, presence: true # Bundle should has at least 1 product
end
