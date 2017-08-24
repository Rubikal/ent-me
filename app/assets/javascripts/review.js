(function(){
  $(document).ready(function() {
    // rating stars
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

    // validations
    $("#new_review").on('submit', function(){
      if($("[name='review[rating]']").val() === ""){
        alert("Rating required");
        return false;
      }
      return true;
    });

  });
})(jQuery);

