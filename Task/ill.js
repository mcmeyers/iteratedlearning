//This is the javascript file for the iterated learning study
//Some of this code was taken from Claire Bergy and Long Ouyang
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

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function clearTimer(display){
  var duration = 0
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}



//EXPERIMENT SETUP 

// Show the instructions slide 
showSlide("intro");

//FOR TURK VERSION
/*if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
    document.getElementById("notAccepted").innerHTML= "Please accept the HIT to Begin!!";
} else {
    $("#startButton").click(function(){
      experiment.startTrain();
    });
} */

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

var trial7 = [[0,0,1,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,1,0,1,0],
              [1,0,0,0,0,0,0,0],
              [0,0,0,0,0,1,1,1],
              [0,0,0,0,0,0,0,0]];

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

var trial10 = [[1,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,1,0,0,1,1,0],
              [0,0,0,0,0,0,0,1],
              [0,1,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,1]];

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

var displayNum= [1, 8, 3, 5, 6, 9];

var ding = document.getElementById("ding");
var end_sd = document.getElementById("end_sd");
var halfway = document.getElementById("halfway");
var training_1_error = document.getElementById("training_1_error");
var training_2 = document.getElementById("training_2");
var trial_1 = document.getElementById("trial_1");
var timeout = document.getElementById("timeout");
var one_left = document.getElementById("one_left");
var errorSound = document.getElementById("errorSound");
var sparkle = document.getElementById("sparkle");

var timer; 

