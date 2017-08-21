class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:facebook]

  has_many :reviews

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create do |user|
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      # user.image = auth.info.image
      user.skip_confirmation!
    end
  end
end
