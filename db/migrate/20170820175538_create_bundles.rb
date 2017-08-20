class CreateBundles < ActiveRecord::Migration[5.1]
  def change
    create_table :bundles do |t|
      t.float :discount_percentage, null: false
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
