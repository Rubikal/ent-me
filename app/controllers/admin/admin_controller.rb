class Admin::AdminController < ApplicationController
  layout 'admin_application'
  before_action :authenticate_admin!

  protected
  def authenticate_admin!
    redirect_to new_user_session_path unless user_signed_in? && current_user.admin?
  end
end
