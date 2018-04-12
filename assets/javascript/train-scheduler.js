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

//on click event 
  $("#newTrain").on("click", function(event){
      console.log(event);

      var name = $("#trainName-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var startTime = $("#startTime-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

        console.log(name);
        console.log(destination);
        console.log(startTime);
        console.log(frequency);

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
  });

    database.ref().on("child_added", function(snapshot){
        console.log(snapshot.val());

      
            var name = snapshot.val().name; 
                 console.log('Name: ', name);

            var destination = snapshot.val().destination; 
                 console.log('Destination: ', destination);

            var frequency = snapshot.val().frequency;
                 console.log('Frequency: ', frequency);

            var startTime = snapshot.val().startTime; 
                 console.log('Start time: ', startTime);

                 var firstTrainMoment = moment(startTime, 'HH:mm');
                 var nowMoment = moment();
               
                 var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
                 var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
                 var minutesAway = frequency - minutesSinceLastArrival;
               
                 var nextArrival = nowMoment.add(minutesAway, 'minutes');
                 var formatNextArrival = nextArrival.format("HH:mm");

			$('#trainSchedule').append(`<tr><td>${name}</td><td>${destination}</td><td>${frequency}</td><td>${formatNextArrival}</td><td>${minutesAway}</td>`);
       
           
           
            //in case of error
     }, function (errorObject) {
         console.log("The read failed: " + errorObject.code);

     })
});
