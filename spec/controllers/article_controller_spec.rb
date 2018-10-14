require 'rails_helper'

RSpec.describe ArticlesController, type: :controller do
	context 'GET #index' do
		it 'returns a success response' do
			get :index
			expect(response).to be_success
		end
	end

	context 'GET #show' do
		it 'returns a success response' do
			article = Article.create!(name: 'name', article_date: '10/02/2018', description: 'description', content: 'content', tags: 'many tags', next_article: 'next article', previous_article: 'previous article', category: 'category')
			get :show, params: { id: article.to_param }
			expect(response).to be_success
		end
	end
end
