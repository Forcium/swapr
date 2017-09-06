$(document).ready(function(){

  var urlArr = window.location.pathname.split('/');
  var urlLength;
  console.log(window.location.pathname);
  console.log(urlArr);


  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){

    if (!data){

      window.localStorage.clear("token");
      window.location.href = "/";

    }
    else {

      $.get("/api" + window.location.pathname, {

        profileID: window.localStorage.getItem("profileID")

      }).then(function(data){

      $('.nameText').html(data.item_name);
      $('.darkText').html(data.item_description);
      $('#carousel1').attr('src', data.item_img1);
      $('#carousel2').attr('src', data.item_img2);
      $('#carousel3').attr('src', data.item_img3);

      });

      $('.carousel').carousel();
    }
  });
});
