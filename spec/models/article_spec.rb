require 'rails_helper'

RSpec.describe Article, type: :model do
  context 'validation tests' do
  	it 'ensures presence of name' do
  		article = Article.new(description: 'Hello').save
  		expect(article).to eq(false)
  	end

  	it 'should save successfully' do
  		article = Article.new(name: 'name', article_date: '10/02/2018', description: 'description', content: 'content', tags: 'many tags', next_article: 'next article', previous_article: 'previous article', category: 'category').save
  		expect(article).to eq(true)
  	end
  end

  context 'scope tests' do
  end
end
