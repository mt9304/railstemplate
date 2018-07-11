module Api
	class CheckRoleController < ApplicationController
		load_and_authorize_resource
		before_action :authenticate_user!

		def index
			render json: '{ "isAdmin": "true" }'
		end

		def show
			render json: '{ "isAdmin": "true" }'
		end
	end
end