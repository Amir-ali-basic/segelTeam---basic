$(document).ready(function () {
  $('.arrowLeft').on('click', function () {
    $('.modal-img').parent().prepend($('.modal-img:last'));
  });
  $('.arrowRight').on('click', function () {
    $('.modal-img').parent().append($('.modal-img:first'));
  });
});
