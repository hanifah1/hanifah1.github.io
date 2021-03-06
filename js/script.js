$(document).ready(function(){
  //for when DOM is ready

  // Smooth scrolling
  var $root = $('html, body');
  $('.navbar-nav a').click(function() {
    var href = $.attr(this, 'href');
    if (href != undefined && href != '#') {
      $root.animate({
        scrollTop: $(href).offset().top
      }, 500, function () {
        window.location.hash = href;
      });
    }
    return false;
  });

  //tooltip
  $(function () {
    $('#item1').tooltip();
    $('[data-toggle="tooltip"]').tooltip();
  });

  //facebook
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  //hide message box


  //puts line around messagebox

  $("#message").on("keyup", function() {
    //here we make sure we're catching the keyup
    var charCount = $("#message").val().length; //here we set the length of the content of the textarea to a variable
    // in here is where the rest of our code for this Exercise will go
    console.log(charCount);
    $("#char-count").html(charCount); //here we show a running character count to the user


    $("#sbutton").on("click", function() {
      var comment = $('#message').val();

      if(comment === "") {
        $("#message").css("border", "2px solid red");

      } else {

        $('#visible-comment').html(comment);
        $('.message-box').hide();
        return false;
      };
    });

    if(charCount > 50) {
      $("#char-count").css("color", "red");
    } else {
      $("#char-count").css("color", "black");
    };

  });//end if charCount === 0

  // work section
  for(var i = 0; i < works.length; ++i ) {
    //$("#work").append("\
    //<div class='col-sm-12 col-md-6' id='arrayJava'>\
    //<a class='work-img'>\
    //<img class='img-responsive' src='" + works[i].pic + "'>\
    //<span class='info2'><p class='proj-title'>" + works[i].type + "</p>" + works[i].title + "</span>\
    //</a>\
    //<p class='worksDesc'> " + works[i].desc +" </p>\
    //<a href='"+ works[i].html +"' class='arraylinks'>LAUNCH THE APP<br /> </a>\
    //<a href='"+ works[i].link +"' class='arraylinks2'>CLICK HERE TO CHECKOUT THE CODE<br /> </a>\
    //</div>\
    //"); 
    var images = $("#work img");

    $(images[i]).css("border", "2px solid #673888");

    $(".work-img").mouseenter(function(){
      $(".info2", this).show();
    }).mouseleave(function(){
      $(".info2", this).hide();
    });

  };

});// end doc.ready function
