$(document).ready(function() {

  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){


    if (!data){

      window.localStorage.clear();

    }
    else {

      $('#navLogin').html(data.username + "&nbsp;&nbsp;");
      $('#navLogin').attr("href", "/profile");
      $('#navSignup').html("Sign Out");
      $('#navSignup').attr({"href": "/", "id":"logOutBtn"});
      $('#logOutBtn').on("click", function(){

        window.localStorage.clear();

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

$(document).on("click", "#loginBtn", handleUserLogin);
$(document).on("click", "#signupBtn", handleUserFormSubmit);

  function handleUserLogin(event){
    event.preventDefault();

    var userName = $("#usernameLogin");
    var passWord = $("#passwordLogin");


    userLoginInfo({
      userName: userName.val().trim(),
      passWord: passWord.val().trim(),
    });
  }

  function userLoginInfo(LoginData){

    $.post("/api/login", LoginData).done(function(response){

      if (response[0] === 1) {

        $.get("/api/loginInfo", LoginData).done(function(response2){

          window.localStorage.setItem("token", response2.token);
          window.localStorage.setItem("profileID", response2.id);
          window.location = "/profile/";
        });
      }
      else {
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
      username: userNameInput.val().trim(),
      pw: passwordInput.val().trim()
    });
  }


  function upsertUser(UserData) {
    $.post("/api/isloggedin", UserData).done(function(res)
    {
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("profileID", res.id);
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
