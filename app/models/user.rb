class User < ActiveRecord::Base
  rolify
  devise :database_authenticatable, :registerable,
     :recoverable, :rememberable, :trackable, :validatable
  has_many :projects, dependent: :destroy
end