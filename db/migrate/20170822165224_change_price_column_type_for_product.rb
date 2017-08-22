class ChangePriceColumnTypeForProduct < ActiveRecord::Migration[5.1]
  def change
    change_column :products, :price, 'float USING price::double precision'
  end
end
