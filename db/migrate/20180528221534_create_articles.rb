class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :name
      t.date :article_date
      t.text :description
      t.text :content
      t.text :tags

      t.timestamps
    end
  end
end
