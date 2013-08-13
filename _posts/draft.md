---
layout: post
title: "Quick Intro to FatSecret OmniAuth Ruby Gem"
description: ""
category: 
tags: []
---

*These instructions were tested on Ubuntu 12.04 / Ruby 2.0.0-p0 / Rails 3.2.14*  
*A __$__ indicates a line typed in a terminal window. __Do not type the $__*  
*Also, I am not affiliated with FatSecret.com in any way.*  

---
The following is a quick guide to the [FatSecret OmniAuth gem]. 
With this gem, you can obtain authorization to access a user&#39;s FatSecret account.
You&#39;ll need a [FatSecret API account], and your consumer_key and consumer_secret
to work with the example app. If you&#39;re not familiar with OmniAuth, you might want to [browse the README on Github]. 

[FatSecret OmniAuth gem]: https://github.com/scrawlon/fatsecret-omniauth "FatSecret OmniAuth gem"
[FatSecret API account]: http://platform.fatsecret.com/api/Default.aspx?screen=si "FatSecret API account"
[browse the README on Github]: https://github.com/intridea/omniauth/blob/master/README.md "browse the README on Github"

Install a dummy User app
---
Before we do anything, we need a Rails app with a User model. We&#39;re going to take advantage of the 
[Rails Composer project] to get us started.

[Rails Composer project]: https://github.com/RailsApps/rails-composer "Rails Composer project"  

1. First let&#39;s git clone the [rails3-devise-rspec-cucumber sample app]:  
$`git clone https://github.com/RailsApps/rails3-devise-rspec-cucumber.git`  
 
2. Now let&#39;s initialize and start the app to make sure everything is working:  
$`cd rails3-devise-rspec-cucumber`   
$`bundle install`  
$`rake db:migrate`  
$`rails s`

3. Open 'http://localhost:3000' in your internet browser. You should see a 
simple web page with 'login' and 'Sign up' links at the top. Click 'Sign up'. Type any name/email/password
you want, and press the 'Sign up' button. "Welcome! You have signed up successfully."

[rails3-devise-rspec-cucumber sample app]: https://github.com/RailsApps/rails3-devise-rspec-cucumber "rails3-devise-rspec-cucumber sample app"  

Install FatSecret OmniAuth 
----

If you followed the instructions to set up the example Rails app, return to your command prompt and stop the
Rails server with `ctrl-c`.  

1. Add FatSecret OmniAuth gem to your `Gemfile`:   
`gem 'fatsecret-omniauth'`  

2. Install the gem:    
$`bundle install`  

3. Create `omniauth.rb` in the `config/initializers` directory, and add the following code with your real FatSecret key and secret:  
```ruby
Rails.application.config.middleware.use OmniAuth::Builder do   
    provider :fatsecret, 'consumer_key', 'consumer_secret'   
end   
```

Create an api_token model/controller
---

1. Generate the api_token model and migrate the database. This will give us a way to save FatSecret tokens and associate them
with individual users: 
  
    $`rails g model ApiToken provider:string auth_token:string auth_secret:string user_id:integer`   
    $`rake db:migrate`  

2. Now we need to set up a has_many/belongs_to association between our User and ApiToken models.
      
    Below __class User < ActiveRecord::Base__ in `app/models/user.rb` add:  
    `has_many :api_tokens`  

    Below __class ApiToken < ActiveRecord::Base__ in `app/models/api_token.rb` add:  
    `belongs_to :user`  

3. Create the ApiTokens controller:

    $`rails g controller ApiTokens create`  

    Edit `app/controllers/api_tokens_controller.rb`: 
```ruby
    class ApiTokensController < ApplicationController
      before_filter :authenticate_user!
      def create
        auth = omniauth(request.env['omniauth.auth'])
        user_id = request.env['omniauth.params']['user_id']
        origin = request.env['omniauth.origin']
    
        @user = User.find(user_id)
    
        @new_api = @user.api_tokens.build(auth) 
    
        if @new_api.save
          redirect_to origin
        end
      end
      
      private
      
      def omniauth auth
        params = { 
          "provider" => auth['provider'],
          "auth_token" => auth['credentials']['token'],
          "auth_secret" => auth['credentials']['secret'] 
        }
      end
    end
```

    There&#39;s a lot going on here. Let me explain. When our users sign into FatSecret, the FatSecret OmniAuth gem 
    returns a __request.env__ hash to the __api_tokens_controller__ including the _provider name_, 
    the _auth tokens_, the _user_id_, the _origin_ (the route back to where the user started) and 
    a lot more data we&#39;re not using. Check out the [Auth Hash Schema doc] for more info.

    [Auth Hash Schema doc]: https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema "Auth Hash Schema doc"
  
Create the routes and views:
---

Edit `config/routes.rb`:  
```ruby
Rails3DeviseRspecCucumber::Application.routes.draw do
  match '/users/:user_id/api_tokens/new' => redirect('/auth/fatsecret?user_id=%{user_id}')
  get '/auth/fatsecret/callback', to: 'api_tokens#create'

  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"

  devise_for :users
  resources :users do
    resources :api_tokens
  end
end
```
 
Edit `app/views/users/show.html.erb`:
```html
<h3>User&lt;/h3>
<p>User: &lt;%= @user.name %>&lt;/p>
<p>Email: &lt;%= @user.email if @user.email %>&lt;/p>
<h4>Your APIs&lt;/h4>
<ul>
<% user_apis = [] %>
<% @user.api_tokens.each do |api| %>
  <li>&lt;b>&lt;%= api.provider.camelize %>&lt;/b>( token: &lt;%= api.auth_token %>, secret: &lt;%= api.auth_secret %> ) &lt;/li>
  <% user_apis &lt;&lt; api.provider %>
<% end %>
<% unless user_apis.include?('fatsecret') %>
  <%= link_to 'Add FatSecret', new_user_api_token_path(@user) %>
<% end %>
</ul>
```
  
In the routes, we&#39;ve made :api_tokens a nested resource of :users. This performs some magic for us:  

* It creates a few named routes, including the __new_user_api_token_path__ we&#39;re using for our 'Add FatSecret' link.  
* It includes the user_id in the route, so we can send that to our api_tokens_controller along with our Fatsecret data.  

Done. Get connected to FatSecret!
---

Start the app $`rails s`   
Open `http://localhost:3000` in your browser.  
Sign up and login as a new user.  
Click on your user name.  
Click 'Add Fatsecret'.   

You should be redirected to the FatSecret website.  
Sign In (if you're already signed in click 'Allow')  
You'll be redirected back to the app.   
Your FatSecret tokens are saved in the database.  

Conclusion
---

If you were able to follow along, you should have an app that can retrieve FatSecret auth data.
If you get stuck or have any questions, leave a comment here or Tweet me @scrawlon.  

The next step is using the auth data to connect to the FatSecret REST API and do searches on a user&#39;s
behalf. That will be the topic of my next post.
