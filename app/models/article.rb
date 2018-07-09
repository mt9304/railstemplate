class Article < ApplicationRecord
	validates :name, presence: true, uniqueness: true

	def self.search(name)
		if name
			@name = name
		end

		#Return article if found, else say not found. Article controller will then throw 404 status. 
		if @name && Article.where("name = ?", "#{@name}").present?
			@article = Article.where("name = ?", "#{@name}")
		elsif @name && Article.where("name = ?", "#{@name}").blank?
			@article = "article not found"
		else
			@article = "article not found"
		end
	end

end
