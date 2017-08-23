class Cart
  def initialize cart
    @cart = cart || {}
  end

  def add_product product, count, set
    count = count.present? ? count.to_i : 1

    if has_item? product
      cart[product] = set ? count : (item_count(product) + count)
    else
      cart[product] = count
    end
  end

  def remove_product product
    if has_item? product
      cart.delete(product)
    end
  end

  def data
    {items: items, count: count, total: total}
  end

  def info
    cart
  end

  def empty?
    cart.keys.length == 0
  end

  def total
    return 0 if empty?

    products.map do |product|
      product.price * cart[product.id.to_s]
    end.sum.round(2)
  end

  private

  def count
    cart.keys.count
  end

  def products
    @products ||= Product.where(id: cart.keys)
  end

  def items
    return [] if empty?

    products.map do |product|
      product_info(product)
    end
  end

  def has_item? product
    cart.keys.include? product
  end

  def item_count product
    cart.fetch(product.to_s, 0)
  end

  def product_info product
    {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url,
      count: item_count(product.id)
    }
  end

  attr_reader :cart
end

# Cart should looks like {product_id: count, product_id_2: count, ...}
