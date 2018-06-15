module Api
	class ArticlesController < ApplicationController
		def index
			render json: Article.all
		end

		def search
			  query = params[:query]
			  events = Article.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
			                       "%#{query}%", "%#{query}%", "%#{query}%")
			  render json: events
		end
	end
end