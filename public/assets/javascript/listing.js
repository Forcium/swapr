$(document).ready(function(){

      $.get("/api" + window.location.pathname, {
        profileID: window.localStorage.getItem("profileID")
      }).then(function(data){

      $('.nameText').html(data.item_name);
      $('.darkText').html(data.item_description);
      $('#carousel1').attr('src', data.item_img1);
      $('#carousel2').attr('src', data.item_img2);
      $('#carousel3').attr('src', data.item_img3);


      if (data.ProfileId === parseInt(window.localStorage.getItem("profileID"))){

        console.log("matched");
        $(".sellerBtn").empty();


      }

      else {

        console.log("not matched");
        $(".ownerBtn").empty();

      }

      });

      $('.carousel').carousel();
  });
