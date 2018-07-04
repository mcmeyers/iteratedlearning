//This is the javascript file for the iterated learning study. It is missing many things and there is a lot that needs to be done. 
//A lot of this code was taken from Claire Bergy and Long Ouyang

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

getCurrentDate = function() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return (month + "/" + day + "/" + year);
}


// Show the instructions slide -- this is what we want subjects to see first.
showSlide("intro");


//MAIN EXPERIMENT
var experiment = {
  //Parameters for this sequence

  //things collected and stored in the intro slide
  subid:"",
  subage:0,
  generation:0,
  condition:0,
  date: getCurrentDate(),

  //data collected during training

  //data collected during trials 

  // An array to store the data that we're collecting.**** NOT REAL
  data: [],

  // The function that gets called when the sequence is finished.*** NOT REAL
  next: function() {
    // Show the next slide.
    showSlide("training");
    $("td").bind("click", function(){
    // change style here
    $(this).addClass("clicked1");
    
  });
  },
  

  //shows ending slide when the experiment is done; SHOULD SUBMIT DATA OR STORE **
  end: function(){
    showSlide("end");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    //setTimeout(function() { turk.submit(experiment) }, 1500);
  },

  //checks whether the experimenter has filled in the correct subject info in the first slide
  checkInput: function() {
    //subject ID
      if (document.getElementById("subjectID").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a subject ID</font>');
      return;
    }
    experiment.subid = document.getElementById("subjectID").value;

    //age
    if (document.getElementById("age").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a subject age</font>');
      return;
    }
    experiment.subage = parseInt(document.getElementById("age").value);

    //condition
    if (document.getElementById("condition").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a condition</font>');
      return;
    }
    experiment.condition = parseInt(document.getElementById("condition").value);

    //generation
    if (document.getElementById("generation").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a generation</font>');
      return;
    }
    experiment.generation = parseInt(document.getElementById("generation").value);

    //goes to training slide(SOON TO BE SEQUENCE**)
    experiment.next();
  }

}