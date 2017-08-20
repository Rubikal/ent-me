class Product < ApplicationRecord
  has_many :bundle_products
  has_many :bundles, through: :bundle_products
  has_many :reviews do
    def average_rating
      average(:rating).to_f
    end
  end

  scope :featured, ->{ where(featured: true) }
end
