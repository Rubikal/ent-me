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

  });
})(jQuery);
