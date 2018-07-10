//This is the javascript file for the iterated learning study
//A lot of this code was taken from Claire Bergy and Long Ouyang
//Madeline Meyers Iterated Learning Study


// GENERAL FUNCTIONS 

// Shows slides
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}


//** BROKEN ** makes limit of highlighted cells 10 
function max10items(input){
  var rowIndex = 0;
  var cellIndex = 0;
  var i;
  var count; 
  for(i=0; i<64; i++){
    var inputElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
    cellIndex++;
    if(inputElement.className == 'clicked'){
      count++;
    }
    if(cellIndex == 8) {
      rowIndex++;
      cellIndex = 0;
      }
  }
  console.log(count);
  if(count >= 10){
  $(this).removeClass('clicked'); 
  }
}

//**BROKEN** creates tables
function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < 8; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 8; j++){
            if(i == 8 && j == 7){
                break;
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("hi"));
                td.style.border = '1px solid black';
            }
        }
    }
    body.appendChild(tbl);
    tbl.addClass("grid");
}

//gets current date
getCurrentDate = function() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  return (month + "/" + day + "/" + year);
}


//EXPERIMENT SETUP 

// Show the instructions slide 
showSlide("intro");

//creates initial seed arrays [r1, c1, r2, c2, r3, c3, r4, c4, r5, c5, r6, c6, r7, c7, r8, c8, r9, c9, r10, c10]
var trial1 = [5,4,0,0,3,5,0,1,4,0,0,3,4,5,6,6,1,3,2,3];
var trial2 = [5,2,4,2,5,1,3,0,7,4,1,5,5,2,3,4,4,1,7,5];
var trial3 = [6,4,0,0,6,3,3,5,7,2,1,2,6,7,4,3,1,6,3,3];
var trial4 = [7,4,5,7,1,7,0,1,3,4,4,7,1,3,7,5,0,6,7,2];
var trial5 = [4,5,2,7,1,3,0,0,0,2,4,1,6,3,4,4,7,6,2,2];
var trial6 = [7,3,3,2,5,2,3,1,2,5,6,4,1,4,3,3,7,2,2,0];
var trial7 = [4,4,5,4,7,3,7,4,4,7,7,5,0,0,3,7,4,5,1,6];
var trial8 = [3,3,1,1,0,7,5,3,6,6,0,2,6,4,4,3,7,5,7,4];
var trial9 = [0,0,3,5,4,5,1,0,1,6,0,6,2,7,1,3,3,0,4,6];
var trial10 = [4,1,4,2,1,5,2,5,1,4,2,4,6,2,4,4,5,2,0,1];

//creates counter for what trial you are on
var trialCount = 0; 


