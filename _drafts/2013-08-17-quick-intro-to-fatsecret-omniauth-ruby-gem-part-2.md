---
layout: post
title: "Quick Intro to FatSecret OmniAuth Ruby Gem Part 2"
description: ""
category: 
tags: []
---
OK. You're back, chomping at the bit, wondering why the heck I stopped in
[part one of this blog] without telling you how to make a simple API call.  
Two reasons:
(1) There was a lot of info to cover in part one. I didn't want to overwhelm you 
and (2) more importantly, I hadn't figured out how to do it myself (though I knew it was possible)!

[part one of this blog]: /quick-intro-to-fatsecret-omniauth-ruby-gem/ "part one of this blog"

First a tweak
---

In Part One, we placed FatSecret API consumer key and consumer secret directly in `config/initializers/omniauth.rb`. 
A good reason not to do this is version control. If you're storing your app on Github, you're also sharing
your personal API keys too. 

A simple solution is to store these keys in a separate file as environment variables. You can then add that file to
.gitignore so that it isn't committed to your git repo. Even better, there's a [ruby gem called figaro] that does most of
the work for you, and it's already included in the rails3-devise-rspec-cucumber app that we started with.

[ruby gem called figaro]: https://github.com/laserlemon/figaro "ruby gem called figaro"

We just need to make small changes to two files:

Add the following to the bottom of `config/application.yml`:   

```
FATSECRET_KEY: "Your FatSecret API Consumer Key"
FATSECRET_SECRET: "Your FatSecret API Secret"
```

Now add the new environment keys to `config/initializers/omniauth.rb`:

```
Rails.application.config.middleware.use OmniAuth::Builder do  
    provider :fatsecret, ENV['FATSECRET_KEY'], ENV['FATSECRET_SECRET'] 
end
```

A different controller for a different task
---

We created the ApiTokens controller in Part One for obtaining and saving FatSecret auth tokens.
Now, we need to create another controller to handle api requests. Open your app folder in a 
console windows and type the following:  

$ `rails g controller Apis fatsecret`

Edit the new `app/controllers/apis_controller.rb`:

```
class ApisController < ApplicationController
  before_filter :authenticate_user!
  def fatsecret
    user = User.find(params[:user_id])
    tokens = user.api_tokens.find_by_provider('fatsecret')
        
    fatsecret = OmniAuth::Strategies::Fatsecret.new :fatsecret, ENV['FATSECRET_KEY'], ENV['FATSECRET_SECRET']
    fatsecret_api_url = 'http://platform.fatsecret.com/rest/server.api?'

    access_token = OAuth::AccessToken.new(fatsecret.consumer, tokens.auth_token, tokens.auth_secret)
    request = access_token.get fatsecret_api_url + 'method=profile.get&format=json'
    @response = JSON.parse(request.body)
  end 
end
```

