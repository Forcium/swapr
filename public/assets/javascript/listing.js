$(document).ready(function(){

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

  $(document).on("click", "#makeoffer", function(event){
    event.preventDefault();
    var pathArray = window.location.pathname.split('/');
    var query = "/api/makeOffer/" + pathArray[2] + "/1";
    console.log(query);
    $.post(query, {

      profileID: window.localStorage.getItem("profileID")

    }).then(function(data){
      console.log(data);
      window.location.href = "/listing/" + pathArray[2];
    });
  });
});
