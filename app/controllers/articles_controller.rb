class ArticlesController < ApplicationController
	  load_and_authorize_resource
	  before_action :authenticate_user!, except: [:index, :show]

	def index
		
	end

	def show
		@article = Article.search(params[:name])
	end

	def new
		@article = Article.new
	end

	def create
	  render :new
	end

	def search(name)
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