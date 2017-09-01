$(document).ready(function() {
  $('#pendingSwaps').hide();
  $('#listOfItems').hide();
  $('#changeProfile').hide();
  $('#stuffUwant').hide();



  //modals
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
  });
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();

  //upload images

  var options = {
    beforeSubmit: showRequest, // pre-submit callback
    success: showResponse // post-submit callback
  };

  // bind to the form's submit event
  $('#listing').submit(function() {
    $(this).ajaxSubmit(options);
    // always return false to prevent standard browser submit and page navigation
    return false;
  });

//nav bar profile onclick functions=================

  //list of items
  $('#urStuff').on("click", function() {
    $('#listOfItems').show();
    $('#changeProfile').hide();
    $('#pendingSwaps').hide();
    $('#stuffUwant').hide();    
    $('.button-collapse').sideNav('hide');
  })
  //offers made
  $('#offer').on("click", function() {
    $('#stuffUwant').show();
    $('#listOfItems').hide();
    $('#changeProfile').hide();
    $('#pendingSwaps').hide();    
    $('.button-collapse').sideNav('hide');
  })
  //pending swaps
  $('#pend').on("click", function() {
    $('#listOfItems').hide();
    $('#changeProfile').hide();
    $('#stuffUwant').hide();
    $('#pendingSwaps').show();    
    $('.button-collapse').sideNav('hide');
  })
  //update profile
  $('#update').on("click", function() {
    $('#changeProfile').show();
    $('#pendingSwaps').hide();
    $('#listOfItems').hide();
    $('#stuffUwant').hide();
    $('.button-collapse').sideNav('hide');
  })

}); //doc ready

// pre-submit callback
function showRequest(formData, jqForm, options) {
  alert('Uploading is starting.');
  return true;
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
  alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
}
