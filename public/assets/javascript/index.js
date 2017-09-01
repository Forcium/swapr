$(document).ready(function() {

  $.post("/", {token: window.localStorage.getItem("token")}).then(function(data){


    if (!data){

      window.localStorage.clear("token");

    }
    else {

      $('#temp1').html("Logged in as: " + data.username + "&nbsp;&nbsp;");
      $('#temp1').attr("href", "/profile");
      $('#temp2').html("Sign Out");
      $('#temp2').attr({"href": "/", "id":"logOutBtn"});
      $('#logOutBtn').on("click", function(){

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
      passWord: passWord.val().trim()
    });
  }

  function userLoginInfo(LoginData){

    $.post("/api/login", LoginData).done(function(response){

      console.log(response);
      if (response === 1) {
      window.localStorage.setItem("token", response.token);
      window.location = "/profile/";
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
      zip: "90021",
      username: userNameInput.val().trim(),
      pw: passwordInput.val().trim()
    });
  }


  function upsertUser(UserData) {
    $.post("/api/isloggedin", UserData).done(function(res)
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
