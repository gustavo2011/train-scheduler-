$(document).ready(function(){
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWCyKBo33tehlJWB8qq_AeLpBD3kyFGgk",
    authDomain: "train-scheduler-55bf9.firebaseapp.com",
    databaseURL: "https://train-scheduler-55bf9.firebaseio.com",
    projectId: "train-scheduler-55bf9",
    storageBucket: "train-scheduler-55bf9.appspot.com",
    messagingSenderId: "156644033305"
  };
 firebase.initializeApp(config);

  var database = firebase.database();

  $("#newTrain").on("click", function(event){
      console.log(event);

      var name = $("#trainName-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var startTime = $("#startTime-input").val().trim();
      var frequency = $("#frequency-input").val().trim();


     var newTrain = {
         name: name,
         destination: destination,
         startTime: startTime,
         frequency: frequency,
}

    database.ref().push(newTrain);
        $('#trainName-input').val("");
        $('#destination-input').val("");
        $('#startTime-input').val("");
        $('#frequency-input').val("");


        alert('Train Added!!!');
  })

    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

            var name = childSnapshot.val().name; 
			var destination = childSnapshot.val().destination; 
			var frequency = childSnapshot.val().frequency; 
            var startTime = childSnapshot.val().startTime;
            
            console.log('Start Time: ', startTime);
			console.log('Remainder: ', remainder);
			console.log('Minutes: ', minutes);
			console.log('Arrival: ',arrival);

			$('#schedule').append(`<tr><td>${name}</td><td>${destination}</td><td>${frequency}</td><td>${arrival}</td><td>${minutes}</td>`)
    })


})
