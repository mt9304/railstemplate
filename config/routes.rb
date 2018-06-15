Rails.application.routes.draw do
  root 'dashboard#index'
  namespace :api do
  	resources :articles, only: [:index, :create] do
  		get :search, on: :collection
  	end
  end
  devise_for :users
  resources :projects
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
end
