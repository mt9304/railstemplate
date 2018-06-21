module Api
	class ArticlesController < ApplicationController
		def index
			render json: Article.all
		end

		def new
			@article = Article.new
		end

		def create
		  article = Article.new(article_params)
		  if article.save
		    render json: article
		  else
    		render nothing: true, status: :bad_request
  		  end
		end

		def search
			  query = params[:query]
			  articles = Article.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
			                       "%#{query}%", "%#{query}%", "%#{query}%")
			  render json: articles
		end

		private

		def article_params
		  params.require(:article).permit(:name, :article_date, :description, :content, :tags)
		end
	end
end