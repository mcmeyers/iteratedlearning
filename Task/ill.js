//This is the javascript file for the iterated learning study
//A lot of this code was taken from Claire Bergy and Long Ouyang
//Madeline Meyers Iterated Learning Study


// GENERAL FUNCTIONS 

// Shows slides
function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

//gets current date
getCurrentDate = function() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return (month + "/" + day + "/" + year);
}
//gets current time 
getCurrentTime = function() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10) minutes = "0" + minutes;
  return (hours + ":" + minutes);
}


//EXPERIMENT SETUP 

// Show the instructions slide 
showSlide("intro");

if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
    document.getElementById("notAccepted").innerHTML= "Please accept the HIT to Begin!!";
} else {
    $("#startButton").click(function(){
      experiment.startTrain();
    });
}

//creates initial seed grids 

var train1 = [[1,1,0,0,0,0,0,0],
              [1,1,0,0,0,0,0,0],
              [1,1,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,1,1],
              [0,0,0,0,0,0,1,1],
              [0,0,0,0,0,0,0,0]];


var train2 = [[1,0,0,0,0,0,0,0],
              [0,1,0,0,0,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,1,1,1]];

var trial1 = [[1,1,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,1,0,0],
              [1,0,0,0,0,1,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0]];

var trial2 = [[0,0,0,0,0,0,1,0],
              [0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,0],
              [1,0,0,0,1,0,0,0],
              [0,1,1,0,0,0,0,0],
              [0,1,1,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,1,1,0,0]];

var trial3 = [[1,0,0,0,0,0,0,0],
              [0,0,1,0,0,0,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,1,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,1,0,0,1],
              [0,0,1,0,0,0,0,0]];

var trial4 = [[0,1,0,0,0,0,1,0],
              [0,0,0,1,0,0,0,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,0,1],
              [0,0,0,0,0,0,0,1],
              [0,0,0,0,0,0,0,0],
              [0,0,1,0,1,1,0,0]];

var trial5 = [[1,0,1,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,1,0,0,0,0,1],
              [0,0,0,0,0,0,0,0],
              [0,1,0,0,1,1,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,0,1,0]];

var trial6 = [[0,0,0,0,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [1,0,0,0,0,1,0,0],
              [0,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,1,1,0,0,0,0]];

var trial7 = [[1,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,1],
              [0,0,0,0,1,1,0,1],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,1,1,0,0]];

var trial8 = [[0,0,1,0,0,0,0,1],
              [0,1,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,1,0,1,0],
              [0,0,0,0,1,1,0,0]];

