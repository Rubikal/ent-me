class Product < ApplicationRecord
  has_many :bundle_products
  has_many :bundles, through: :bundle_products

  scope :featured, ->{ where(featured: true) }
end
