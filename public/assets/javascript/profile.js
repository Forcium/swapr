$(document).ready(function() {

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

      window.localStorage.clear("token");
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
    $('#listOfItems').show();
    $('#changeProfile').hide();
    $('#pendingSwaps').hide();
    $('#stuffUwant').hide();
    $('#profileHome').hide();
    $('.button-collapse').sideNav('hide');
  });
  //offers made
  $('#offer').on("click", function() {
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

      $(document).on("submit", "#additembtn", function(event) {

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


}); //doc ready
