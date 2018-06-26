class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
  	#Use the second format.html option with the status to throw http error. However, it will first show a blank page saying you are being redirected. 
  	#For more details: https://stackoverflow.com/questions/4310913/ruby-on-rails-how-to-get-rid-of-you-are-being-redirected-page
    respond_to do |format|
      format.html { redirect_to main_app.root_url, :alert => exception.message }
      #format.html { redirect_to main_app.root_url, status: 401, :alert => exception.message }
    end
    #redirect_to root_url, alert: exception.message

  end
  protected
 
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :current_password])
  end 
end
