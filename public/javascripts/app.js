// Start with loading page 2
var page = 2;
var scrollPagePercetage = 70;

$(function() {

  // Establish our image grid
  var container = $("#container");
  imagesLoaded(container, function() {
    container.masonry({
      itemSelector: ".item"
    });
  });


  // If we've scrolled to the bottom, load next page
  var isLoading = false;
  $(window).scroll(function () {
    if (isLoading) return;
    if (($(window).scrollTop() * 100 / $(document).height()) < 80) return;
    loadNextPage();
    isLoading = true;
  });

  function loadNextPage() {
    $.ajax("/?page=" + page++, {
      method: "GET",
      success: function(i) { i = $(i); container.append(i).masonry("appended", i, true).masonry(); },
    }).always(function() { isLoading = false; });
  }

});
