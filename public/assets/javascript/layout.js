$(document).ready(function() {
  // parallax image js
  $('.parallax').parallax();
  // miles dropdown
  $('select').material_select();
  //modals
  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
    });
  $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
});

Materialize.scrollFire(options);
 

