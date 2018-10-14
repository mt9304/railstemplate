require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
	context 'GET #index' do
		it 'returns a success response' do
			get :index
			expect(response).to be_success
		end
	end

	context 'GET #show' do
		it 'returns a success response' do
			user = User.create!(id: 1, email: 'email@1.com', username: 'username', password: 'test123', password_confirmation: 'test123')
  			project = Project.create(name: 'name', description: 'description', user_id: 1)
  			get :show, params: { id: project.to_param }
			expect(response).to be_success
		end
	end
end
