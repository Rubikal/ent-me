# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170820175651) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bundle_products", force: :cascade do |t|
    t.bigint "bundle_id"
    t.bigint "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bundle_id"], name: "index_bundle_products_on_bundle_id"
    t.index ["product_id"], name: "index_bundle_products_on_product_id"
  end

  create_table "bundles", force: :cascade do |t|
    t.float "discount_percentage", null: false
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "image"
    t.string "price"
    t.string "studio"
    t.string "label"
    t.integer "number_of_discs"
    t.integer "duration"
    t.integer "category"
    t.integer "format"
    t.datetime "released_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type", null: false
    t.boolean "featured", default: false, null: false
    t.text "trailer"
  end

  add_foreign_key "bundle_products", "bundles"
  add_foreign_key "bundle_products", "products"
end
