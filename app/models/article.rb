class Article < ApplicationRecord
	validates :name, presence: true, uniqueness: true

	def self.search(name)
		if name
			@name = name.downcase
		end

		#Return article if found, else say not found. Article controller will then throw 404 status. 
		if @name && Article.where("name = ?", "#{@name}").present?
			@article = Article.where("lower(name) = ?", "#{@name}")
		elsif @name && Article.where("lower(name) = ?", "#{@name}").blank?
			@article = "article not found"
		else
			@article = "article not found"
		end
	end

end
