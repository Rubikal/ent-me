class Product < ApplicationRecord
  scope :featured, ->{ where(featured: true) }
end
