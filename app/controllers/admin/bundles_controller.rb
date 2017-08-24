class Admin::BundlesController < ApplicationController
  layout 'admin_application'

  def index
    @bundles = Bundle.all
  end

  def new
    @bundle = Bundle.new
  end

  def show
    @bundle = Bundle.find(params[:id])
  end

  def create
    @bundle = Bundle.new(bundle_params)
    if @bundle.save
      redirect_to admin_bundle_path(@bundle)
    else
      flash[:error] = @bundle.errors.full_messages.to_sentence
      redirect_to new_admin_bundle_path
    end
  end

  def update
    @bundle = Bundle.find(params[:id])
    if @bundle.update_attributes(bundle_params)
      redirect_to admin_bundle_path(@bundle)
    else
      flash[:error] = @bundle.errors.full_messages.to_sentence
      redirect_to admin_bundle_path(@bundle)
    end
  end

  def destroy
    @bundle = Bundle.find(params[:id])
    @bundle.destroy
    redirect_to admin_bundles_path
  end

  protected
  def bundle_params
    params.require(:bundle).permit!
  end
end
