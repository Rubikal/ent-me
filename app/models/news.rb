class News < ApplicationRecord
  mount_uploader :image, ::ImageUploader

  def image_url
    image.url if image
  end
end
