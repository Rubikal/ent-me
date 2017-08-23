class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      showBillingInfo: false,
      firstStepValid: true,
      secondStepValid: true,
      thirdStepValid: true,
      billingInfo: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        country: "Algeria"
      },
      shippingInfo:{
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        country: "Algeria"
      },
      paymentInfo:{
        first_name: "",
        last_name: "",
        accunt_number: "",
        cvv: "",
        expiration_date_month: "",
        expiration_date_year: ""
      }
    };
  }

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip();
    $(".remove-item").remove(); // Don't allow bascket edits anymore
  }

  activateStep(step, e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({step: step});
  }

  renderSteps(){
    return(
      <div>
        {this.renderFirstStep()}
        {this.renderSecondStep()}
        {this.renderThirdStep()}
      </div>
    );
  }

  handleInputChange(obj, e){
    var name = e.target.name,
        value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.state[obj][name] = value;
    this.setState(this.state);
  }

  validateFirstStep(e){
    e.preventDefault();
    e.stopPropagation();
    var billingInfo = this.state.billingInfo,
        shippingInfo = this.state.shippingInfo,
        valid = false;
    if(billingInfo.first_name.trim() != "" && billingInfo.last_name.trim() != "" &&
       billingInfo.email.trim() != "" && billingInfo.phone.trim() != "" &&
       billingInfo.address.trim() != "" && billingInfo.city.trim() != "" &&
       billingInfo.postal_code.trim() != "" && billingInfo.country.trim() != ""){
      if(this.state.showBillingInfo){
        if(shippingInfo.first_name.trim() != "" && shippingInfo.last_name.trim() != "" &&
           shippingInfo.phone.trim() != "" && shippingInfo.address.trim() != "" &&
           shippingInfo.city.trim() != "" && shippingInfo.postal_code.trim() != "" &&
           shippingInfo.country.trim() != ""){

           valid = true;
        }
      }else{
        valid = true;
      }
    }
    if(valid){
      this.state.firstStepValid = true;
      this.activateStep(2);
    }else{
      alert("All fields are required!");
      this.state.firstStepValid = false;
      this.setState(this.state);
    }
  }

  validateSecondStep(e){
    e.preventDefault();
    e.stopPropagation();

    this.activateStep(3);
  }

  validateThirdStep(e){
    e.preventDefault();
    e.stopPropagation();

    var paymentInfo = this.state.paymentInfo,
        valid = false;
    if(paymentInfo.first_name.trim() != "" && paymentInfo.last_name.trim() != "" &&
       paymentInfo.accunt_number.trim() != "" && paymentInfo.cvv.trim() != "" &&
       paymentInfo.expiration_date_month.trim() != "" && paymentInfo.expiration_date_year.trim() != ""){
        valid = true;
    }
    if(valid){
      this.state.thirdStepValid = true;
      alert("Done!");
      this.saveForm();
    }else{
      alert("All fields are required!");
      this.state.thirdStepValid = false;
      this.setState(this.state);
    }
  }

  saveForm(){

  }

  toggleShowBillingInfo(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({showBillingInfo: !this.state.showBillingInfo});
  }

  renderFirstStep(){
    var stepContainerClass =  this.state.step === 1 ? "col-sm-12 col-md-9" : "col-sm-12 col-md-9 hide",
        billingInfo = this.state.billingInfo,
        shippingInfo = this.state.shippingInfo,
        shippingContainerClass = this.state.showBillingInfo ? "row" : "row hide";

    return(
      <div className={stepContainerClass}>
        <div id="checkout-page">
          <form className="custom">
            <h2>Billing Information</h2>
            <div id="billing-info" className="row">
              <div className={!this.state.firstStepValid && billingInfo.first_name.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" } >
                <input data-mirror="" type="text" className="form-control" name="first_name" value={billingInfo.first_name}  onChange={this.handleInputChange.bind(this, "billingInfo")}  placeholder="First Name"/>
                <label htmlFor="billing_firstName">First Name</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.last_name.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="last_name"  value={billingInfo.last_name}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="Last Name"/>
                <label htmlFor="billing_lastName">Last Name</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.email.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input type="email" className="form-control" name="email" value={billingInfo.email}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="E-mail Address"/>
                <label htmlFor="billing_email">E-mail Address</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.phone.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="phone" value={billingInfo.phone}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="Phone Number"/>
                <label htmlFor="billing_phone">Phone Number</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.address.trim() === "" ? "col-sm-12 form-group has-error" : "col-sm-12 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="address" value={billingInfo.address}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="Address"/>
                <label htmlFor="billing_address">Address</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.city.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="city" value={billingInfo.city}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="City"/>
                <label htmlFor="billing_city">City</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && billingInfo.postal_code.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="postal_code" value={billingInfo.postal_code}  onChange={this.handleInputChange.bind(this, "billingInfo")} placeholder="Zip Code"/>
                <label htmlFor="billing_postalCode">Zip Code</label>
                <span className="error"></span>
              </div>
              <div className="col-sm-6 form-group">
                <label htmlFor="billing_country">Country</label>
                <select className="chzn-select form-control" name="country" value={billingInfo.country}  onChange={this.handleInputChange.bind(this, "billingInfo")}>
                  <option value="Algeria">Algeria</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="China">China</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Egypt">Egypt</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <span className="error"></span>
              </div>
            </div>
            <h2 className="inline-block">Shipping Information</h2>
            <div className="h6">
              <a className="btn btn-default" href="#" onClick={this.toggleShowBillingInfo.bind(this)}>

              {!this.state.showBillingInfo && <i className="fa fa-check"></i> }
              {this.state.showBillingInfo && <i className="fa" style={{visibility: "hidden"}}></i> }

              </a>
              &nbsp; Same as Billing Information
            </div>
            <div id="shipping-info" className={shippingContainerClass}>
              <div className={!this.state.firstStepValid && shippingInfo.first_name.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="first_name" value={shippingInfo.first_name}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="First Name"/>
                <label htmlFor="shipping_firstName">First Name</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && shippingInfo.last_name.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="last_name" value={shippingInfo.last_name}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="Last Name"/>
                <label htmlFor="shipping_lastName">Last Name</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && shippingInfo.phone.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="phone" value={shippingInfo.phone}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="Phone Number"/>
                <label htmlFor="shipping_phone">Phone Number</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && shippingInfo.address.trim() === "" ? "col-sm-12 form-group has-error" : "col-sm-12 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="address"  value={shippingInfo.address}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="Address"/>
                <label htmlFor="shipping_address">Address</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && shippingInfo.city.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="city" value={shippingInfo.city}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="City"/>
                <label htmlFor="shipping_city">City</label>
                <span className="error"></span>
              </div>
              <div className={!this.state.firstStepValid && shippingInfo.postal_code.trim() === "" ? "col-sm-6 form-group has-error" : "col-sm-6 form-group" }>
                <input data-mirror="" type="text" className="form-control" name="postal_code" value={shippingInfo.postal_code}  onChange={this.handleInputChange.bind(this, "shippingInfo")} placeholder="Zip Code"/>
                <label htmlFor="shipping_postalCode">Zip Code</label>
                <span className="error"></span>
              </div>
              <div className="col-sm-6 form-group">
                <label htmlFor="shipping_country">Country</label>
                <select data-mirror="" className="chzn-select form-control" name="country" value={shippingInfo.country}  onChange={this.handleInputChange.bind(this, "shippingInfo")}>
                  <option value="Algeria">Algeria</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="China">China</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Egypt">Egypt</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <span className="error"></span>
              </div>
            </div>
            <div className="clearfix">
              <a className="btn btn-primary btn-lg btn-checkout-step pull-right" href="#" onClick={this.validateFirstStep.bind(this)} >Next Step <i className="fa fa-arrow-right"></i></a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderSecondStep(){
    var stepContainerClass =  this.state.step === 2 ? "col-sm-12 col-md-9" : "col-sm-12 col-md-9 hide";

    return(
      <div className={stepContainerClass}>
        <div id="checkout-page">
          <div className="custom">
            <h2>Shipping Method</h2>
            <input type="hidden" name="shippingMethod" />
            <table className="table table-bordered" id="shipping-methods">
              <tbody>
                <tr>
                  <td>
                    <div className="h6">
                      <a className="btn btn-default" href="javascript:;">
                      <i className="fa fa-check"></i>
                      </a>
                      &nbsp; Sample shipping method
                    </div>
                  </td>
                  <td className="narrow">
                    <span className="h3"> $5.00
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="clearfix">
              <a className="btn btn-default btn-lg btn-checkout-step pull-left" href="#" onClick={this.activateStep.bind(this, 1)}><i className="fa fa-arrow-left fa-arrow-right" /> Previous Step</a>
              <a className="btn btn-primary btn-lg btn-checkout-step pull-right" href="#" onClick={this.validateSecondStep.bind(this)} >Next Step <i className="fa fa-arrow-right" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderThirdStep(){
    var stepContainerClass = this.state.step === 3 ? "col-sm-12 col-md-9" : "col-sm-12 col-md-9 hide",
        paymentInfo = this.state.paymentInfo;
    return(
      <div className={stepContainerClass}>
        <div id="checkout-page">
          <h2>Payment Method</h2>
          <div id="payment_form">
            <h6>This is a test payment method. Never use your real credit card information in this form.</h6>
            <div>
              <div className="form row">
                <div className={!this.state.thirdStepValid && paymentInfo.first_name.trim() === "" ? "col-sm-6 form-group text left has-error" : "col-sm-6 form-group text left" }>
                  <input className="form-control" autoComplete="off" name="first_name" id="FIRSTNAME" type="text" placeholder="Cardholder First Name" value={paymentInfo.first_name}  onChange={this.handleInputChange.bind(this, "paymentInfo")} />
                  <label htmlFor="FIRSTNAME">Cardholder First Name</label>
                </div>
                <div className={!this.state.thirdStepValid && paymentInfo.last_name.trim() === "" ? "col-sm-6 form-group text right has-error" : "col-sm-6 form-group text right" }>
                  <input className="form-control" autoComplete="off" name="last_name" id="LASTNAME" type="text" placeholder="Cardholder Last Name" value={paymentInfo.last_name}  onChange={this.handleInputChange.bind(this, "paymentInfo")}/>
                  <label htmlFor="LASTNAME">Cardholder Last Name</label>
                </div>
                <div className={!this.state.thirdStepValid && paymentInfo.accunt_number.trim() === "" ? "col-sm-6 form-group text valid has-error" : "col-sm-6 form-group text valid" }>
                  <input className="form-control credit-card-input" autoComplete="off" name="accunt_number" id="ACCT" type="text" placeholder="Credit Card Number" value={paymentInfo.accunt_number}  onChange={this.handleInputChange.bind(this, "paymentInfo")}/>
                  <label htmlFor="ACCT">visa <i className="fa fa-check-circle" /></label>
                </div>
                <div className={!this.state.thirdStepValid && paymentInfo.cvv.trim() === "" ? "col-sm-6 form-group text helper has-error" : "col-sm-6 form-group text helper" }>
                  <input className="form-control" autoComplete="off" name="cvv" id="CVV2" type="text" placeholder="CVV2" value={paymentInfo.cvv}  onChange={this.handleInputChange.bind(this, "paymentInfo")}  />
                  <label htmlFor="CVV2">CVV2</label>
                  <i className="fa fa-question" data-container="body" data-toggle="tooltip" title="For MasterCard, Visa, and Discover, the CSC is the last three digits in the signature area on the back of your card. For American Express, it's the four digits on the front of the card." />
                </div>
                <div className={!this.state.thirdStepValid && paymentInfo.expiration_date_month.trim() === "" ? "col-sm-6 form-group select left has-error" : "col-sm-6 form-group select left" }>
                  <input className="form-control" type="text" name="expiration_date_month" id="EXPDATE_MONTH" placeholder="Expiration Date - Month" value={paymentInfo.expiration_date_month}  onChange={this.handleInputChange.bind(this, "paymentInfo")}/>
                  <label htmlFor="EXPDATE_MONTH">Expiration Date - Month</label>
                </div>
                <div className={!this.state.thirdStepValid && paymentInfo.expiration_date_month.trim() === "" ? "col-sm-6 form-group text right has-error" : "col-sm-6 form-group text right" }>
                  <input className="form-control" type="text" name="expiration_date_year" id="EXPDATE_YEAR" placeholder="Expiration Date - Year" value={paymentInfo.expiration_date_year}  onChange={this.handleInputChange.bind(this, "paymentInfo")} />
                  <label htmlFor="EXPDATE_YEAR">Expiration Date - Year</label>
                </div>
              </div>
              <div className="clearfix">
                <a className="btn btn-default btn-lg btn-checkout-step pull-left" href="#" onClick={this.activateStep.bind(this, 2)}><i className="fa fa-arrow-left" /> Previous Step</a>
                <button className="btn btn-danger solid btn-lg btn-checkout-step pull-right" onClick={this.validateThirdStep.bind(this)} >Pay Now <i className="fa fa-money" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCartInfo(){
    var total = this.state.step == 3 ? this.props.cartTotal+5 : this.props.cartTotal
    return(
      <div id="cart-totals" className="col-sm-12 col-md-3">
        <div id="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <ul className="price-list list-group">
            <li className="list-group-item">Subtotal: <span className="badge">${this.props.cartTotal}</span></li>
            { this.state.step===3 &&
              <li className="list-group-item">Shipping: <span className="badge">$5.00</span></li>
            }
            <li className="list-group-item">Tax: <span className="badge">$0.00</span></li>
            <li className="list-group-item order-total h4 clearfix"><span>Total:</span> <span className="badge">${total}</span></li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    var widget = this,
        secondStepClass = this.state.step > 1 ? "active" : "",
        thirdStepClass = this.state.step > 2 ? "active" : "" ;
    return(
      <div>
        <div id="banner" className="jumbotron row">
          <h1>Checkout</h1>
        </div>
        <section id="checkout" className="page-section row">
          <div id="checkout-progress">
            <ul className="breadcrumb list-inline checkout-progress">
              <li className="active">1. Billing Address</li>
              <li className={secondStepClass} >2. Shipping Method</li>
              <li className={thirdStepClass} >3. Pay</li>
            </ul>
          </div>
          {widget.renderSteps()}
          {widget.renderCartInfo()}
        </section>
      </div>
    );
  }
}
