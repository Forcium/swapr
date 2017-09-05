$(document).ready(function(){

  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){

    if (!data){

      window.localStorage.clear("token");
      window.location.href = "/";

    }
    else {

      $('#carousel1').attr('src', '/assets/userUpload/1.png');
      $('#carousel2').attr('src', '/assets/userUpload/2.png');
      $('#carousel3').attr('src', '/assets/userUpload/3.png');


      $('.carousel').carousel();
    }
  });
});
