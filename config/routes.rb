Rails.application.routes.draw do
  resources :users
  root :to => "sessions#login"

  get 'login', to: 'sessions#login'

  get 'home', to: 'sessions#home'

  get 'profile', to: 'sessions#profile'

  get 'setting', to: 'sessions#setting'

  post 'login_attempt', to: 'sessions#login_attempt'

  get 'logout', to: 'sessions#logout'

  





  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
