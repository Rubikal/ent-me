class Order < ApplicationRecord
  enum status: [:open, :fulfilled, :cancelled]

  # Relations
  belongs_to :user
  has_many :line_items
  has_one :billing_information
  has_one :shipping_information
  has_one :payment_information

  def total
    self.line_items.map(&:product).map(&:price).sum + self.shipping_cost
  end

  def fulfill
    self.fulfilled!
  end

  def cancel
    self.cancelled!
  end
end
