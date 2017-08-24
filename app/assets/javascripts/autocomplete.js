$(function() {
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
