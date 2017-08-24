$(function() {
  // Search input control
  $('#search-form').on('click', '.search-btn.toggle', function(e) {
    $(this).addClass('close-search').find('.fa').toggleClass('fa-search fa-times').closest('#search-form').addClass('active');
    $('.search-form').focus();
  });

  $('#search-form').on('click', '.search-btn.toggle.close-search', function(e) {
    $(this).removeClass('close-search').find('.fa').removeClass('fa-times').addClass('fa-search').closest('#search-form').removeClass('active');
  });
  // Auto complete
  $('#query').autocomplete({
      source: '/products/autocomplete',
      create: function () {
        $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
            var element = [
              '<span class="img">',
                '<img src="' + item.image_url + '" />',
              '</span>',
              '<span class="title">' + item.title + '</span>',
              '<span class="price">' + item.price + '</span>'
            ];
            return $('<li>').append(element.join('')).appendTo(ul);
        };
      },
      select: function(e, ui) {
        window.location.href="/products/"+ui.item.id
      }
    })
});
