class BundleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchProducts: [],
      bundleProducts: props.bundle.products || []
    }
  }

  componentDidMount(){
    Ladda.bind( '.ladda-button' );
  }

  searchProducts(e){
    e.preventDefault();
    e.stopPropagation();
    var self = this;
    $.get("/api/products/search", {q: this.searchInput.value}, function(products) {
      Ladda.stopAll();
      self.setState({
        searchProducts: products
      });
    });
  }

  addProduct(product){
    this.state.bundleProducts.push(product);
    this.setState({bundleProducts: this.state.bundleProducts});
  }

  removeProduct(product){
    _.remove(this.state.bundleProducts, function(bundleProduct){
      return bundleProduct.id == product.id;
    });
    this.setState({bundleProducts: this.state.bundleProducts});
  }

  componentDidUpdate(prevProps, prevState){
    $("[data-rating]").each(function(){
      var rating = parseFloat($(this).data('rating'));
      if (rating > 0) {
        $(this).rateYo({
          rating: rating,
          starWidth: '13px',
          readOnly: $(this).attr('readonly')
        });
      }
    });
  }

  render() {
    var self = this;
    return (
      <div>
        <div className="page-header">
          <h4><i className="fa fa-cubes" aria-hidden="true"></i> Add Products</h4>
        </div>
        <form id="search-prodduct-form" onSubmit={this.searchProducts.bind(this)}>
          <div className="grid-form">
            <div className="row">
              <div className="col-sm-12 field-cell">
                <label className="control-label float"><i className="fa fa-search" aria-hidden="true" /> Search products</label>
                <input type="text" name="query" ref={(i) => { this.searchInput = i; }} placeholder="Product title" autoComplete="off" />
                <button id="search-product" type="submit" className="btn btn-default overlay-button ladda-button" data-style="zoom-out" data-spinner-color="#777"><span className="fa fa-search"></span> Search</button>
              </div>
            </div>
          </div>
        </form>
        <div>
          {
            this.state.searchProducts.map((product) => {
              var added = _.some(this.state.bundleProducts, function(bundleProduct){
                return bundleProduct.id == product.id;
              });
              var addButton;
              if (added) {
                addButton = <button type="button" className="btn btn-sm btn-success" disabled><i className="fa fa-check" aria-hidden="true"></i> Added</button>
              }else{
                addButton = <button type="button" className="btn btn-sm btn-primary" onClick={self.addProduct.bind(self, product)}><i className="fa fa-plus" aria-hidden="true"></i> Add</button>
              }

              return(
                <div className="ui-menu-item" key={product.id}>
                  <span className="img">
                    <img src={ product.image_url } />
                  </span>
                  <span className="title"> { product.title }
                    {addButton}
                  </span>
                  <span data-rating={ product.reviews_average } readOnly></span>
                  <span className="price"> ${ product.price } </span>
                </div>
              )
            })
          }
        </div>
        <form id="new-bundle-form" className="simple_form form-horizontal" noValidate="novalidate" encType="multipart/form-data" action={self.props.bundle.id ? ("/admin/bundles/" + self.props.bundle.id) : "/admin/bundles"} acceptCharset="UTF-8" method="post">
          {self.props.bundle.id ? <input type="hidden" name="_method" value="patch" /> : null }

          <div className="page-header">
            <h4><i className="fa fa-tags" aria-hidden="true"></i> Bundle Products</h4>
          </div>
          <div>
          {
            this.state.bundleProducts.map((product) => {
              return(
                <div className="ui-menu-item" key={product.id}>
                  <span className="img">
                    <img src={ product.image_url } />
                  </span>
                  <span className="title"> { product.title }
                    <button type="button" className="btn btn-sm btn-danger" onClick={self.removeProduct.bind(self, product)}><i className="fa fa-remove" aria-hidden="true"></i> Remove</button>
                  </span>
                  <span data-rating={ product.reviews_average } readOnly></span>
                  <span className="price"> ${ product.price } </span>
                  <input type="hidden" name="bundle[product_ids][]" value={product.id} />
                </div>
              )
            })
          }
          </div>
          <br />
          <div className="page-header">
            <h4><i className="fa fa-percent" aria-hidden="true"></i> Discount</h4>
          </div>
          <div className="grid-form">
            <div className="row">
              <div className="col-sm-12 field-cell">
                <div className="form-group float required bundle_discount_percentage">
                  <div>
                    <input className="form-control input-sm numeric float required" placeholder="Discount percentage" type="number" step="any" name="bundle[discount_percentage]" id="bundle_discount_percentage" defaultValue={self.props.bundle.discount_percentage} />
                  </div>
                  <label className="control-label float required" htmlFor="bundle_discount_percentage">
                    <abbr title="required">*</abbr> Discount percentage (%)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <button id="bundle-form-submit" className="btn btn-default ladda-button pull-right" data-style="zoom-out" data-spinner-color="#777">
              <span className="ladda-label">
                <i className="fa fa-check">&nbsp;</i>
                Save
              </span>
            </button>
            <div className="clearfix" />
          </div>
        </form>
      </div>
    );
  }
}