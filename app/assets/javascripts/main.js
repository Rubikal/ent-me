(function(){
  $(document).ready(function() {
    $("[data-rating]").each(function(){
      var rating = parseFloat($(this).data('rating'));
      $(this).rateYo({
        fullStar: 1,
        rating: rating,
        starWidth: '13px',
        readOnly: $(this).attr('readonly'),
       onChange: function (rating, rateYoInstance) {
          $(this).next().val(rating);
        }
      });
    });

    $("#new_review").on('submit', function(){
      if($("[name='review[rating]']").val() === ""){
        alert("Rating required");
        return false;
      }
      return true;
    });

    $(document).on('click', '.quantity-selector .minus', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $el = $(this).siblings('.quantity'),
        q = parseInt($el.val())-1;
      if (q >= 1) {
        $el.val(q);

        if($(this).hasClass("js-cart")){
          updateCartItem(this, q);
        }
      }
    });

    $(document).on('click', '.quantity-selector .plus', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $el = $(this).siblings('.quantity'),
        q = parseInt($el.val())+1;
      $el.val(q);

      if($(this).hasClass("js-cart")){
        updateCartItem(this, q);
      }
    });

    var winWidth = $(window).width();
    $(window).resize(function() {
      winWidth = $(window).width();
    });

    $('#search-form').on('click', '.search-btn.toggle', function(e) {
      $(this).addClass('close-search').find('.fa').toggleClass('fa-search fa-times').closest('#search-form').addClass('active');
      $('.search-form').focus();
    });

    $('#search-form').on('click', '.search-btn.toggle.close-search', function(e) {
      $(this).removeClass('close-search').find('.fa').removeClass('fa-times').addClass('fa-search').closest('#search-form').removeClass('active');
    });

    // Add item to card
    $('.btn-add-cart').on('click', function() {
      var productID = $(this).data("productid"),
          self = this,
          count = null;

      $(this).prepend('<i class="fa fa-refresh fa-spin"/>');

      if($(this).hasClass('js-with-count')){
        count = $(".quantity").val();
      }
      $.ajax({
        type: "post",
        url: "/carts/add",
        data: {id: productID, count: count},
        success: function(data){
          $(self).find('.fa-refresh').remove();
          renderCart(data);
        },
        failure: function(data){
          $(self).find('.fa-refresh').remove();
          alert("Fail to add item to basket!")
        }
      });
    });

    // Remove item from card
    $('body').on('click', '.remove-item', function(e) {
      e.preventDefault()
      e.stopPropagation()

      var productID = $(this).data("productid");
      $(this).find('.fa').removeClass('fa-times').addClass('fa-refresh fa-spin');
      $(".js-cart-dropdown").addClass("open");
      $.ajax({
        type: "post",
        url: "/carts/remove",
        data: {id: productID},
        success: function(data){
          renderCart(data);
        },
        failure: function(data){
          alert("Fail to add item to basket!")
        }
      });
    });

    // Load cart data
    loadCart()
  });
})(jQuery);

function loadCart(){
  $.ajax({
    type: "get",
    url: "/carts/info",
    success: function(data){
      renderCart(data);
    },
    failure: function(data){
      alert("Fail to load basket data!")
    }
  });
}

function updateCartItem(item, count){
  var productID = $(item).data("productid");

  $.ajax({
    type: "post",
    url: "/carts/add",
    data: {id: productID, count: count, set: true},
    success: function(data){
      renderCart(data);
    },
    failure: function(data){
      alert("Fail to add item to basket!")
    }
  });
}

function renderCart(data){
  console.log(data);
  renderMiniBascket(data);
  renderBascket(data);
}

function renderMiniBascket(data){
  $(".js-item-count").text([data.count,  " Items"].join(''));
  $(".js-total-price").text(["$", data.total ].join(''));
  $(".js-subtotal").text(["Subtotal: $", data.total ].join(''));

  $(".cart-items").html("");
  if(data.items.length > 0){
    $(".mini-cart-totals").show();
    $.each(data.items, function(index, item){
      item = '<li class="row cart-item">' +
               '<div class="product-thumb col-xs-4">' +
                  '<img class="img-responsive" src='+item.image+' >' +
               '</div>' +
               '<div class="product-info col-xs-8">' +
                  '<h6 class="product-title">'+item.title+'</h6>' +
                  '<div class="price">' +
                     item.count + ' x <span>$' + item.price +'</span>' +
                  '</div>' +
                  '<a class="remove-item" data-productid='+item.id+' href="javascript:;"><i class="fa fa-times"></i></a>' +
               '</div>' +
            '</li>';
      $(".cart-items").append(item);
    });
  }else{
    $(".mini-cart-totals").hide();
    $(".cart-items").append('<h6>No items in cart.</h6>');
  }
}

function renderBascket(data){
  if($(".full-cart-items").length === 0){
    return;
  }

  $(".js-badge").text(["$", data.total ].join(''));
  $(".full-cart-items").html("");
  if(data.items.length > 0){
    $.each(data.items, function(index, item){
      item = '<div class="cart-item row">' +
              '<div class="col-xs-12 col-sm-2">' +
                '<div class="product-thumb">' +
                  '<img class="img-responsive" src='+item.image+'>' +
                '</div>' +
              '</div>' +
              '<div class="col-xs-12 col-sm-4 col-lg-5 cart-details">' +
                '<div class="h4 product-title">' +
                  '<a href="javascript:;">'+item.title+'</a>' +
                  '<p><small class="unit-price"> $'+item.price+'</small></p>' +
                '</div>' +
              '</div>' +
              '<div class="col-xs-12 col-sm-3 col-lg-2 cart-details ">' +
                '<div class="quantity">' +
                  '<div class="quantity-selector">' +
                    '<button class="quantity-btn minus btn btn-lg btn-default js-cart" data-productid='+item.id+'><i class="fa fa-minus"></i></button>' +
                    '<input type="text" class="form-control quantity" value='+item.count+'>' +
                    '<button class="quantity-btn plus btn btn-lg btn-default js-cart" data-productid='+item.id+'><i class="fa fa-plus"></i></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="col-xs-12 col-sm-3 col-lg-3 cart-details">' +
                '<div class="h4 total-price"> '+item.price+'</div>' +
                '<a class="remove-item" href="javascript:;" data-productid='+item.id+' ><i class="fa fa-times"></i></a>' +
              '</div>' +
            '</div>'
      $(".full-cart-items").append(item);
    });
  }else{
    $(".full-cart-items").append('<h6>No items in cart.</h6>');
  }
}
