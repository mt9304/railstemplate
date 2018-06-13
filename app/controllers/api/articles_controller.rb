module Api
	class ArticlesController < ApplicationController
		def index
			render json: Article.all
		end

		def search
		  query = params[:query]
		  articles = Article.where('name LIKE ? OR tags LIKE ? OR description LIKE ?',
		                       "%#{query}%", "%#{query}%", "%#{query}%")
		  render json: Article
		end
	end
end