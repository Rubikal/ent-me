(function($){
  $(document).ready(function() {

    $(document).on('click', '.quantity-selector .minus', function() {
      var $el = $(this).closest('.quantity-selector').find('.quantity'),
        q = parseInt($el.val())-1;
      if (q >= 1) {
        $el.val(q);
      }
    });

    $(document).on('click', '.quantity-selector .plus', function() {
      var $el = $(this).closest('.quantity-selector').find('.quantity'),
        q = parseInt($el.val())+1;
      $el.val(q);
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
          renderBascket(data);
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
          renderBascket(data);
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
    url: "/carts",
    success: function(data){
      renderBascket(data);
    },
    failure: function(data){
      alert("Fail to load basket data!")
    }
  });
}

function renderBascket(data){
  $(".js-item-count").text([data.count,  " Items"].join(''));
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
    $(".cart-items").append('<li class="cart-item">No items in bascket! </li>');
  }
}
