if User.count === 0
  User.new.tap do |user|
    user.name = Faker::Name.name
    user.email = "user@entme.com"
    user.password = "12345678"
    user.skip_confirmation!
    user.save!
  end

  User.new.tap do |user|
    user.name = Faker::Name.name
    user.email = "admin@entme.com"
    user.password = "12345678"
    user.skip_confirmation!
    user.admin = true
    user.save!
  end
end

if Product.count == 0
  user = User.where(admin: false).first
  [Film, Game, Music].each do |klass|
    klass.categories.keys.each do |category|
      10.times do |no|
        product = klass.new.tap do |p|
          p.title = Faker::Commerce.product_name
          p.description = Faker::Lorem.paragraph(2)
          p.price = Faker::Commerce.price
          p.category = category
          p.featured = no < 3
          p.image = File.open("app/assets/images/#{klass.to_s.downcase}#{no%3 + 1}.jpg")
          p.save!
          3.times.each do
            p.reviews.create!(user: user, rating: (1..5).to_a.shuffle.first, message: Faker::Lorem.paragraph)
          end
        end
        product
      end
    end
  end
end

if News.count == 0
  20.times do |no|
    News.new.tap do |news|
      news.title = Faker::Commerce.product_name
      news.description = Faker::Lorem.paragraph(2)
      news.image = File.open("app/assets/images/news#{no%3 + 1}.jpg")
      news.save!
    end
  end
end
