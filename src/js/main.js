$(document).foundation();

$(document).ready(function(){
  var slider = $(".testimonials-list").unslider(
    {
        arrows: false,
        autoplay: true
    }
  );

  $("#next-arrow").click(function(){
    slider.unslider("next");
  });

  $("#prev-arrow").click(function(){
    slider.unslider("prev");
  });

  function scrollToAnchor(target){
    var tag = $("#" + target);
    alert(tag.offset().top);
  };

  $("a").click(function(e){
    e.preventDefault();
    var dest = $(this).attr("href");
    $("html, body").animate({scrollTop: $(dest).offset().top}, "slow");
  });

});
