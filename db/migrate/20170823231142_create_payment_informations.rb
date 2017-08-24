class CreatePaymentInformations < ActiveRecord::Migration[5.1]
  def change
    create_table :payment_informations do |t|
      t.string :first_name
      t.string :last_name
      t.string :account_number
      t.string :cvv
      t.integer :expiration_date_month
      t.integer :expiration_date_year
      t.belongs_to :order

      t.timestamps
    end
  end
end
