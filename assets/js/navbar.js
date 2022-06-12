const navBtn = $('.nav-mobile-icon');
const navLinks = $('.nav-links');

$(navBtn).on('click', function toggleIcon() {
  $(navBtn).toggleClass('nav-mobile-icon-active');
  $(navLinks).toggleClass('nav-links-mobile');
  $('body').toggleClass('position-fixed');
  $('.hero .headline ').toggleClass('z-index-1');
});

if (window.innerWidth <= 1000) {
  $(function ($) {
    let lastScrollTop = 0;
    let delta = 1;
    $(window).scroll(function (e) {
      let st = $(this).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta) return;
      if (st > lastScrollTop && lastScrollTop > 0) {
        $('#nav').css('top', '-95px');
      } else {
        $('#nav').css('top', '0px');
        $('#nav').css({
          background:
            'linear-gradient( 180deg, rgba(0, 0, 0, 0.66) 6.22%, rgba(255, 255, 255, 0) 100% )',
        });
      }
      lastScrollTop = st;
    });
  });
}
