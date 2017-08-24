class NewsController < ApplicationController
  def index
    @news = News.page(params[:page] || 1).per(6)
  end
end
