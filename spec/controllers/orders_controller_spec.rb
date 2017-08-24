require 'rails_helper'

RSpec.describe OrdersController, type: :controller do

  describe "GET #receipt" do
    it "returns http success" do
      get :receipt
      expect(response).to have_http_status(:success)
    end
  end

end
