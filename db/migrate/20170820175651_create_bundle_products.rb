class CreateBundleProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :bundle_products do |t|
      t.references :bundle, foreign_key: true
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
