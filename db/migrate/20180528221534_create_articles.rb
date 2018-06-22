class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :name, null: false
      t.date :article_date, null: false
      t.text :description, null: false
      t.text :content, null: false
      t.text :tags

      t.timestamps
    end
  end
end
