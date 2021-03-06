Rails.application.routes.draw do


  namespace :api do
    resources :products do
      collection do
        get :search
      end
    end
  end

  resources :news, only: :index

  resources :orders, only: :create do
    collection do
      get :receipt
    end
  end

  resources :checkout, only: [:index]

  resources :carts, only: [:index] do
    collection do
      get :info
      post :add
      post :remove
    end
  end

  match '/about', to: 'home#about', via: :get, as: :about

  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  root to: "products#home"

  get '/admin', to: 'admin/products#index'

  resources :products, only: [:index, :show] do
    collection do
      get 'autocomplete'
      get 'home'
      get 'search'
      get ':type', action: :index, constraints: {type: /#{Product::TYPES.map(&:pluralize).join('|')}/}, as: :type
    end
    resources :reviews, only: :create
  end
  resources :products, path: '/product', only: [:show]

  namespace :admin do
    resources :products do
      resources :reviews
    end
    resources :orders do
      member do
        post :fulfill
        post :cancel
      end
    end
    resources :bundles
    resources :news
  end
end