var trial9 = [[1,0,0,0,0,0,1,0],
              [1,0,0,1,0,0,1,0],
              [0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,0,0],
              [0,0,0,0,0,1,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];

var trial10 = [[0,1,0,0,0,0,0,0],
              [0,0,0,0,1,1,0,0],
              [0,0,0,0,1,1,0,0],
              [0,0,0,0,0,0,0,0],
              [0,1,1,0,1,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];

var dataArray= [[0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];

var targetArray= [[0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];
              


var ding = document.getElementById("ding");

//MAIN EXPERIMENT
var experiment = {

  //things collected and stored from the intro slide
  subid: Math.random(1,100), 
  subage:0,
  generation:1,
  condition:"pilot1",
  date: getCurrentDate(),
  timestamp: getCurrentTime(), 
  comment: "NA",

  //counts what trial you are on 
  trialCount:0,



  //FUNCTIONS 

  //makes limit of highlighted cells 10, highlights clicked cells 
  max10items: function(clicked,input){
    var i; 
    var rowIndex = 0; 
    var cellIndex = 0; 
    var count = 0;
    //highlighs clicked cell
    $(clicked).toggleClass("clicked");
    //checks through grid to count how many cells are selected, disables selecting if there are 10 selected already
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      if (gridElement.className == "clicked"){
        count++;
      }    
      cellIndex++;
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          return; 
        } else{
          cellIndex = 0;
        }
      }
      if(count > 10){
        clicked.classList.remove("clicked");
      } 
    }
  },

  //starts training session 1 
  startTrain: function() {
    showSlide("training1");
    document.ontouchmove=function(event){
      event.preventDefault();
    };
    $("#t1Target td.clicked").click(function(){
      ding.play();
    });
    $("#t1Input td").click(function(){
      experiment.max10items(this,'t1Input');
    });
  },
  
  realEnd: function(){
    // Wait 1 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    //setTimeout(function() { turk.submit(experiment) }, 1000);
  },

  end: function(){
    showSlide("end");
    experiment.comment = parseInt(document.getElementById("comment").value);
  },

  //function that fills the target grid with array coordinates 
  fillGrid: function(input, trialArray){
    var i; 
    var rowIndex = 0; 
    var cellIndex = 0; 
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      if (trialArray[rowIndex][cellIndex] == 1){
        gridElement.classList.add("clicked");
      }    
      cellIndex++;
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          return; 
        } else{
          cellIndex = 0;
        }
      }
    }
  },

  //function to clear grids before each trial 
  clear: function(grid){ 
    var i; 
    var rowIndex = 0; 
    var cellIndex = 0; 
    //clears previous error message
    document.getElementById("error").innerHTML = "";
    //clears highlighted cells
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(grid).rows[rowIndex].cells[cellIndex];
      if(gridElement.classList == "clicked"){
        gridElement.classList.remove("clicked");
      }
      cellIndex++; 
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          return; 
        } else{
          cellIndex = 0; 
        }
      } 
    }
  },

  //makes dinging sound
  ding: function(){
  	if($("#trialGrid td").classList == "clicked"){
    $("#trialGrid td.clicked").click(function(){
      ding.play();
    });
	}
  },

    //processes data 
  processData: function() {  
    var dataforRound = experiment.subid + "," + experiment.subage + "," + experiment.generation + "," + experiment.condition + "," + experiment.date + "," + experiment.timestamp + "," + experiment.comment; 
    dataforRound += "," + experiment.trialCount + "," + targetArray + "," + dataArray + "\n"; 
    // use line below for mmturkey version
    //experiment.data.push(dataforRound); 
    $.post("https://callab.uchicago.edu/experiments/iterated-learning/datasave.php", {postresult_string : dataforRound}); 
  }, 

  //stores data in arrays
  storeData: function(input, target, trial){
  	var dataArray= [[0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];

    var targetArray= [[0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];
              
    var rowIndex = 0;
    var cellIndex = 0;
    var i;
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      var targetElement = document.getElementById(target).rows[rowIndex].cells[cellIndex];
      if(gridElement.classList == "clicked"){
        dataArray[rowIndex][cellIndex] = 1;
      }
      if(targetElement.classList == "clicked"){
        targetArray[rowIndex][cellIndex] = 1; 
      }
      cellIndex++; 
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          //return; 
        } else{
          cellIndex = 0; 
        }
      } 
    } 
    console.log(dataArray);
    console.log(targetArray);
    //var dataforRound += "," + experiment.trialCount + "," + targetArray + "," + experiment.dataArray;
    experiment.processData();
  },

  //function that creates input grid for trials
  input: function(){
    //clears data from previous input
    experiment.clear("trialInput"); 
    showSlide("input");
    //creates clickable array 
    if(experiment.trialCount == 1){
      $("#trialInput td").click(function(){
        experiment.max10items(this,'trialInput');
      });
    }
  },

  //displays visual mask for X seconds 
  mask: function(){
    showSlide("mask");
    setTimeout(function(){ experiment.input() }, 1000);
  },

  //displays target slide, stores data, handles counter for trials and ends study when 10 trials have passed 
  begin: function(){
    //prevents scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    }
    var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");

        //stores data
    if(experiment.trialCount != 0){
      experiment.storeData("trialInput", "trialGrid", experiment.trialCount);
    } 
    //increases trial #
    experiment.trialCount++;
    //clears grid
    experiment.clear("trialGrid");

    if(experiment.trialCount ==3){
      showSlide("expIntro");
      $(practiceIntro).html('<center>You have finished the training, and now we are going to begin the study. Just like in the practice, try to remember and recreate the grids to the best of your ability. There will be 10 trials. Good luck! <center>'); 
      return;
    }

    //ends experiment when 10 trials have been completed 
    if(experiment.trialCount == 11){
      experiment.end();
    } else{  
      //shows target slide for X seconds                                                 
      showSlide("trial");                                
      setTimeout(function(){ experiment.mask() }, 5000);
      //displays each individual trial info
      if(experiment.trialCount == 1){
        experiment.fillGrid("trialGrid", train1);
        experiment.ding();
        trialGrid.classList.add("aqua");
        trialInput.classList.add("aqua");
      } if (experiment.trialCount == 2){
          experiment.fillGrid("trialGrid", train2);
          experiment.ding();
          trialGrid.classList.remove("aqua");
          trialInput.classList.remove("aqua");
      }
      if(experiment.trialCount == 3){
      
        experiment.fillGrid("trialGrid", trial1);
        experiment.ding();
        trialGrid.classList.add("purple");
        trialInput.classList.add("purple");
      } if (experiment.trialCount == 4){
          experiment.fillGrid("trialGrid", trial2);
          experiment.ding();
          trialGrid.classList.remove("purple");
          trialInput.classList.remove("purple");
          trialGrid.classList.add("olive");
          trialInput.classList.add("olive");
      } if (experiment.trialCount ==5){
          experiment.fillGrid("trialGrid", trial3);
          experiment.ding();
          trialGrid.classList.add("green");
          trialInput.classList.add("green");
      } if(experiment.trialCount == 6){
          experiment.fillGrid("trialGrid", trial4);
          experiment.ding();
          trialGrid.classList.remove("green");
          trialInput.classList.remove("green");
          trialGrid.classList.add("pink");
          trialInput.classList.add("pink");
      } if(experiment.trialCount == 7){
          experiment.fillGrid("trialGrid", trial5);
          experiment.ding();
          trialGrid.classList.remove("pink");
          trialInput.classList.remove("pink");
          trialGrid.classList.add("blue");
          trialInput.classList.add("blue");
          // IT IS HERE THAT THE EXPERIMENT DINGING BREAKS
      } if(experiment.trialCount == 8){
          experiment.fillGrid("trialGrid", trial6);
          experiment.ding();
          trialGrid.classList.remove("blue");
          trialInput.classList.remove("blue");
          trialGrid.classList.add("orange");
          trialInput.classList.add("orange");
      } if(experiment.trialCount == 9){
          experiment.fillGrid("trialGrid", trial7);
          experiment.ding();
          trialGrid.classList.remove("orange");
          trialInput.classList.remove("orange");
          trialGrid.classList.add("lime");
          trialInput.classList.add("lime");
      } if(experiment.trialCount == 10){
          experiment.fillGrid("trialGrid", trial8);
          experiment.ding();
          trialGrid.classList.remove("lime");
          trialInput.classList.remove("lime");
          trialGrid.classList.add("teal");
          trialInput.classList.add("teal");
      } if(experiment.trialCount ==11){
          experiment.fillGrid("trialGrid", trial9);
          experiment.ding();
          trialGrid.classList.remove("teal");
          trialInput.classList.remove("teal");
          trialGrid.classList.add("navy");
          trialInput.classList.add("navy");
      } if(experiment.trialCount ==12){
          experiment.fillGrid("trialGrid", trial10);
          experiment.ding();
          trialGrid.classList.remove("navy");
          trialInput.classList.remove("navy");
          trialGrid.classList.add("maroon");
          trialInput.classList.add("maroon");
      }
    }
  },
  //function that shows error message/stops from continuing if less than 10 items are selected (prevents too much simplification)
  //together with max10items ensures that the user selects EXACTLY 10 items each trial
  min10Items: function(input){
    var rowIndex = 0;
    var cellIndex = 0;
    var i;
    var count = 0;
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      if(gridElement.className == "clicked"){
        count++;
      }
      cellIndex++;
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          if(count < 10){
            $(error).html('<font color="red"><strong>You must select 10 items before continuing. Please try again<strong></font>');
            return;   
          } else {
            experiment.begin()
          }
        } else{
          cellIndex = 0; 
        } 
      }
    } 
  },

  //checks whether the person matched the two training grids correctly, also checks if there are NOT 10 items selected 
  checkGrid: function(input, target, error, nexttrain){
    var rowIndex= 0;
    var cellIndex= 0;
    var i;
    var count=0;
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
        //if you are at the end of the grid, either move on to the next training session (T2 or T3, or move onto the actual study trials)
        if(rowIndex == 8){
          if(nexttrain === 2){
            experiment.startTrain2();
          } 
          if(nexttrain ===3){
            experiment.startTrain3();
          } if(nexttrain != 2 && nexttrain != 3){
            showSlide("expIntro");      
            $(practiceIntro).html('<center>Now you will try to recreate a grid from memory. A target grid will appear for <strong>10</strong> seconds. Your job is to remember where the colors are located in this grid to the best of your ability. You may also click the colors to hear a sound. Next, an image will appear, and then you will see a blank grid. <strong>Fill in the colors on the blank grid just as they appear on the target grid.</strong> When you are satisfied with your re-creation, click the button to display the next target grid. There will be 2 practice trials before we start the study.<center>'); 
        }} else{
          cellIndex = 0; 
        }
      }
    }
  },

  //checks whether first slide is filled out completely 
  checkInput: function() {
    //subject ID
    if (document.getElementById("subjectID").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a subject ID</font>');
      return;
    }
    //stores info in variable
    experiment.subid = document.getElementById("subjectID").value;

    //age
    if (document.getElementById("age").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a subject age</font>');
      return;
    }
    experiment.subage = parseInt(document.getElementById("age").value);

    //condition
   /* if (document.getElementById("condition").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a condition</font>');
      return;
    }
    experiment.condition = parseInt(document.getElementById("condition").value);

    //generation
    if (document.getElementById("generation").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a generation</font>');
      return;
    }
    experiment.generation = parseInt(document.getElementById("generation").value); */

    //goes to training slide
    experiment.startTrain();
  },

}

// for debugging, jump to training
//experiment.startTrain();
//jump to trials
//showSlide("expIntro");
//showSlide("end");
