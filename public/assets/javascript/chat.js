
var config = {
    apiKey: "AIzaSyAvfQNHxo8df0lNiPlMWFgu95tBl8rd8Eg",
    authDomain: "class-test-829c1.firebaseapp.com",
    databaseURL: "https://class-test-829c1.firebaseio.com",
    projectId: "class-test-829c1",
    storageBucket: "class-test-829c1.appspot.com",
    messagingSenderId: "38207736538"
  };

firebase.initializeApp(config);

var userData = firebase.database();
$("#add-msg-btn").on("click", function() {

  var user = $("#user-name-input").val().trim();
  var messages = $("#message-input").val().trim();

  var newTrain = {

    name: user,
    message: messages,
  };

  userData.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.message);

  alert("Message sent");

  $("#user-name-input").val("");
  $("#message-input").val("");
  return false;

});

userData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var userName = childSnapshot.val().name;
  var userMessage = childSnapshot.val().message;


  console.log(userName);
  console.log(userMessage);
  

  $("#msg-table > tbody").append("<tr><td>" + userName + "</td><td>" + userMessage + "</td></tr>");

});

