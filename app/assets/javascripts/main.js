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

  });
})(jQuery);
