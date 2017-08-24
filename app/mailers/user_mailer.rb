class UserMailer < ApplicationMailer
  layout 'mailer'
  default from: 'no-reply@entme.com'

  def receipt_summary(order)
    @user = order.user
    @order = order
    mail(to: @user.email, subject: 'Your order summary from ent-me.com')
  end
end
