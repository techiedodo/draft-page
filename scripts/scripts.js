$(document).ready(function(){
  // Validator
  $(function() {
    $('#contact-form').validator();
    $('#contact-form').on('submit', function(e) {
      if (!e.isDefaultPrevented()) {
        var url = "email.php";
        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function(data) {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }
            }
        });
        return false;
      }
    })
  });


  $("li a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // Menu Toggle
    $(".menu-toggle").on('click', function() {
      $(this).toggleClass("on");
      $('.menu-section').toggleClass("on");
      $(".menu ul").toggleClass('hidden');
    });
  // Scroll Features
  $(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    $('#main-header').css({
      'transform': 'translateY(' + wScroll/1.5 + '%)'
    });
    if (wScroll > 100){
      console.log(wScroll);
      $('.header').addClass('blur-image');
      $('.logo img').addClass('shrink-logo');
      $('#main-header').addClass('text-opacity')
    } else {
      $('.header').removeClass('blur-image');
      $('.logo img').removeClass('shrink-logo');
      $('#main-header').removeClass('text-opacity')
    }

    if (wScroll > $('.header').offset().top+250){
      $('.text-center > img').each(function(i){
        setTimeout(function(){
          $('.text-center > img').eq(i).css('opacity', '1');
        }, 250*(i+1));
      });
    }

    if (wScroll > $('.services').offset().top+100){
      $('img').css('top', 0)
    }

    if (wScroll > $('.secondary').offset().top) {
      $('#samples > .col-xs-4 > a > img').each(function(i){
        setTimeout(function(){
          $('#samples > .col-xs-4 > a > img').eq(i).css('opacity', '1');
        }, 350*(i+2));
      });
    }

    if (wScroll > $('.about').offset().top) {
      $('#logo-bottom').css('opacity', '1');
    }
  });
})
