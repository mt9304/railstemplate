# Rails and React template 

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
	- [Suggested Environment](#suggested-environment)
	- [Installation](#installation)
- [Basic Setup](#basic-setup)
	- [Authentication](#authentication)
	- [Authorization](#authorization)

## Introduction

This is a template I use as a starting point to create a Rails web application with React.js as an optional front-end. It includes some of the functions that I use the most commonly for projects: 

- CRUD functions for an example model (an article). 
- Rails RESTful API to interact with the example model. 
- React.js (v16.2) setup with jQuery's ajax functions to interact with the API. 
- Authentication and authorization using the gems [Devise](https://github.com/plataformatec/devise), [CanCan](https://github.com/ryanb/cancan), and [Rolify](https://github.com/RolifyCommunity/rolify). 
- [Quill.js](https://quilljs.com/docs/quickstart/) HTML text editor for editing and creating markup text. 

## Prerequisites

### Suggested Environment

1. Ubuntu 18.04
2. [Ruby on Rails environment](http://installfest.railsbridge.org/installfest/)

### Installation
1. In terminal, go to directory you want to save project in and type: 
```
git clone https://github.com/mt9304/railstemplate.git
```
2. Go into project folder and install dependencies (bundle update, bundle install, etc). 

3. Setup the database (rake db:create, rake db:migrate, etc). 

4. Start the application by typing in the terminal: 
```
rails s
```
5. Visit localhost:3000/ to visit the website. 

## Basic Setup

### Authorization

- The roles table contains the role id and the role name. The users_roles table contains the user id and an associating role id. 
- The user model in /app/models/user.rb has methods such as below to help check a user's role. 
```
 def admin?
    has_role?(:admin)
 end

 def normal_user?
 	has_role?(:normal_user)
 end
```
- Abilities for roles are defined in /app/models/ability.rb. In the initialize method, you can specify what each role can do by using the keyword "can" such as below: 
```
if user.normal_user?
  can :manage, YourModel, user_id: user.id #The user can only modify models created by itself. 
elsif user.admin?
  can :manage, :all #Can read/write all models
else
  can :read, YourModel
  can :your_custom_method, YourModel #If you have another method defined for model
end
```
- In your Controller class, make sure authorization is enforced by putting this at the top:
```
class YourController < ApplicationController
	load_and_authorize_resource
	before_action :authenticate_user!, except: [:index, :show] #Users will need the proper roles have access to methods other than index and show.

	def index
	...
	end

	...
end
```
- If a user tries to access something not permitted to their role, it will perform the action found in /app/controllers/application_controller.rb: 
```
...
rescue_from CanCan::AccessDenied do |exception|
	respond_to do |format|
		#Redirects the user to the root with an flash message at the top. 
		format.html { redirect_to main_app.root_url, :alert => exception.message }
		#Same thing below, but will throw a 401 error. 
		#format.html { redirect_to main_app.root_url, status: 401, :alert => exception.message }
	end
end
...
```
- For limiting what a user can see depending on role, you can include the following in your views: 
```
<% if current_user && current_user.admin? %>
	<li><%= link_to "New", new_model_path %></li>
<% end %>
```

### Authentication

- Default login url is /users/sign_in and register url is /users/sign_up. 
- Further information about the view can be found in the /app/views/devise/ folder. 
- Parameters can be found in /app/controllers/application_controller.rb: 
```
...
def configure_permitted_parameters
	devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password])
	devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :current_password])
end 
...
```