---
layout: post
title: "Quick Intro to OmniAuth FatSecret Ruby Gem"
description: ""
category: 
tags: []
---
*** __Disclaimer__ ** I make no guarantees that the following instructions will work for you. 
Proceed at your own risk. Also, I am not affiliated with FatSecret.com in any way.*

*These instructions were tested on Ubuntu 12.04 / Ruby 2.0.0-p0 / Rails 3.2.14*

The following is a quick guide to using the [OmniAuth FatSecret gem]. 
The goal here is to obtain authentication tokens for your users,
so you can make calls to the FatSecret REST API on their behalves.
You'll need a [FatSecret API account], and your consumer_key and consumer_secret
to follow this guide. If you're not familiar with OmniAuth, you might want to [browse the README on Github]. 

[OmniAuth FatSecret gem]: https://github.com/scrawlon/omniauth-fatsecret "OmniAuth FatSecret gem"
[FatSecret.com REST API]: http://platform.fatsecret.com/api/Default.aspx?screen=rapih "FatSecret.com REST API"
[FatSecret API account]: http://platform.fatsecret.com/api/Default.aspx?screen=si "FatSecret API account"
[browse the README on Github]: https://github.com/intridea/omniauth/blob/master/README.md "browse the README on Github"

Install a dummy User app
---
Before we do anything, we need a Rails app with a User model. We're going to take advantage of the 
[Rails Composer project] to get us started.

[Rails Composer project]: https://github.com/RailsApps/rails-composer "Rails Composer project"  

1. First let's git clone the [rails3-devise-rspec-cucumber sample app]:  
`git clone https://github.com/RailsApps/rails3-devise-rspec-cucumber.git`  
 
2. Now let's initialize and start the app to make sure it works:  
`cd rails3-devise-rspec-cucumber`   
`bundle install`  
`rake db:migrate`  
`rails s`

3. Open 'http://localhost:3000' in your internet browser. You should see a 
simple web page with 'login' and 'Sign up' buttons. Type any name/email/password
you want, and press the 'Sign up' button. "Welcome! You have signed up successfully."

[rails3-devise-rspec-cucumber sample app]: https://github.com/RailsApps/rails3-devise-rspec-cucumber "rails3-devise-rspec-cucumber sample app"  

Install OmniAuth FatSecret
----
If you followed the instructions to set up the example Rails app, return to your command prompt and stop the
Rails server with `ctrl-c`.  

1. Add OmniAuth FatSecret gem to your Gemfile:   
`gem 'omniauth-fatsecret'`  
`bundle install`  

2. Create `omniauth.rb` in the `config/initializers` folder, and add the following code with your real FatSecret key and secret:  

    <h5><pre>
    Rails.application.config.middleware.use OmniAuth::Builder do  
      provider :fatsecret, 'consumer_key', 'consumer_secret'  
    end  
    </pre></h5>  

Create a tokens controller
---

