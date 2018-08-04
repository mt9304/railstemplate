# Ruby on Rails with React Template 

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
   - [Suggested Environment](#suggested-environment)
   - [Installation](#installation)
- [Template Overview](#template-overview)
   - [Authentication](#authentication)
   - [Authorization](#authorization)
   - [Quilljs HTML Editor](#quilljs-html-editor)

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

## Template Overview

### Authorization
#### Tables
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

#### Permitting Actions

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

#### Handling Exceptions

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

#### Hiding/Showing Content

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

### Quilljs HTML Editor
#### Implementing
- An example on how to implement on a page can be found in /app/assets/javascripts/components/article/new_article_form.js.jsx
- Quilljs scripts/css files should be available for your page before implementing (details [here](https://quilljs.com/docs/download/)): 

```
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
```
- All the needed scripts for this project can be found in /public/scripts/ and /public/stylesheets (files with "quill" in their name). The Some of these may be modified as well to extend its functionality (for example, source code editing). 

- Put the editor on a page by adding this in the React Javascript file: 
```
...
<div id="toolbar" className="ta-quill-toolbar">
</div>

<div id="editor" className="ta-quill-textbox" name="content"  >
   <p id="richText"></p>
</div>
.
```

- You will also need some inline scripts to have it work properly with the current modifications that I made to the editor. This can be pretty messy and I may clean it up in the future, but for now it at least helps me accomplish what I needed with the editor. You can inject the script onto the page by adding this to the componentDidMount() method: 
```
componentDidMount() {
   const scriptElement = document.createElement("script");
   const rawScript = "var toolbarOptions = [['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],['blockquote', 'code-block'],[{ 'color': [] }, { 'background': [] }],['showHtml']];\nvar editor = new Quill('#editor', { modules: { toolbar: toolbarOptions }, theme: 'snow' });var txtArea = document.createElement('textarea'); txtArea.style.cssText = 'width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none'; var htmlEditor = editor.addContainer('ql-custom'); htmlEditor.appendChild(txtArea); var myEditor = document.querySelector('#editor');editor.on('text-change', (delta, oldDelta, source) => { var html = myEditor.children[0].innerHTML;txtArea.value = html }); var customButton = document.querySelector('.ql-showHtml');customButton.addEventListener('click', function() { if (txtArea.style.display === '') { var html = txtArea.value;self.editor.pasteHTML(html);} txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none';});";
   const scriptNode = document.createTextNode(rawScript);
   scriptElement.appendChild(scriptNode);
   document.body.appendChild(scriptElement);
}
```

#### Storing and Rendering HTML
- If you want to store the raw HTML made by using the editor, you can use something like this in your React Javascript file: 
```
...
addHTML(e) {
   var richTextNode = document.getElementsByClassName('ql-editor')[0];
   htmlContent = richTextNode.innerHTML;
   this.setState({content: "htmlContent"});
}
...
```
- Then to render the content as HTML on a page, you can use the following (more information on [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html)): 
```
...
constructor(props) {
   super(props);
   this.state = { article: content: { "<p>hello<p>" } };
}
...
...
render() {
   return (
      <div dangerouslySetInnerHTML={{__html: article.content}} >

      </div>
   )
}
...
```
