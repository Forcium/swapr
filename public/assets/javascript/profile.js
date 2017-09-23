$(document).ready(function() {

  //Get number of Listings
  $.post("/api/allListings", {
    profileID: window.localStorage.getItem("profileID")
  }).then(function(data){
    $("#listingsActive").html("Listings Active: " + data.length);
  });

  //Get number of Offers
  $.get("/api/stuffUwant", {
      ProfileId: window.localStorage.getItem("profileID")
  }).then(function(data3){
    var counter = 0;
    try {
      for (var i = 0; i < data3.length; i++) {
        if (typeof data3[i].TransactionsSellerItem[0].Item !== undefined){
          counter++;
        }
      }
    }
    catch (err) {};
    $("#recentOffers").html("Offers Made: " + counter);
  });

  //main profile
  //Looking for the query string "offers" from url
  var pathArray = window.location.href.split('/');
  var qstring = pathArray[4];

  //If query string "?offers" exists, remove the "?"
  if (pathArray[4]) {
  qstring = qstring.substr(1);

    if (qstring === "offers") {

      $('#stuffUwant').attr("style", "display: static");
      $('#listOfItems').hide();
      $('#changeProfile').hide();
      $('#pendingSwaps').hide();
      $('#profileHome').hide();
      $('.button-collapse').sideNav('hide');

    }

  }


    $('#pendingSwaps').hide();
    $('#listOfItems').hide();
    $('#changeProfile').hide();
    $('#stuffUwant').hide();
    //textera
    $('#textarea1').trigger('autoresize');

    //modals
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
    });
    $('select').material_select();
    //modals

    // Initialize collapse button
    $(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    $('.collapsible').collapsible();


  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){

    if (!data){

      window.localStorage.clear();
      window.location.href = "/";

    }
    else {

      //main page welcome header content
      $('#userWelcome').html("Welcome, " + data.username);
      $('#avatarImg').attr("src", data.avatar);
      $('#homePageImg').attr("src", data.avatar);
      $('.name').html(data.username);
      $('.email').html(data.email);
      $('#hdnTkn').attr("value", window.localStorage.getItem("token"));
      $('#hdnId').attr("value", window.localStorage.getItem("profileID"));
      $('#homePageFirstName').html("Hello, " + data.firstName +"!");

      //main page welcome header content
      $('#firstName').attr("placeholder", data.firstName);
      $('#lastName').attr("placeholder", data.lastName);
      $('#email').attr("placeholder", data.email);
      $('#phone').attr("placeholder", data.phone);
      $('#city').attr("placeholder", data.city);
      $('#state').attr("placeholder", data.state);
      $('#username').attr("placeholder", data.username);
      $('#firstName').attr("value", data.firstName);
      $('#lastName').attr("value", data.lastName);
      $('#email').attr("value", data.email);
      $('#phone').attr("value", data.phone);
      $('#city').attr("value", data.city);
      $('#state').attr("value", data.state);
      $('#username').attr("value", data.username);
      $('#firstNameHdn').attr("value", data.firstName);
      $('#lastNameHdn').attr("value", data.lastName);
      $('#emailHdn').attr("value", data.email);
      $('#phoneHdn').attr("value", data.phone);
      $('#cityHdn').attr("value", data.city);
      $('#stateHdn').attr("value", data.state);
      $('#usernameHdn').attr("value", data.username);
      $('#passwordHdn').attr("value", data.pw);
      $('#avatarHdn').attr("value", data.avatar);
    }

      });

