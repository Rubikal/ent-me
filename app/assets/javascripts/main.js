(function(){
  $(document).ready(function() {
    // Product increment/decrement count
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

    // News scroll
    $('.scroll-perfect').perfectScrollbar();
  });
})(jQuery);
