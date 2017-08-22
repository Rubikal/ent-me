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

ActiveRecord::Schema.define(version: 20170822093040) do

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
    t.index ["category"], name: "index_products_on_category"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating", null: false
    t.text "message"
    t.bigint "product_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "bundle_products", "bundles"
  add_foreign_key "bundle_products", "products"
  add_foreign_key "reviews", "products"
  add_foreign_key "reviews", "users"
end
