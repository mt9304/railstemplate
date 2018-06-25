class Article < ApplicationRecord
	validates :name, presence: true, uniqueness: true

	def self.search(name)
		if name
			@name = name.downcase
		end

		if @name && Article.where("name = ?", "#{@name}").present?
			@article = Article.where("lower(name) = ?", "#{@name}")
		elsif @name && Article.where("lower(name) = ?", "#{@name}").blank?
			@article = Article.where("lower(name) = ?", "article not found")
		else
			@article = Article.where("lower(name) = ?", "default article")
		end
	end

end
