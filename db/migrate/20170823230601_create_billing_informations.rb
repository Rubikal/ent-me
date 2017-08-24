class CreateBillingInformations < ActiveRecord::Migration[5.1]
  def change
    create_table :billing_informations do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :address
      t.string :city
      t.string :postal_code
      t.string :country
      t.belongs_to :order

      t.timestamps
    end
  end
end
