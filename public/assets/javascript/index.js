$(document).ready(function() {

  $.get("/", function(){

    window.localStorage.getItem("token");

  }).done(function(){

    if (!window.localStorage.token){

      alert("not logged in");

    }
    else {

      alert("logged in");
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

 submit.click(function(event){
      event.preventDefault();
    $("html").animate({top: "510px"});

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

$(document).on("click", "#signupBtn", handleUserFormSubmit);


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
    $.post("/api/users", UserData).done(function(res)
    {
      window.localStorage.setItem("token", res.token);
      window.location = "/profile/";
    });
  }
  $(document).on("click", "#submit-search", function(event){
    event.preventDefault();

    var cards;

    cards = '<div class="col s12 m3">' +
    '<div class="card card hoverable" id="card">' +
    '<div class="card-image">' +
    '<img src="assets/images/nord.jpg">'  +
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
});
