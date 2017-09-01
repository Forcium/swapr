$(document).ready(function(){

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

      //write to page

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
