//This is the javascript file for the iterated learning study
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
  startTrain: function() {
    // Show the next slide.
    showSlide("training1");
    $("#t1Input td").bind("click", function(){
    // change style here
    $(this).toggleClass("clicked");
  });
  },

  startTrain2: function(){
    showSlide("training2");
    $("#t2Input td").bind("click", function(){
    // change style here
    $(this).toggleClass("clicked");
  });
  },

  startTrain3: function(){
    showSlide("training3");
    $("#t3Input td").bind("click", function(){
    // change style here
    $(this).toggleClass("clicked");
  });
  },
  

    //shows ending slide when the experiment is done; SHOULD SUBMIT DATA OR STORE **
  end: function(){
    showSlide("end");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    //setTimeout(function() { turk.submit(experiment) }, 1500);
  },

  //checks whether the person matched the two training grids correctly 
  checkGrid: function(input, target, error, nexttrain){
    var rowIndex= 0;
    var cellIndex= 0;
    var i;
    for(i=0; i<64; i++) {
      var inputElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      var targetElement = document.getElementById(target).rows[rowIndex].cells[cellIndex];

     //checks if the target cell is clicked or not
       if(targetElement.className == 'clicked'){
        //if target cell clicked, check if input cell is also clicked [RIGHT]
          if(inputElement.className == 'clicked'){
            //if yes, increase cell index by 1 (search next cell)
           cellIndex++;
          //if no, display error message
        } else {
          $(error).html('<font color="red"><strong>The two grids should be the same. Please try again<strong></font>');
          return;
        }
     //if the target cell is NOT clicked
    } else {
      //and the input cell IS clicked [WRONG]
      if(inputElement.className =='clicked'){
      //display error message
          $(error).html('<font color="red"><strong>The two grids should be the same. Please try again<strong></font>');
         return;
        } else {
      //move on!
          cellIndex++;
        } 
      }

      //move onto next row if you need to
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          if(nexttrain === 2){
            experiment.startTrain2();
          } 
          if(nexttrain ===3){
            experiment.startTrain3();
          } if(nexttrain != 2 && nexttrain != 3){
          experiment.end();
        }} else{
          cellIndex = 0;
        }
      }

    }
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
    experiment.startTrain();
  }

}

// for debugging, jump around with the line below
//experiment.startTrain()
