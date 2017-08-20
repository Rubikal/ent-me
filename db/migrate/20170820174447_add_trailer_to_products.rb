class AddTrailerToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :trailer, :text
  end
end
