---
author: Scott McGrath
layout: post
title: "FatSecret OmniAuth: A Quick Intro - Part 2"
heading: "FatSecret OmniAuth"
subheading: "A Quick Intro - Part 2"
description: ""
category:
tags: []
comments: true
---

In [part one] we installed and configured the FatSecret gem. In part two,
we'll explore ways to call the FatSecret API.

[part one]: /quick-intro-to-fatsecret-omniauth-ruby-gem/ "part one"

*Also, you'll need to make sure you're using the latest version of the
[fatsecret-omniauth gem]. The current version at the time of this blog post is 0.0.2.*

[fatsecret-omniauth gem]: https://github.com/scrawlon/fatsecret-omniauth "fatsecret-omniauth gem"

The Apis Controller
---

We created the ApiTokens controller in Part One for obtaining and saving
FatSecret auth tokens. Now, we need a controller to handle api
requests. Open your app folder in a console window and type the following:  

`rails g controller Apis fatsecret`

Edit the new `app/controllers/apis_controller.rb`:

```ruby
class ApisController < ApplicationController
  def fatsecret
    tokens = {}
    unless params[:user_id].nil?
      user = User.find(params[:user_id])
      tokens = user.api_tokens.find_by_provider('fatsecret')
    end
    request = Fatsecret::Api.new({}).api_call(
      'FATSECRET_KEY',
      'FATSECRET_SECRET',
      params,
      tokens['auth_token'] ||= "",  
      tokens['auth_secret'] ||= ""
    )
    @response = request.body
  end
end
```

Create a new route for the apis#fatsecret method above all other routes in `config/routes.rb`:

```ruby
  post "/fatsecret", to: "apis#fatsecret"
```

The apis#fatscret method provides a way to make any FatSecret API request.
You only need to include your FatSecret query in a params hash,
and send this to api#fatsecret. See the [FatSecret API method docs]
for details on what parameters are required for each FatSecret API method.

[FatSecret API method docs]: http://platform.fatsecret.com/api/Default.aspx?screen=rapiref "FatSecret API method docs"

To test this, let's create a form to use the __foods.search__ method without user authentication:

Edit `app/views/home/index.html.erb` to include a search form:

```ruby
<h3>Home</h3>
<h1>Try FatSecret Food Search</h1>
<%= form_tag fatsecret_path %>
  <%= label_tag(:search_expression, "Search for food:") %>
  <%= text_field_tag(:search_expression) %>
  <%= hidden_field_tag 'method', 'foods.search' %>
  <%= submit_tag("Search") %>
<% end %>

<% @users.each do |user| %>
  <p>User: <%= link_to user.name, user %></p>
<% end %>
```

Edit `app/views/apis/fatsecret.html.erb`:

```ruby
<h1>Apis#fatsecret</h1>
<pre><%= @response %></pre>
```

* Now start the Rails server and open the home page in your browser.  

![FatSecret foods.search form](/images/fatsecret-omniauth-foods-search-form.jpg "foods.search form")

* Enter a food and press the 'Search' button.

![FatSecret foods.search results](/images/fatsecret-omniauth-foods-search-results.jpg "foods.search results")

If everything worked as expected you should see something like my search for 'banana' above.

Awesome. Now, let's tie everything together and make an authenticated API call using the
using the auth_token and auth_secret we obtained in Part 1 of this blog post.

First, add a new route for authenticated API calls below `post "/fatsecret", to: "apis#fatsecret"`
in `config/routes.rb`:

```ruby
post "/users/:user_id/fatsecret", to: "apis#fatsecret", as: "fatsecret_auth"
```

Edit `app/views/users/show.html.erb`:

```ruby
<h3>User</h3>
<p>User: <%= @user.name %></p>
<p>Email: <%= @user.email if @user.email %></p>
<h4>Your APIs</h4>
<ul>
  <% user_apis = [] %>
  <% @user.api_tokens.each do |api| %>
    <li><b><%= api.provider.camelize %>:</b></li>
    <% user_apis << api.provider %>
  <% end %>

  <% if user_apis.include?('fatsecret') %>
    <%= link_to "Get FatSecret Profile", fatsecret_auth_path(@user, :method => 'profile.get'), :method => 'post' %>
  <% else %>
    <%= link_to 'Add FatSecret', new_user_api_token_path(@user) %>
  <% end %>
</ul>
```


* Restart the Rails server and open the home page in your browser.  
* Signup and login as a new user.
* Click on your username in the User list at the bottom of the page.
* On your user screen click on 'Add FatSecret'and authenticate with your FatSecret account
(as described in [Part 1 of this post]).
* If successful, your FatSecret user auth_token and auth_secret will be saved in you app
user's api_tokens database, and you should see the 'Get FatSecret Profile' link as pictured below.

![FatSecret profile.get link](/images/fatsecret-omniauth-profile-get.jpg "FatSecret profile.get link")

[Part 1 of this post]: /quick-intro-to-fatsecret-omniauth-ruby-gem/ "Part 1 of this post"

* When you click the 'Get FatSecret Profile' link, an authenticated API call to FatSecret will return
your FatSecret user profile.

![FatSecret profile.get response](/images/fatsecret-omniauth-profile-get-response.jpg "FatSecret profile.get response")

That's it. We made authenticated and unauthenticated calls to the FatSecret API. We used a form for one and a link for the other.
Going forward, all you need to do is read the FatSecret API docs and make sure to include all required
FatSecret method parameters in the params hash you send to the apis#fatsecret method.

Bonus Points
---

Here's an example of posting data to a user's FatSecret account via an authenticated api call.
This follows the same pattern as before. Read the API docs and include the required parameters in the params hash.

Add this form below the 'Get FatSecret Profile' link in `app/views/users/show.html.erb`:

```ruby
<p>
<h3>Update your weight on FatSecret:</h3>
<%= form_tag fatsecret_auth_path(@user) do %>
  <%= label_tag(:goal_weight_kg, "Enter your goal weight in kg:") %>
  <%= text_field_tag(:goal_weight_kg) %><br />
  <%= label_tag(:current_height_cm, "Enter your current height in cm:") %>
  <%= text_field_tag(:current_height_cm) %><br />
  <%= label_tag(:current_weight_kg, "Enter your current weight in kg:") %>
  <%= text_field_tag(:current_weight_kg) %><br />
  <%= hidden_field_tag 'method', 'weight.update' %>
  <%= submit_tag("Update Weight") %>
<% end %>  
</p>
```
