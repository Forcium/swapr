$(document).ready(function() {

  $.post("/", {
    token: window.localStorage.getItem("token")
  }).then(function(data) {


    if (!data) {

      window.localStorage.clear("token");

    } else {

      $('#navLogin').html("Logged in as: " + data.username + "&nbsp;&nbsp;");
      $('#navLogin').attr("href", "/profile");
      $('#navSignup').html("Sign Out");
      $('#navSignup').attr({
        "href": "/",
        "id": "logOutBtn"
      });
      $('#logOutBtn').on("click", function() {

        window.localStorage.clear("token");

      });

    }
  });
  // parallax image js
  $('.parallax').parallax();
  // miles dropdown
  $('select').material_select();
  //modals
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
  });

  // Scroll to items function ------------
  var card = $("#carditem");
  var submit = $("#submit-search");

  // submit.click(function(event){
  //      event.preventDefault();
  //    card.animate({bottom: "210px"});
  //  });

  submit.click(function(event) {
    event.preventDefault();
    $("html").animate({
      top: "510px"
    });

  });

  //    submit.click(function(event){
  //     event.preventDefault();
  //      $('html, body').animate({
  //                   scrollTop: $("html").offset().top
  //               }, 2000);

  // });
  // ----------------------------------------

  $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
});

// Materialize.scrollFire(options);

$(document).on("click", "#loginBtn", handleUserLogin);
$(document).on("click", "#signupBtn", handleUserFormSubmit);

function handleUserLogin(event) {
  event.preventDefault();

  var userName = $("#usernameLogin");
  var passWord = $("#passwordLogin");


  userLoginInfo({
    userName: userName.val().trim(),
    passWord: passWord.val().trim(),
  });
}

function userLoginInfo(LoginData) {

  $.post("/api/login", LoginData).done(function(response) {

    if (response[0] === 1) {

      $.get("/api/loginInfo", LoginData).done(function(response2) {

        window.localStorage.setItem("token", response2.token);
        window.location = "/profile/";
      });
    } else {
      alert("account not found");
    }
  });

}


function handleUserFormSubmit(event) {
  event.preventDefault();

  var fNameInput = $("#firstName");
  var lNameInput = $("#lastName");
  var emailInput = $("#email");
  var phoneInput = $("#phone");
  var cityInput = $("#city");
  var stateInput = $("#state");
  var zipInput = $("#zipcode");
  var userNameInput = $("#username");
  var passwordInput = $("#password");
  upsertUser({
    firstName: fNameInput.val().trim(),
    lastName: lNameInput.val().trim(),
    email: emailInput.val().trim(),
    phone: phoneInput.val().trim(),
    city: cityInput.val().trim(),
    state: stateInput.val().trim(),
    zip: "90021",
    username: userNameInput.val().trim(),
    pw: passwordInput.val().trim()
  });
}


function upsertUser(UserData) {
  $.post("/api/isloggedin", UserData).done(function(res) {
    window.localStorage.setItem("token", res.token);
    window.location = "/profile/";
  });
}
$(document).on("click", "#submit-search", function(event) {
  event.preventDefault();

  var cards;

  cards = '<div class="col s12 m3">' +
    '<div class="card card hoverable" id="card">' +
    '<div class="card-image">' +
    '<img src="assets/images/nord.jpg">' +
    '</div>' +
    '<div class="card-content">' +
    '<span id="title"class="card-title">Nord Electro up for grabs!</span>' +
    '<span>Leaving the State. Must trade fast!</span> <br />' +
    '<span class="card"> Los Angeles, CA </span>' +
    '</div>' +
    '</div>' +
    '</div>';


  console.log(cards);
  $('.body_content').append(cards);

// Google Maps------------------------------------
  var map;
  var markers = [];

  function initMap() {
    var haightAshbury = {lat: 34.179029, lng: -118.600661};

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: haightAshbury,
      mapTypeId: 'roadmap'
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
      addMarker(event.latLng);
    });

    // Adds a marker at the center of the map.
    addMarker(haightAshbury);
  }

  // Adds a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
// End Google Maps ------------------------




  // function codeAddress() {
  //   var address = document.getElementById('city').value;
  //   var radius = parseInt(document.getElementById('radius').value, 10) * 1000;
  //   geocoder.geocode({
  //     'address': address
  //   }, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       map.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         position: results[0].geometry.location
  //       });
  //       if (circle) circle.setMap(null);
  //       circle = new google.maps.Circle({
  //         center: marker.getPosition(),
  //         radius: radius,
  //         fillOpacity: 0.35,
  //         fillColor: "#FF0000",
  //         map: map
  //       });
  //       var bounds = new google.maps.LatLngBounds();
  //       for (var i = 0; i < gmarkers.length; i++) {
  //         if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(), marker.getPosition()) < radius) {
  //           bounds.extend(gmarkers[i].getPosition());
  //           gmarkers[i].setMap(map);
  //         } else {
  //           gmarkers[i].setMap(null);
  //         }
  //       }
  //       map.fitBounds(bounds);
  //
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }



});
