Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  root to: "products#index"

  resources :products, only: [:index] do
    collection do
      get ':type', action: :index, constraints: {type: /#{Product::TYPES.map(&:pluralize).join('|')}/}
    end
  end
  resources :products, path: '/product', only: [:show]

  namespace :admin do
    resources :products
  end
end
