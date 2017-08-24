class Admin::NewsController < ApplicationController
  layout 'admin_application'

  def index
    @news = News.page(params[:page])
  end

  def new
    @news = News.new
  end

  def show
    @news = News.find(params[:id])
  end

  def create
    @news = News.new(news_params)
    if @news.save
      redirect_to admin_news_index_path
    else
      flash[:error] = @news.errors.full_messages.to_sentence
      redirect_to new_admin_news_path
    end
  end

  def update
    @news = News.find(params[:id])
    if @news.update_attributes(news_params)
      redirect_to admin_news_path(@news)
    else
      flash[:error] = @news.errors.full_messages.to_sentence
      redirect_to admin_news_path(@news)
    end
  end

  def destroy
    @news = News.find(params[:id])
    @news.destroy
    redirect_to admin_bundles_path
  end

  protected
  def news_params
    params.require(:news).permit!
  end
end
