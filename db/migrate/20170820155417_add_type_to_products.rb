class AddTypeToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :type, :string, null: false
  end
end
