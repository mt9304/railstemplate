module Api
	class ArticlesController < ApplicationController
		load_and_authorize_resource
		before_action :set_article, only: [:destroy, :update]
		before_action :authenticate_user!, except: [:index, :show]

		def index
			render json: Article.all
		end

		def new
			@article = Article.new
		end

		def create
		  article = Article.new(article_create_params)
		  if article.save
		    render json: article
		  else
    		render nothing: true, status: :bad_request
  		  end
		end

		def update
			if @article.update(article_create_params)
				render json: @article
			else
				render nothing: true, status: :unprocessable_entity
			end
		end

		def show
			@article = Article.find(params[:id])
			render json: @article
		end

		def search
			#Need a view template since the render json is a string. 
			if article_params
				@article = Article.search(params[:name])
			else
				render json: "Article Not Found", status: 404
			end

			if Article.search(params[:name]) == "article not found"
	    		render json: "Article Not Found", status: 404
	    	else
	    		render json: @article
	    	end
		end

		def destroy
			@article.destroy
			head :no_content
		end

		private

		def article_params
	  		params.permit(:article, :name, :article_date, :description, :content, :tags)
		end

		def article_create_params
			params.require(:article).permit(:name, :article_date, :description, :content, :tags)
		end

		def set_article
			@article = Article.find(params[:id])
		end
	end
end