//MAIN EXPERIMENT
var experiment = {
  //Parameters for this sequence

  //things collected and stored from the intro slide
  subid:"",
  subage:0,
  generation:0,
  condition:0,
  date: getCurrentDate(),

  // An array to store the data that we're collecting during trials. Stores by seed (for now)
  dataTrial1: [],
  dataTrial2: [],
  dataTrial3: [],
  dataTrial4: [],
  dataTrial5: [],
  dataTrial6: [],
  dataTrial7: [],
  dataTrial8: [],
  dataTrial9: [],
  dataTrial10: [],


  //FUNCTIONS 

  //starts training session 1 
  startTrain: function() {
    // Show the next slide.
    showSlide("training1");
    $("#t1Input td").bind("click", function(){
    // change style here
      $(this).toggleClass("clicked");
    });
    //** BROKEN **  
    //max10items('t1Input');
  },

  //start training session 2 
  startTrain2: function(){
    showSlide("training2");
    $("#t2Input td").bind("click", function(){
      $(this).toggleClass("clicked");
    });
  },

  //start training session 3
  startTrain3: function(){
    showSlide("training3");
    $("#t3Input td").bind("click", function(){
      $(this).toggleClass("clicked");
    });
  },
  
  //** ALTER TO STORE AND SUBMIT DATA ** ending function 
  end: function(){
    showSlide("end");
    // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    //setTimeout(function() { turk.submit(experiment) }, 1500);
  },

  //function that fills the target grid with array coordinates 
 fillGrid: function(r1, c1, r2, c2, r3, c3, r4, c4, r5, c5, r6, c6, r7, c7, r8, c8, r9, c9, r10, c10){
  document.getElementById("trialGrid").rows[r1].cells[c1].classList.add("clicked");
  document.getElementById("trialGrid").rows[r2].cells[c2].classList.add("clicked");
  document.getElementById("trialGrid").rows[r3].cells[c3].classList.add("clicked");
  document.getElementById("trialGrid").rows[r4].cells[c4].classList.add("clicked");
  document.getElementById("trialGrid").rows[r5].cells[c5].classList.add("clicked");
  document.getElementById("trialGrid").rows[r6].cells[c6].classList.add("clicked");
  document.getElementById("trialGrid").rows[r7].cells[c7].classList.add("clicked");
  document.getElementById("trialGrid").rows[r8].cells[c8].classList.add("clicked");
  document.getElementById("trialGrid").rows[r9].cells[c9].classList.add("clicked");
  document.getElementById("trialGrid").rows[r10].cells[c10].classList.add("clicked");
  },

  //function to clear input grid AND TARGET GRID before each trial 
  clear: function(grid){ 
    console.log("running");
    var i; 
    var rowIndex = 0; 
    var cellIndex = 0; 
    for(i=0; i<64; i++){
    var gridElement = document.getElementById(grid).rows[rowIndex].cells[cellIndex];
    if (gridElement.classList == "clicked"){
      gridElement.classList.toggle("clicked");
    }
    cellIndex++; 
    if(cellIndex == 8) {
        rowIndex++;
        if(rowIndex == 8){
          return; 
        } else{
          cellIndex = 0; //otherwise move onto next row in the grid (not at end of grid)
        }
    } 
    }
  },

  //** NEED TO ADD STORING OF CHOSEN COORDINATES IN AN ARRAY ** function that creates input grid for trials
  input: function(){
    //displays the trial number that you are on [should store it somewhere? corresponds to what array the data should be stored in]
    console.log(trialCount);
    experiment.clear("trialInput"); 
    showSlide("input");
    //creates clickable array 
    if(trialCount == 1){
      $("#trialInput td").bind("click", function(){
        $(this).toggleClass("clicked");
      });
    }
  },

  //displays visual mask for X seconds 
  mask: function(){
    showSlide("mask");
    setTimeout(function(){ experiment.input() }, 1000);
  },

  //displays target slide, handles counter for trials and ends study when 10 trials have passed 
  begin: function(){
    //increases trial #
    trialCount++;
    experiment.clear("trialGrid");
    //ends experiment when 10 trials have been completed 
    if(trialCount == 11){
      experiment.end();
    } else{                                                   //experiment not completed
      showSlide("trial");                                     //show target slide
      setTimeout(function(){ experiment.mask() }, 5000);
      //**TRY TO GET THIS IN SOME BETTER WAY? like stored in an array** trial 1
      if(trialCount == 1){
        experiment.fillGrid(5,4,0,0,3,5,0,1,4,0,0,3,4,5,6,6,1,3,2,3);
      } if (trialCount == 2){
        experiment.fillGrid(5,2,4,2,5,1,3,0,7,4,1,5,0,6,3,4,4,1,7,5);
      } if (trialCount ==3){
        experiment.fillGrid(6,4,0,0,6,3,3,5,7,2,1,2,6,7,4,3,1,6,3,3);
      } if(trialCount == 4){
        experiment.fillGrid(7,4,5,7,1,7,0,1,3,4,4,7,1,3,7,5,0,6,7,2);
      } if(trialCount == 5){
        experiment.fillGrid(4,5,2,7,1,3,0,0,0,2,4,1,6,3,4,4,7,6,2,2);
      } if(trialCount == 6){
        experiment.fillGrid(7,3,3,2,5,2,3,1,2,5,6,4,1,4,3,3,7,2,2,0);
      } if(trialCount == 7){
        experiment.fillGrid(4,4,5,4,7,3,7,4,4,7,7,5,0,0,3,7,4,5,1,6);
      } if(trialCount == 8){
        experiment.fillGrid(3,3,1,1,0,7,5,3,6,6,0,2,6,4,4,3,7,5,7,4);
      } if(trialCount ==9){
        experiment.fillGrid(0,0,3,5,4,5,1,0,1,6,0,6,2,7,1,3,3,0,4,6);
      } if(trialCount ==10){
        experiment.fillGrid(4,1,4,2,1,5,2,5,1,4,2,4,6,2,4,4,5,2,0,1);
      }
    } 
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
        //if you are at the end of the grid, either move on to the next training session (T2 or T3, or move onto the actual study trials)
        if(rowIndex == 8){
          if(nexttrain === 2){
            experiment.startTrain2();
          } 
          if(nexttrain ===3){
            experiment.startTrain3();
          } if(nexttrain != 2 && nexttrain != 3){
            showSlide("expIntro");
        }} else{
          cellIndex = 0; //otherwise move onto next row in the grid (not at end of grid)
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

    //goes to training slide
    experiment.startTrain();
  }
}

// for debugging, jump to training
//experiment.startTrain()
//jump to trials
showSlide("expIntro");

