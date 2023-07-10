(function($) {

jQuery.noConflict();

(function( $ ) {

  $(document).ready(function () {
    $('.accordion-tabs').each(function(index) {
      $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
    });
    $('body').on('click', '.accordion-tabs .tab-link', function(event) {
      if (!$(this).hasClass('is-active')) {
        event.preventDefault();
        var accordionTabs = $(this).closest('.accordion-tabs');
        accordionTabs.find('.is-open').removeClass('is-open').hide();//.slideUp(300);

        $(this).next().toggleClass('is-open').show();//.slideDown(300);
        accordionTabs.find('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
      } else {
        event.preventDefault();
      }
    });

});

})( jQuery );

})(jQuery);