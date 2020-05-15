class UsersController < ApplicationController
  require 'digest/sha1'



  before_filter :save_login_state, :only => [:new, :create]


  def new
    @user = User.new
  end

  def create 
    binding.pry
    @user = User.new
    @user.email = params[:user][:email]
    @user.username = params[:user][:username]
    @user.phone_number = params[:user][:phone_number]
    @user.pan_no = params[:user][:pan_no]
    @user.account_no = params[:user][:account_no]
    @user.password = params[:user][:password]
    @user.password_confirmation = params[:user][:password_confirmation]
    @user.salt = Digest::SHA1.hexdigest("# we add #{@user.email} as unique value and #{Time.now} as random value")

    @user.encrypted_password = Digest::SHA1.hexdigest(@user.password+@user.salt)


    if @user.save
      flash[:notice] = "You signed up successfully"
      flash[:color] = "valid"
    else
      flash[:notice] = "Form is invalid"
      flash[:color] = "invalid"
    end

    render "new"
  end

end