//MAIN EXPERIMENT
var experiment = {

  //things collected and stored from the intro slide
  subid: Math.random(1,100), 
  subage:0,
  generation:1,
  //CHANGE FOR TURK
  condition:"kid_baseline",
  date: getCurrentDate(),
  timestamp: getCurrentTime(), 
  comments: ["NA"],
  data:[],

  //counts what trial you are on 
  trialCount:0,
  trial:0,
  timeUsed:0,


  //FUNCTIONS 
  getRandomDisplay: function() {
   var randomIndex = Math.floor(Math.random()*displayNum.length);
   return displayNum.splice(randomIndex, 1)[0];
  }, 

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
        document.querySelector('#blocksLeft').textContent = 10-count; 
      }    
      cellIndex++;
      if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          return; 
        } else{
          cellIndex = 0;
      } }
      if(count > 10){
        clicked.classList.remove("clicked");
        errorSound.play();
        document.querySelector('#blocksLeft').textContent = 0;
      }
      if(count == 0){
        document.querySelector('#blocksLeft').textContent = 10;
      } }
  },

  //starts training session 1 
  startTrain: function() {
    showSlide("training1");
    experiment.data.push("sub_id, age, generation, condition, date, time, comments, trialCount, trialDisplay, inputTime, target_0_0, target_0_1, target_0_2, target_0_3, target_0_4, target_0_5, target_0_6, target_0_7, target_1_0, target_1_1, target_1_2, target_1_3, target_1_4, target_1_5, target_1_6, target_1_7, target_2_0, target_2_1, target_2_2, target_2_3, target_2_4, target_2_5, target_2_6, target_2_7, target_3_0, target_3_1, target_3_2, target_3_3, target_3_4, target_3_5, target_3_6, target_3_7, target_4_0, target_4_1, target_4_2, target_4_3, target_4_4, target_4_5, target_4_6, target_4_7, target_5_0, target_5_1, target_5_2, target_5_3, target_5_4, target_5_5, target_5_6, target_5_7, target_6_0, target_6_1, target_6_2, target_6_3, target_6_4, target_6_5, target_6_6, target_6_7, target_7_0, target_7_1, target_7_2, target_7_3, target_7_4, target_7_5, target_7_6, target_7_7, input_0_0, input_0_1, input_0_2, input_0_3, input_0_4, input_0_5, input_0_6, input_0_7, input_1_0, input_1_1, input_1_2, input_1_3, input_1_4, input_1_5, input_1_6, input_1_7, input_2_0, input_2_1, input_2_2, input_2_3, input_2_4, input_2_5, input_2_6, input_2_7, input_3_0, input_3_1, input_3_2, input_3_3, input_3_4, input_3_5, input_3_6, input_3_7, input_4_0, input_4_1, input_4_2, input_4_3, input_4_4, input_4_5, input_4_6, input_4_7, input_5_0, input_5_1, input_5_2, input_5_3, input_5_4, input_5_5, input_5_6, input_5_7, input_6_0, input_6_1, input_6_2, input_6_3, input_6_4, input_6_5, input_6_6, input_6_7, input_7_0, input_7_1, input_7_2, input_7_3, input_7_4, input_7_5, input_7_6, input_7_7");
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
    
    experiment.comments = document.getElementById("comment").value.replace(","," "); 
   // console.log(comment);
   if(experiment.comments != ""){
    var dataforRound = experiment.subid + "," + experiment.subage + "," + experiment.generation + "," + experiment.condition + "," + experiment.date + "," + experiment.timestamp + "," + experiment.comments; 
    dataforRound += "," + 14 + "," + experiment.trial + "," + experiment.timeUsed + "," + targetArray + "," + dataArray + "\n"; 
    // use line below for mmturkey version
    //experiment.data.push(dataforRound); 
    $.post("https://callab.uchicago.edu/experiments/iterated-learning/datasave.php", {postresult_string : dataforRound}); 
  }
    // Wait 1 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    //setTimeout(function() { turk.submit(experiment) }, 1000); 
  },

  end: function(){
    showSlide("end");
    end_sd.play();
    setTimeout(function(){experiment.realEnd()}, 15000);
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
    //clearInterval(timer);
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
   $("#trialGrid td").unbind("click");
   $("#trialGrid td.clicked").click(function(){
      ding.play();
    }); 
  },

  //stores data in arrays
  storeData: function(input, target, trialCount){
    if(trialCount != 3){

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


    console.log(experiment.timeUsed);
    
    var dataforRound = experiment.subid + "," + experiment.subage + "," + experiment.generation + "," + experiment.condition + "," + experiment.date + "," + experiment.timestamp + "," + experiment.comments; 
    dataforRound += "," + experiment.trialCount + "," + experiment.trial + "," + experiment.timeUsed + "," + targetArray + "," + dataArray + "\n"; 
    // use line below for mmturkey version
    //experiment.data.push(dataforRound); 
    $.post("https://callab.uchicago.edu/experiments/iterated-learning/datasave.php", {postresult_string : dataforRound}); 
  }
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
      training_2.play();
    }
    var count = 60;
    timer = setInterval(function() {
    $("#count").html(count--);
    experiment.timeUsed = 60-count;
    if(count == 10){
      timeout.play();
    } 
    if(count == -1) {
      experiment.begin(); 
      clearInterval(timer);
      $("#count").html(60);
    }
    }, 1000);
  },

  //displays visual mask for X seconds 
  mask: function(){
    showSlide("mask");
    //CHANGE ME BEFORE PILOT ******
    setTimeout(function(){ experiment.input() }, 2000);
  },

  colorAdd: function(color){
  	var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");
    document.getElementById("blockCount").style.backgroundColor = color;
    trialGrid.classList.add(color);
    trialInput.classList.add(color);
  },

  colorRemove: function(){
  	var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");
    trialGrid.classList.remove("aqua", "purple", "olive", "green", "pink", "blue", "orange", "lime", "teal", "navy", "maroon");
    trialInput.classList.remove("aqua", "purple", "olive", "green", "pink", "blue", "orange", "lime", "teal", "navy", "maroon");
  },

  //displays target slide, stores data, handles counter for trials and ends study when 10 trials have passed 
  begin: function(){

    document.getElementById("button").disabled = false;

    //prevents scrolling
    document.querySelector('#blocksLeft').textContent = 10; 
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
      sparkle.play();
      $(practiceIntro).html('<center>You have finished the training, and now we are going to begin the study. Just like in the practice, try to remember and recreate the grids to the best of your ability. There will be 10 trials. Good luck! <center>');
      return;  
    }

    //ends experiment when 6 trials + 2 trainings have been completed 
    if(experiment.trialCount == 10){
      experiment.end();
    } else{  
      if(experiment.trialCount != 1 && experiment.trialCount != 2){
        experiment.trial = experiment.getRandomDisplay(experiment.displayNum);
        console.log(experiment.trial);
      }
      //shows target slide for X seconds 
      showSlide("trial");  
      //CHANGE ME BEFORE PILOT ******                              
      setTimeout(function(){ experiment.mask() }, 12000);
      if(experiment.trialCount > 3 & experiment.trialCount < 10){
        document.getElementById("progress").style.display = "block";
        $(progressNo).html(10-experiment.trialCount);
      } else{
        document.getElementById("progress").style.display = "none";
      }
      //displays each individual trial info
      if(experiment.trialCount == 1){
        experiment.fillGrid("trialGrid", train1);
        experiment.ding();
        experiment.colorAdd("aqua");
      } if (experiment.trialCount == 2){
          experiment.fillGrid("trialGrid", train2);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("yellow");
          experiment.trial == 0.5
      }
      if(experiment.trial == 1){
        experiment.fillGrid("trialGrid", trial1);
        experiment.ding();
        experiment.colorRemove();
        experiment.colorAdd("purple");
      } if (experiment.trial == 2){
          experiment.fillGrid("trialGrid", trial2);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("olive");
      } if (experiment.trial ==3){
          experiment.fillGrid("trialGrid", trial3);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("green");
      } if(experiment.trial == 4){
          experiment.fillGrid("trialGrid", trial4);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("navy");
      } if(experiment.trial == 5){
          experiment.fillGrid("trialGrid", trial5);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("maroon");
      } if(experiment.trial == 6){
          experiment.fillGrid("trialGrid", trial6);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("orange");
      } if(experiment.trial == 7){
          experiment.fillGrid("trialGrid", trial7);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("lime");
      } if(experiment.trial== 8){
          experiment.fillGrid("trialGrid", trial8);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("teal");
      } if(experiment.trial==9){
          experiment.fillGrid("trialGrid", trial9);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("pink");
      } if(experiment.trial ==10){
          experiment.fillGrid("trialGrid", trial10);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("blue");
      }
    }
  },
  keepGoing: function(){
    clearInterval(timer);
    $("#count").html(60);
    experiment.begin();
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
            errorSound.play();
            $(error).html('<font color="red"><strong>You must select 10 items before continuing. Please try again<strong></font>');
            return;   
          } else{
            experiment.playSound();
            return;
        }} else{
          cellIndex = 0; 
        } 
      }
    } 
  },

  playSound: function(){
    if(experiment.trialCount == 5){
        trial_1.play();
        clearInterval(timer);
        document.getElementById("button").disabled = true;
        setTimeout(function() { experiment.keepGoing(); }, 3500); 
        return;
    } if(experiment.trialCount == 6){
        halfway.play();
        clearInterval(timer);
        document.getElementById("button").disabled = true;
        setTimeout(function() { experiment.keepGoing(); }, 3500); 
        return;
    } if(experiment.trialCount == 8){
        one_left.play();
        clearInterval(timer);
        document.getElementById("button").disabled = true;
        setTimeout(function() { experiment.keepGoing(); }, 2500); 
        return;
    } if(experiment.trialCount != 5 & experiment.trialCount != 6 & experiment.trialCount !=8){
      experiment.keepGoing(); 
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
          training_1_error.play();
          $(error).html('<font color="red"><strong>The two grids should be the same. Please try again<strong></font>');
          return;
        }
      //if the target cell is NOT clicked
      } else {
        //and the input cell IS clicked [WRONG]
        if(inputElement.className =='clicked'){
          //display error message
          training_1_error.play();
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
            sparkle.play();
            experiment.startTrain2();
          } 
          if(nexttrain ===3){
            sparkle.play();
            experiment.startTrain3();
          } if(nexttrain != 2 && nexttrain != 3){
            showSlide("expIntro"); 
            sparkle.play();     
            $(practiceIntro).html('<center>Now you will try to recreate a grid from memory. A target grid will appear for <strong>12</strong> seconds. Your job is to remember where the colors are located in this grid to the best of your ability. You may also click the colors to hear a sound. Next, an image will appear, and then you will see a blank grid. <strong>Fill in the colors on the blank grid just as they appeared on the target grid.</strong> When you are satisfied with your re-creation, click the button to display the next target grid. There will be 2 practice trials before we start the study.<center>'); 
        }} else{
          cellIndex = 0; 
        }
      }
    }
  },

  sparkle: function(){
    sparkle.play();
  },

  //checks whether first slide is filled out completely 
  checkInput: function() {
    //subject ID
    if (document.getElementById("subjectID").value.length < 1) {
      $("#checkMessage").html('<font color="red">You must input a subject ID</font>');
      errorSound.play();
      return;
    }
    //stores info in variable
    experiment.subid = document.getElementById("subjectID").value;

    //age
    if (document.getElementById("age").value.length < 1) {
      errorSound.play();
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
//ju1mp to trials
//showSlide("expIntro");
//experiment.end();
//experiment.trialCount = 3;

//experiment.begin();


