$(document).ready(function () {
  $('.blog-item').on('click', function () {
    $('.modal').addClass('display');
    $('.overlay').addClass('display');
  });
  $('.close').on('click', function () {
    $('.modal').removeClass('display');
    $('.overlay').removeClass('display');
  });
});
$(document).keydown(function (e) {
  if (e.keyCode == 27) {
    $('.modal').removeClass('display');
    $('.overlay').removeClass('display');
  }
});
