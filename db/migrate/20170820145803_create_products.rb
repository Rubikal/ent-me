class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string    :title
      t.text      :description
      t.string    :image
      t.string    :price
      t.string    :studio
      t.string    :label
      t.integer   :number_of_discs
      t.integer   :duration
      t.integer   :category
      t.integer   :format
      t.datetime  :released_at

      t.timestamps
    end
  end
end
