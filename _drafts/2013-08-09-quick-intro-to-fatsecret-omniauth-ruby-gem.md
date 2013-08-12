---
layout: post
title: "Quick Intro to FatSecret OmniAuth Ruby Gem"
description: ""
category: 
tags: []
---
*** __Disclaimer__ ** I make no guarantees that the following instructions will work for you. 
Proceed at your own risk. Also, I am not affiliated with FatSecret.com in any way.*

*These instructions were tested on Ubuntu 12.04 / Ruby 2.0.0-p0 / Rails 3.2.14*  
*A __$__ indicates a line typed in a terminal window. __Do not type the $__*  

---
The following is a quick guide to the [FatSecret OmniAuth gem]. 
With this gem, we can gain access to users' diet/fitness data from the FatSecret API. 
You'll need a [FatSecret API account], and your consumer_key and consumer_secret
to work with the example app. If you're not familiar with OmniAuth, you might want to [browse the README on Github]. 

[FatSecret OmniAuth gem]: https://github.com/scrawlon/fatsecret-omniauth "FatSecret OmniAuth gem"
[FatSecret API account]: http://platform.fatsecret.com/api/Default.aspx?screen=si "FatSecret API account"
[browse the README on Github]: https://github.com/intridea/omniauth/blob/master/README.md "browse the README on Github"

Install a dummy User app
---
Before we do anything, we need a Rails app with a User model. We're going to take advantage of the 
[Rails Composer project] to get us started.

[Rails Composer project]: https://github.com/RailsApps/rails-composer "Rails Composer project"  

1. First let's git clone the [rails3-devise-rspec-cucumber sample app]:  
$`git clone https://github.com/RailsApps/rails3-devise-rspec-cucumber.git`  
 
2. Now let's initialize and start the app to make sure everything is working:  
$`cd rails3-devise-rspec-cucumber`   
$`bundle install`  
$`rake db:migrate`  
$`rails s`

3. Open 'http://localhost:3000' in your internet browser. You should see a 
simple web page with 'login' and 'Sign up' buttons. Click 'Sign up'. Type any name/email/password
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

    <h5><pre>
    Rails.application.config.middleware.use OmniAuth::Builder do  
      provider :fatsecret, 'consumer_key', 'consumer_secret'  
    end  
    </pre></h5>  

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
3. Create the ApiTokens controller and add a create method to save our API tokens:  

    $`rails g controller ApiTokens create`  

    Open `app/controllers/api_tokens_controller.rb`. Edit the __create__ method:  
    <h5><pre>
    def create
      omniauth = request.env['omniauth.auth']
      provider_hash = {
        "provider" => omniauth['provider'], 
        "auth_token" => omniauth['credentials']['token'],
        "auth_secret => omniauth['credentials']['secret']
      }
      ApiToken.new(provider_hash)
    end
    </pre></h5>

  
    
