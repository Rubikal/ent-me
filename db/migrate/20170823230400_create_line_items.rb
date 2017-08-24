class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.integer :quantity
      t.belongs_to :order
      t.belongs_to :product

      t.timestamps
    end
  end
end
