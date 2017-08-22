module ApplicationHelper
  def nav_name_for product
    product.class.to_s.downcase.pluralize
  end

  def review_time review
    review.created_at.strftime("%I:%M %P")
  end

  def review_date review
    review.created_at.strftime("%-d %b %Y")
  end
end
