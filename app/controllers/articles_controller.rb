class ArticlesController < ApplicationController
	def index
		render json: Article.all
	end

	def show
		@article = Article.search(params[:title])
	end

	def new
		@article = Article.new
	end

	def create

	  render :new
	end

	def search
		  query = params[:query]
		  articles = Article.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
		                       "%#{query}%", "%#{query}%", "%#{query}%")
		  render json: articles
	end

	private

	def article_params
	  params.require(:article).permit(:name, :description, :article_date, :content, :tags)
	end
end