//nav bar profile onclick functions=================

  //list of items
  $('#urStuff').on("click", function() {
    $.post("/api/allListings", {
      profileID: window.localStorage.getItem("profileID")
    }).then(function(data){
        $('#listingCards').empty();
        try {
          for (var i = 0; i < data.length; i++) {
            if (typeof data[i].TransactionsSellerItem[0].Transaction !== undefined && data[i].TransactionsSellerItem[0].Transaction.BuyerProfileId !== null && data[i].TransactionsSellerItem[0].Transaction.offerAccepted === false) {
            $('#listingCards').append('<a href="/listing/'
            +data[i].id
            +'" class="indItemCard" value="'
            +data[i].id
            +'"><div class="col s3 card hoverable" id="imageCard"><div class="card-image"><img id="userPhoto" class="responsive-img" src='
            +data[i].item_img1
            +'><a class="btn-floating halfway-fab waves-effect waves-light light-green darken-1 modal-trigger" data-target="modalBids"><i class="material-icons">error</i></a></div><div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'
            +data[i].item_name
            +'</h6></div></div></a>');
            }
            else if (typeof data[i].TransactionsSellerItem[0].Transaction !== undefined && data[i].TransactionsSellerItem[0].Transaction.BuyerProfileId !== null && data[i].TransactionsSellerItem[0].Transaction.offerAccepted === true){
              $('#listingCards').append('<a href="/listing/'
              +data[i].id
              +'" class="indItemCard" value="'
              +data[i].id
              +'"><div class="col s3 card hoverable" id="imageCard"><div class="card-image"><img id="userPhoto" class="responsive-img" src='
              +data[i].item_img1
              +'><a class="btn-floating halfway-fab waves-effect waves-light red darken-1 modal-trigger" data-target="modalBids"><i class="material-icons">check</i></a></div><div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'
              +data[i].item_name
              +'</h6></div></div></a>');
            }
            else {
              $('#listingCards').append('<a href="/listing/'
              +data[i].id
              +'" class="indItemCard" value="'
              +data[i].id
              +'"><div class="col s3 card hoverable" id="imageCard"><div class="card-image"><img id="userPhoto" class="responsive-img" src='
              +data[i].item_img1
              +'></div><div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'
              +data[i].item_name
              +'</h6></div></div></a>');
            }
          }
        }
        catch (err) {
        };


      //
      //
      // for (var i = 0; i < data.length; i++) {
      //   $('#listingCards').append('<a href="/listing/'+data[i].id+'" class="indItemCard" value="'+data[i].id+'"><div class="col s3 card hoverable" id="imageCard"><div class="card-image"><img id="userPhoto" class="responsive-img" src='+data[i].item_img1+'><a class="btn-floating halfway-fab waves-effect waves-light light-green darken-1 modal-trigger" data-target="modalBids"><i class="material-icons">error</i></a></div><div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'+data[i].item_name+'</h6></div></div></a>');
      // }


    $('#listOfItems').show();
    $('#changeProfile').hide();
    $('#pendingSwaps').hide();
    $('#stuffUwant').hide();
    $('#profileHome').hide();
    $('.button-collapse').sideNav('hide');
    });
  });
  //offers made
  $('#offer').on("click", function() {

    $.get("/api/stuffUwant", {
        ProfileId: window.localStorage.getItem("profileID")
    }).then(function(data3){

      $('#offerMadeCards').empty();
      try {
        for (var i = 0; i < data3.length; i++) {
          if (typeof data3[i].TransactionsSellerItem[0].Item !== undefined) {
          $('#offerMadeCards').append('<a href="/listing/'
          +data3[i].TransactionsSellerItem[0].Transaction.SellerItemId
          +'" class="indItemCard" value="'
          +data3[i].TransactionsSellerItem[0].Transaction.SellerItemId
          +'"><div class="col s3 card hoverable" id="imageCard"><div class="card-image"><img id="userPhoto" class="responsive-img" src="'
          +data3[i].TransactionsSellerItem[0].Items[0].item_img1
          +'"></div><div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'
          +data3[i].TransactionsSellerItem[0].Items[0].item_name
          +'</h6><h6>Owned by:</h6><div>'
          + '<img id="avatarImg" class="circle" width="20" height="20" src="'
          + data3[i].TransactionsSellerItem[0].avatar
          + '" />&nbsp;'
          + data3[i].TransactionsSellerItem[0].username
          + '</div></div></div></a>');
          }
        }
      }
      catch (err) {
      };
    });

    $('#stuffUwant').show();
    $('#listOfItems').hide();
    $('#changeProfile').hide();
    $('#pendingSwaps').hide();
    $('#profileHome').hide();
    $('.button-collapse').sideNav('hide');
  });
  //pending swaps
  $('#pend').on("click", function() {
    $('#listOfItems').hide();
    $('#changeProfile').hide();
    $('#stuffUwant').hide();
    $('#profileHome').hide();
    $('#pendingSwaps').show();
    $('.button-collapse').sideNav('hide');
  });
  //update profile
  $('.update').on("click", function() {
    $('#changeProfile').show();
    $('#pendingSwaps').hide();
    $('#listOfItems').hide();
    $('#stuffUwant').hide();
    $('#profileHome').hide();
    $('.button-collapse').sideNav('hide');



      var options = {
        beforeSubmit: showRequest, // pre-submit callback
        success: showResponse // post-submit callback
      };

      // bind to the form's submit event
      $(document).on("submit", "#frmUploader", function(event) {
        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation
        return false;
      });

      $(document).on("submit", "#addListing", function(event) {

        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation
        return false;
      });
    });

    // pre-submit callback
    function showRequest(formData, jqForm, options) {
      alert('Uploading is starting.');
      return true;
    }

    // post-submit callback
    function showResponse(responseText, statusText, xhr, $form) {
      alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
    }

    //delete account button
    $(document).on("click", "#deleteAcct", function(event){
      event.preventDefault();
      $.post("/api/deleteAcct", {
        profileID: window.localStorage.getItem("profileID"),
        token: window.localStorage.getItem("token")
      }).then(function(data){
        window.localStorage.clear();
        window.location.href = "/";
      });
    });

    //logout
    $(document).on("click", "#exit", function(event) {
      window.localStorage.clear();
      window.location.href = "/";
    });
}); //doc ready
