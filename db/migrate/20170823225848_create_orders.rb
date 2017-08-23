class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.float :total_price
      t.float :shipping_cost
      t.string :shipping_method
      t.boolean :ship_to_same_address
      t.belongs_to :user

      t.timestamps
    end
  end
end
