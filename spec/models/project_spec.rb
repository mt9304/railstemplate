require 'rails_helper'

RSpec.describe Project, type: :model do
  context 'validation tests' do
  	it 'ensure presence of user' do
  		project = Project.new(name: 'name').save
  		expect(project).to eq(false)
  	end

  	it 'ensures name saves successfully' do
  		user = User.create!(id: 1, email: 'email@1.com', username: 'username', password: 'test123', password_confirmation: 'test123')
  		project = Project.new(name: 'name', user_id: 1).save!
  		expect(project).to eq(true)
  	end

  	it 'ensures description saves successfully' do
  		user = User.create!(id: 1, email: 'email@1.com', username: 'username', password: 'test123', password_confirmation: 'test123')
  		project = Project.new(description: 'description', user_id: 1).save!
  		expect(project).to eq(true)
  	end

  	it 'should save successfully' do
  		user = User.create!(id: 1, email: 'email@1.com', username: 'username', password: 'test123', password_confirmation: 'test123')
  		project = Project.new(name: 'name', description: 'description', user_id: 1).save!
  		expect(project).to eq(true)
  	end
  end

  context 'scope tests' do
  end
end
