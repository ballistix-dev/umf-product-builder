// $(function() {
//
//   $("input[type=text], input[type=email], input[type=tel], select, textarea").bind({
//     focus: function() {
//       $(this).prev("label").addClass('active');
//     },
//     focusout: function() {
//       if (!$(this).val()) {
//         $(this).prev("label").removeClass('active');
//       }
//     }
//   });
//
//   (function (jQuery) {
//     jQuery.mark = {
//       jump: function (options) {
//         var defaults = {
//           selector: 'a.scroll-to-anchor'
//         };
//         if (typeof options == 'string') {
//           defaults.selector = options;
//         }
//
//         options = jQuery.extend(defaults, options);
//         return jQuery(options.selector).click(function (e) {
//           var jumpobj = jQuery(this);
//           var target = jumpobj.attr('href');
//           var thespeed = 1000;
//           var offset = jQuery(target).offset().top;
//           jQuery('html,body').animate({
//             scrollTop: offset
//           }, thespeed, 'swing');
//           e.preventDefault();
//         });
//        }
//     };
//   })(jQuery);
//
//
//   jQuery(function(){
//     jQuery.mark.jump();
//   });
//
// });
