FactoryGirl.define do
  factory :payment_information do
    first_name "MyString"
    last_name "MyString"
    account_number "MyString"
    ccv "MyString"
    expiration_date_month ""
    expiration_date_year 1
  end
end
