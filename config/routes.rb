Rails.application.routes.draw do

  match '/about', to: 'home#about', via: :get, as: :about

  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  root to: "products#home"

  resources :products, only: [:index, :show] do
    collection do
      get 'home'
      get ':type', action: :index, constraints: {type: /#{Product::TYPES.map(&:pluralize).join('|')}/}, as: :type
    end
  end
  resources :products, path: '/product', only: [:show]

  namespace :admin do
    resources :products
  end
end
