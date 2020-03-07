$( document ).ready(function() {
    var x = 70;
    var y = 30;
  $('.seo.circle').circleProgress({
    value: x/100
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(x * progress) + '<i>%</i>');
  });

  $('.aoda.circle').circleProgress({
    value: y/100
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(y * progress) + '<i>%</i>');
  });
})(jQuery);