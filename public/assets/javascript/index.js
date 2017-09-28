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

  $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
});

// Materialize.scrollFire(options);

$(document).on("click", "#loginBtn", handleUserLogin);
$(document).on("click", "#signupBtn", handleUserFormSubmit);
$('#modalLogin').on("keydown", function(event){
  if (event.which === 13){
    handleUserLogin(event);
  };
})
$('#modalSignup').on("keydown", function(event){
  if (event.which === 13){
    handleUserFormSubmit(event);
  };
})



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
        swal("Error!", "Account Not Found", "error");
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
    var password2Input = $("#password2");

    upsertUser({
      firstName: fNameInput.val().trim(),
      lastName: lNameInput.val().trim(),
      email: emailInput.val().trim(),
      phone: phoneInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zipcode: zipInput.val().trim(),
      username: userNameInput.val().trim(),
      pw: passwordInput.val().trim(),
      pw2: password2Input.val().trim()
    });
  }


  function upsertUser(UserData) {
    if (UserData.pw !== UserData.pw2) {
      swal("Error!", "Passwords Do Not Match", "error");
      $("#password").empty();
      $("#password2").empty();
    }
    else {


        if (UserData.firstName === "" ||
        UserData.lastName === "" ||
        UserData.city === "" ||
        UserData.email === "" ||
        UserData.phone === "" ||
        UserData.pw === "" ||
        UserData.state === "" ||
        UserData.username === "" ||
        UserData.zipcode === "") {
          swal("Error!", "Please Complete All Fields", "error");
        }
        else {

        $.post("/findDuplicate/", {
          username: UserData.username,
          email: UserData.email
          }).then(function(data){
            console.log(data);

        if (!data[0]) {
        $.post("/api/isloggedin", UserData).done(function(res)
          {
            window.localStorage.setItem("token", res.token);
            window.localStorage.setItem("profileID", res.id);
            window.location = "/profile/";
          });
        }
        else {

          swal("Sorry", "Username and/or Email already exists.", "info");
        }
        });
      }
    }
  };


  // Item search functionality
  $(document).on("click", "#submit-search", function(event){
    event.preventDefault();
    $('select').material_select();
    var cat= ($('#stuffCat :selected').val());
    var rad=($('.mileSearch :selected').val());
    var zip = $('#searchZip').val();
    console.log(cat, zip, rad);

    $('#body_content').empty();

    $.get("/results/" + cat + "/" + rad + "/" + zip , function(data){
    for (var i = 0; i < data.length; i++) {

    var cards;

    cards = '<div class="col s12 m6 l3">'
    +'<a href="/listing/'
    + data[i].id
    + '" class="indItemCard"><div class="col s3 card hoverable" id="imageCard">'
    + '<div class="card-image">'
    + '<img id="userPhoto" class="responsive-img" src="'
    + data[i].item_img1
    +'" />'
    + '</div>'
    + '<div class="card-action" id="nameOfCard"><h6 id="nameOfItem">'
    + data[i].item_name
    +'</h6></div></div></a></div>';

    console.log(cards);
    $('#body_content').append(cards);

  }


  });

});
