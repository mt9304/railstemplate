class Article < ApplicationRecord
	validates :name, presence: true, uniqueness: true

	def self.search(title)
		if title
			title = title.downcase
		end

		if title && Article.where("name = ?", "#{@title}").present?
			@article = Article.where("name = ?", "#{@title}")
		elsif title && Article.where("name = ?", "#{@title}").blank?
			@article = Article.where("name = ?", "Article Not Found")
		else
			@article = Article.where("name = ?", "Default Article")
		end
	end

end
