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
			#query = params[:query]
			#articles = Article.where('name LIKE ? OR place LIKE ? OR description LIKE ?',"%#{query}%", "%#{query}%", "%#{query}%")
			#render json: articles
			if article_params
				@article = Article.search(params[:name])
			else
				@article = Article.search(params["default_article"])
			end

			if @article.name.to_s.downcase == "article_not_found"
	    		render nothing: true, status: :bad_request
	    	else
	    		render json: @article
	    	end
		end

		private

		def article_params
		  #params.require(:article).permit(:name, :article_date, :description, :content, :tags)
		  params.require(:name)
		end
	end
end