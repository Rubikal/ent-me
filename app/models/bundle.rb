class Bundle < ApplicationRecord
  has_many :bundle_products, autosave: true, dependent: :destroy
  has_many :products, through: :bundle_products, autosave: true

  validates :discount_percentage, presence: true
  validates :discount_percentage, inclusion: { :in => 1..100 }
  validates :products, presence: true
  validates :products, :length => { :minimum => 2, message: "count has to be at least 2" }


  def title
    self.products.first.title rescue nil
  end

  def image
    self.products.first.image rescue nil
  end

  def as_json(options = nil)
    {
      id: self.id,
      title: self.title,
      products: self.products.map(&:as_json),
      discount_percentage: self.discount_percentage
    }
  end
end
