---
layout: post
title: "FatSecret OmniAuth: A Quick Intro - Part 1"
heading: "FatSecret OmniAuth:"
subheading: "A Quick Intro - Part 1"
description: ""
category:
tags: []
comments: true
published: true
---

The following is a quick guide to the [FatSecret OmniAuth gem].
With this gem, you can obtain authorization to access a user's FatSecret account.
You'll use your [FatSecret API] consumer_key and consumer_secret
to work with the example app. If you're not familiar with OmniAuth,
you might want to browse the [README].

[FatSecret OmniAuth gem]: https://github.com/scrawlon/fatsecret-omniauth "FatSecret OmniAuth gem"
[FatSecret API]: http://platform.fatsecret.com/api/Default.aspx?screen=si "FatSecret API"
[README]: https://github.com/intridea/omniauth/blob/master/README.md "browse the README on Github"

Install a dummy User app
---
Before we do anything, we need a Rails app with a User model. We'll take advantage of the
[Rails Composer project] to get us started.

[Rails Composer project]: https://github.com/RailsApps/rails-composer "Rails Composer project"  

1. First let's clone the bare dummy app:  
`git clone https://github.com/RailsApps/rails3-devise-rspec-cucumber.git`  

2. Now let's initialize and start the app to make sure everything is working:  
`cd rails3-devise-rspec-cucumber`
`bundle install`  
`rake db:migrate`  
`rails s`

3. Open 'http://localhost:3000' in your internet browser. You should see a
simple web page with 'login' and 'Sign up' links at the top.

Install FatSecret OmniAuth
----

If you followed the instructions to set up the example Rails app, return to your command prompt and stop the
Rails server with `ctrl-c`.  

1. Add FatSecret OmniAuth gem to your `Gemfile`:
`gem 'fatsecret-omniauth'`  

2. Install the gem:
`bundle install`  

3. Create `omniauth.rb` in the `config/initializers` directory, and add the following code with your real FatSecret key and secret:  

```ruby  
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :fatsecret, 'consumer_key', 'consumer_secret'
end
```

Create an api_token model/controller
---

1. Generate the model and migrate the database. This gives us a way to save
FatSecret tokens and associate them with individual users:

    $`rails g model ApiToken provider:string auth_token:string auth_secret:string user_id:integer`
    $`rake db:migrate`  

2. Create a has_many/belongs_to association between the User and ApiToken models.

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

There's a lot going on here. Let me explain. When our users sign into FatSecret, the FatSecret OmniAuth gem
returns a __request.env__ hash to the __api_tokens_controller__ including the _provider name_,
the _auth tokens_, the _user_id_, the _origin_ (the route back to where the user started) and
a lot more data we're not using. Check out the [Auth Hash Schema doc] for more info.

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

```erb  
<h3>User</h3>
<p>User: <%= @user.name %></p>
<p>Email: <%= @user.email if @user.email %></p>
<h4>Your APIs</h4>
<ul>
<% user_apis = [] %>
<% @user.api_tokens.each do |api| %>
  <li><b><%= api.provider.camelize %></b>( token: <%= api.auth_token %>, secret: <%= api.auth_secret %>  </li>
  <% user_apis << api.provider %>
<% end %>
<% unless user_apis.include?('fatsecret') %>
  <%= link_to 'Add FatSecret', new_user_api_token_path(@user) %>
<% end %>
</ul>
```

In the routes, we've made :api_tokens a nested resource of :users. This performs some magic for us:  

* It creates a few named routes, including the __new_user_api_token_path__ we're using for our 'Add FatSecret' link.  
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

The next step is using the auth data to connect to the FatSecret REST API and do searches on a user's
behalf. That will be the topic of my next post.

__UPDATE__ [Added Part 2 of this tutorial explaining how to make FatSecret API calls.]

[Added Part 2 of this tutorial explaining how to make FatSecret API calls.]: http://scrawlon.com/quick-intro-to-fatsecret-omniauth-ruby-gem-part-2/ " Added Part 2 of this tutorial explaining how to make FatSecret API calls."
