class AddIndexToProductsCategory < ActiveRecord::Migration[5.1]
  def change
    add_index :products, :category
  end
end
