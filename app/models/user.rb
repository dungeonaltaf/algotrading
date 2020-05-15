class User < ApplicationRecord
  require 'digest/sha1'

  attr_accessor :password
  EMAIL_REGEX = /\A[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\z/i
  validates :username, :presence => true, :uniqueness => true, :length => {:in => 3..30}
  validates :email, :presence => true , :uniqueness => true, :format => EMAIL_REGEX
  validates :account_no, :presence => true, :uniqueness => true 
  validates :pan_no, :presence => true, :uniqueness => true
  validates :password, :confirmation =>  true
  validates_length_of :password, :in => 6..20 ,:on => :create
  






  def self.authenticate(username_or_email = "" , login_password = "")
    if EMAIL_REGEX.match(username_or_email)
      user = User.find_by_email(username_or_email)
    else
      user = User.find_by_username(username_or_email)
    end

    salt = user.salt
    if user && user.match_password(login_password,salt)
      return user
    else
      return false
    end

  end

  def match_password(login_password = "",salt)
    encrypted_password == Digest::SHA1.hexdigest(login_password+salt)
  end













end
