class Product < ApplicationRecord
  TYPES = %w(music film game)
  # Relations
  has_many :bundle_products
  has_many :bundles, through: :bundle_products
  has_many :reviews do
    def average_rating
      average(:rating).to_f
    end
  end

  # Scopes
  scope :featured, ->{ where(featured: true) }
  scope :by_category, -> (category) { where(category: category) }
end
