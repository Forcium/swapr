$(document).ready(function() {



      $.get("/api" + window.location.pathname, {
        profileID: window.localStorage.getItem("profileID")
      }).then(function(data) {

          $('.nameText').html(data.item_name);
          $('.darkText').html(data.item_description);
          $('#carousel1').attr('src', data.item_img1);
          $('#carousel2').attr('src', data.item_img2);
          $('#carousel3').attr('src', data.item_img3);

          $(document).on("click", "#editListing", function(event) {

              var pathArray = window.location.href.split('/');
              console.log(pathArray);
                var qstring = pathArray[4];

                $("#hdnId").attr("value", qstring);



                // $('#editListing').on("click", function() {
                //   console.log("2 click");
                //   $.post("/api/editItem", {
                //     profileID: window.localStorage.getItem("profileID")
                //   }).then(function(data) {
                //     console.log("click");
                //     $('#listingCards').empty();
                //
                //   });
                // });
              });


            //if yours of item  is you
            if (data.ProfileId === parseInt(window.localStorage.getItem("profileID"))) {

              console.log("matched");
              $(".sellerBtn").empty();


            }
            //if others
            else {

              console.log("not matched");
              $(".ownerBtn").empty();
              $('select').material_select('destroy');


              $.post("/api/allListings", {
                profileID: window.localStorage.getItem("profileID")
              }).then(function(data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                  // var value = "some value";
                  console.log(data[i].id);
                  $("#selectDropdown").append(
                    $("<option></option>")
                    .prop("value", data[i].id)
                    .text(data[i].item_name)
                    .attr("data-icon", data[i].item_img1)
                    .attr('class', 'circle left')

                  );

                  //intialize
                  $('select').material_select();
                }
                $('.swapBtn').on('click', function(data) {
                  var x = $("#selectDropdown").val();
                  console.log(x);
                });
              });

            }

          });

        $('.carousel').carousel();



      });
