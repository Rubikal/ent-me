class Product < ApplicationRecord
  mount_uploader :image, ::ImageUploader

  TYPES = %w(music film game)
  # Relations
  has_many :bundle_products
  has_many :bundles, through: :bundle_products
  has_many :reviews do
    def average_rating
      average(:rating).to_f
    end
  end

  # Validations
  validates :price, presence: true

  # Scopes
  scope :featured, ->{ where(featured: true) }
  scope :search, ->(keyward){ where("title ilike ?", "%#{keyward}%") }
  scope :by_category, -> (category) { where(category: category) }

  def image_url
    image.url if image
  end
end
