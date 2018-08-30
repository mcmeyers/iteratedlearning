//This is the javascript file for the iterated learning study
//Some of this code was taken from Claire Bergy and Long Ouyang
//Madeline Meyers Iterated Learning Study

// GENERAL FUNCTIONS 

// Shows slides
function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

var participants = "";

//function that makes it so you only read in adult data if you are running kids, or only read in kid data if you are running adults. turns off for turk condition where you read in next available row
function runParticipants(people) {
  if(people == "turk"){ //if running study on Mturk, want to read in data normally and take next available row 
    //also want to change so here in the child coniditon you don't see the input slide, only in other condition
    experiment.subage = "turk";
    participants = "turk"; 
  }
  //if you are NOT running the mturk condition
    if(people == "child"){
      participants = "child";
    } if(people == "adult"){
      experiment.subage = "adult"; //otherwise would input in the child condition
      participants = "adult";
    }
    //want to only take in available row based on the condition you are in -- in child condition, only take in available adult rows; in adult condition, only take in available child rows
  experiment.uniqueTurker(); 
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

//function to start timer 
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

//function to reset timer
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


//generates a random id for subject
function randId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


var unique_id = 0;  
var ip = 0; 
//gets IP address of user (temporary ID so when mturk page refreshes it doesn't mess everything up)
function getIP(){
  tmp = $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
      });
  tmp.done(function(data){
    ip = data.ip; 

    if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") { //if person has not accepted HIT
      document.getElementById("notAccepted").innerHTML= "Please accept the HIT to Begin!!";
      experiment.reserveDate(ip, ip); //if assignment has not been accepted, unique_id = ip address and ip = ip address
    } else { //if person has accepted HIT
      unique_id = randId(); 
      experiment.reserveDate(unique_id, ip); //if assignment has been accepted, unique_id = rand int and ip = ip address
    } 
  });
}

//creates initial seed grids; just in case although these should be read in from the Google Sheet 

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

var trainInput1 = [[1,1,0,0,0,0,0,0],
              [0,0,1,1,0,0,0,0],
              [1,1,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,1]];

var trainInput2 = [[0,0,0,0,0,0,0,1],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,1,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,1,0,0,0,0,0,0],
              [1,1,1,0,0,0,0,0]];

var trial1 = [[1,1,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,1,0,0],
              [1,0,0,0,0,1,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0]];

var trial2 = [[1,0,0,0,0,0,0,0],
              [0,0,1,0,0,0,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,1,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,1,0,0,1],
              [0,0,1,0,0,0,0,0]];

var trial3 = [[1,0,1,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,1,0,0,0,0,1],
              [0,0,0,0,0,0,0,0],
              [0,1,0,0,1,1,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,0,1,0]];

var trial4 = [[0,0,0,0,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [1,0,0,0,0,1,0,0],
              [0,1,1,1,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,1,0,0,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,1,1,0,0,0,0]];

var trial5 = [[0,0,1,0,0,0,0,1],
              [0,1,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,1,0,1,0],
              [0,0,0,0,1,1,0,0]];

var trial6 = [[1,0,0,0,0,0,1,0],
              [1,0,0,1,0,0,1,0],
              [0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,0,0],
              [0,0,0,0,0,1,1,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0]];

//for storing data
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

//for random order of trials
var displayNum= [1, 2, 3, 4, 5, 6]; 
var targetNames = [trial1, trial2, trial3, trial4, trial5, trial6]; //TARGETS
var inputNames = [trial1, trial2, trial3, trial4, trial5, trial6]; //FIXABLE, GOES INSTEAD OF BLANK INPUT GRID FOR PARENTS

//inputs sounds 
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

//initializes timer variable
var timer; 

//MAIN EXPERIMENT
var experiment = {

  ////////VARIABLES

  //bkgd
  subid: Math.random(1,100), 
  unique_id: randId(),
  subage:0,
  generation:1,
  date: getCurrentDate(),
  timestamp: getCurrentTime(), 
  seed:1,
  available_onload:1,
  available_accepted:1,
  timedOut: 0,
  training_accuracy:1,
  training_1_accuracy:1,
  training_2_accuracy:1, 
  more_than_10: 0, 

  //IMPORTANT defaults to adult because otherwise input makes it == child 
  condition:"adult",

  //storing data 
  dataforRound:" ",
  data:[],

  //initializes other useful variables
  trialCount:0, //# of trials completed
  trial:0, //actual trial sequence that is displayed
  timeUsed:0, //time used from timer

  ////////FUNCTIONS 
  uniqueTurker: function(){
    var ut_id = "53ae4ea04173428d22d2c34c58eca39a";
   /* if (UTWorkerLimitReached(ut_id)) {
      console.log("not unique");
        document.getElementsByTagName('body')[0].innerHTML = "You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.";
    } else { */
      getIP(); 
      console.log("unique");
   // }
  },

  reserveDate: function(unique_id, ip) {
    console.log(unique_id); 
    console.log(ip);
   // console.log(experiment.unique_id);
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzBAzXejWWLpkhKrzloWEKyCK8KfN51M5Deu3uoFJxm-vnk2A/exec",
      type: "get", 
      dataType: "json",
      data: {type: "reserve", unique_id: unique_id, ip: ip, participants: participants} //CHANGE ME FOR KIDDOS 
    }); 

    request.done(function (data){
      // log a message to the console
      experiment.data = data; 
      //IF THERE IS AN AVAILABLE ROW WHERE GENERATION IS NOT MAXED OUT 
      console.log(data);

      if(experiment.data[7]=="initial"){
        if(participants == "child"){ //if its a human child
          showSlide("intro_child");
        } if(participants == "turk"){ //if its a fake child who is actually a turker
          showSlide("intro_adult");
        }
        experiment.condition = "child";
      } if(experiment.data[7]=="child"){
        showSlide("intro_adult");
        experiment.condition = "adult"
      } if(experiment.data[7]=="adult"){
        if(participants == "child"){
          showSlide("intro_child");zen
        } if(participants == "turk"){
          showSlide("intro_adult");
        }
        experiment.condition = "child"
      }
      //IF THERE ARE NO AVAILABLE ROWS--ERROR MESSAGE 
      if(data == 0){ 
        console.log("there was no available data at all, spitting out an error message");
        showSlide("limbo");
      }
    });
  }, 

  //reads in data from Google Sheet 
  loadIteratedData: function(){
    console.log("running");
  //makes request to sheet
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzBAzXejWWLpkhKrzloWEKyCK8KfN51M5Deu3uoFJxm-vnk2A/exec",
      type: "get", 
      dataType: "json",
      data: {type: experiment.parent_id, unique_id: unique_id}, 
    }); 
    request.done(function (data){
      // log a message to the console
      experiment.data = data; 
      //IF THERE IS AN AVAILABLE ROW WHERE GENERATION IS NOT MAXED OUT 
      if(experiment.data != 0 & experiment.data[5] != 6 ){ 
        experiment.seed = experiment.data[6];
        console.log("there was data available!");
        console.log(data);
        experiment.parent_id = data[0];

        if(experiment.data[7]=="initial"){ //the first generation target seed (only called once per chain), goes to child
          experiment.changeTargets(); //read in targets that were previous inputs
          experiment.generation = experiment.data[5]+1;
        } if(experiment.data[7]=="child"){ //if the previous row was a child, currently adult who has to fix child grids
          experiment.generation = experiment.data[5]; 
          experiment.loadTargetInputs();
          experiment.loadFixInputs();
        } if(experiment.data[7]=="adult"){ //previously was adult who fixed child's inputs, now is a new child who takes adult inputs as targets
          experiment.generation = experiment.data[5]+1;
          experiment.changeTargets(); //read in targets that were previous inputs 
        }
      } 
      //IF THERE ARE NO AVAILABLE ROWS--ERROR MESSAGE 
      if(experiment.data == 0){ 
        console.log("there was no available data at all, spitting out an error message");
        showSlide("limbo");
      }
    }); 
    experiment.startTrain();
  },

  //function to create grid from string
  createGrid: function(data) {
    var oneRow = [];
    var newArray = [];
    array = data.split(" ");
    for(var i=0; i<array.length;i++) array[i] = +array[i]; 
    for (i=0; i<8; i++){
      oneRow = array.slice(8*i, (8*i+8));
      newArray.push(oneRow); 
    }
    return(newArray);  
  },

  //function to load in target displays for parent condition (PREVIOUS CHILD'S TARGETS)
  loadTargetInputs: function(){
    for(i=0; i<6; i++){
      if(experiment.data[21] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[23]);
        break; 
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[26] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[28]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[31] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[33]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[36] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[38]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[41] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[43]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[46] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[48]);
        break;
      }
    };
    return targetNames;
  },

  //function to load in input displays for parent condition, where parents will have to correct what the child did 
  //NOTE TO SELF ALSO NEED TO CHANGE PARENT TARGET STORING DATA BECAUSE WHAT PARENT SEES AS TARGET IS WHAT CHILD SAW AS TARGET, AND INSTEAD OF INPUT PARENT SEES WHAT CHILD HAD MADE AS INPUT, AFTER PARENT EDITS THIS BECOMES NEXT CHILD'S TARGET; WANT TO SAVE CHILD'S CREATION = TARGET (EVEN THOUGH WAS NOT DISPLAYED ON TARGET GRID) AND PARENT INPUT (EDITS PARENT MADE TO CHILD'S PREVIOUS TARGET)
  loadFixInputs: function(){
    for(i=0; i<6; i++){
      if(experiment.data[21] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[24]);
        break; 
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[26] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[29]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[31] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[34]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[36] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[39]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[41] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[44]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[46] == i+1){
        inputNames[i] = experiment.createGrid(experiment.data[49]);
        break;
      }
    };
    return inputNames;
  },

  //takes in data read from Google Sheet and creates correct target grids from it; SHOULD WORK FOR CHILD CONDITIONS FINE  
  changeTargets: function(){
    for(i=0; i<6; i++){
      if(experiment.data[21] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[24]);
        break; 
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[26] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[29]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[31] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[34]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[36] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[39]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[41] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[44]);
        break;
      }
    };
    for(i=0; i<6; i++){
      if(experiment.data[46] == i+1){
        targetNames[i] = experiment.createGrid(experiment.data[49]);
        break;
      }
    };
    return targetNames; 
  },

  //function that gives us a random display number 
  getRandomDisplay: function() {
   var randomIndex = Math.floor(Math.random()*displayNum.length);
   return displayNum.splice(randomIndex, 1)[0];
  }, 

  //makes limit of highlighted cells 10; highlights clicked cells; displays correct values in block counter  
  max10items: function(clicked,input){
    var i; 
    var rowIndex = 0; 
    var cellIndex = 0; 
    var count = 0;
    if(count == 0){
      if(experiment.condition == "child"){
        document.querySelector('#blocksLeft').textContent = 10; 
      }if(experiment.condition == "adult"){
        document.querySelector('#blocksLeft').textContent = 0; 
      }
    }
    //highlighs clicked cell
    $(clicked).toggleClass("clicked");
    //checks through grid to count how many cells are selected, disables selecting if there are 10 selected already
    for(i=0; i<64; i++){
      var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      if (gridElement.className == "clicked"){
        count++;
        if(count <= 10 ){
        document.querySelector('#blocksLeft').textContent = 10-count; 
        document.getElementById("button").disabled = false; 
        document.getElementById("training_button").disabled = false; 
        }if (count > 10) {
        if(experiment.condition == "child"){
          clicked.classList.remove("clicked");
          errorSound.play();
          document.querySelector('#blocksLeft').textContent = 0;
        }if(experiment.condition == "adult"){
          document.querySelector('#blocksLeft').textContent = 10-count; 
        } 
        }
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
      if(count == 0){
        document.querySelector('#blocksLeft').textContent = 10; 
      }
    }
    
  },

  //starts training session 1 
  startTrain: function() {
    console.log(experiment.condition);
    if(experiment.condition == "child"){
      showSlide("training1_child");
      console.log("showing child training");
    } if(experiment.condition == "adult"){
      showSlide("training1_adult");
      console.log("showing adult training");
    }
    //puts in headers for Turk data file 
    experiment.data.push("unique_id, parent_id, sub_id, age, generation, seed, condition, date, time, trial1Count, trial1Display, input1Time, trial1Target, trial1Data, trial2Count, trial2Display, input2Time, trial2Target, trial2Data, trial4Count, trial4Display, input4Time, trial4Target, trial4Data,trial5Count, trial5Display, input5Time, trial5Target, trial5Data,trial6Count, trial6Display, input6Time, trial6Target, trial6Data,trial7Count, trial7Display, input7Time, trial7Target, trial7Data, trial8Count, trial8Display, input8Time, trial8Target, trial8Data,trial9Count, trial9Display, input9Time, trial9Target, trial9Data,available_onload, available_accepted");
    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    };
    //makes ding sound on click
    $("#t1Target td.clicked").click(function(){
      ding.play();
    });
    $("#t1Target_adult td.clicked").click(function(){
      ding.play();
    });
    //highlights clicked cells, enables max 10 items
    $("#t1Input td").click(function(){
      experiment.max10items(this,'t1Input');
    });
    $("#t1Input_adult td").click(function(){
      experiment.max10items(this,'t1Input_adult');
    });
  },

  //writes data to Google Sheet using ajax POST function
  submit: function(){
  console.log(experiment.training_1_accuracy);
  console.log(experiment.training_2_accuracy);
  experiment.training_accuracy = (experiment.training_1_accuracy + experiment.training_2_accuracy) / 2;
  console.log(experiment.training_accuracy);
  //make maxed out generations or people who timed out unavailable
  if(experiment.timedOut == 1 || experiment.generation == 6 || experiment.training_accuracy < 0.75 || experiment.more_than_10 != 0){
    experiment.available_onload = 0;
    experiment.available_accepted = 0; 
  }
  //display whether data has been sent or not
    $("#result").html('Sending data...');
  
  //concatenates all important info into correct format to be posted 
    var allData = "unique_id="+experiment.unique_id + "&" + "parent_id="+experiment.parent_id + "&" + "sub_id="+experiment.subid + "&" + "sub_age="+experiment.subage + "&" + "generation="+experiment.generation + "&" + "seed="+ experiment.seed + "&" + "condition="+experiment.condition + "&" + "date="+experiment.date + "&" + "time="+experiment.timestamp + "&";
    allData += experiment.dataforRound+"&"+"available_onload="+experiment.available_onload+"&"+"available_accepted="+experiment.available_accepted+"&"+"timedOut="+experiment.timedOut+"&"+"training_accuracy="+experiment.training_accuracy+"&"+"more_than_10="+experiment.more_than_10+"\n";
    console.log(experiment.timedOut);
  //ajax post request
    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzBAzXejWWLpkhKrzloWEKyCK8KfN51M5Deu3uoFJxm-vnk2A/exec",
      type: "post", 
      data: allData
    });  

    request.done(function (response, textStatus, jqXHR){
      // log a message to the console
      $("#result").html('Data has been submitted!');
      //submit data to mTurk (just in case something bad happens and the google sheet doesnt work, good to have 2 copies)
      setTimeout(function(){turk.submit(experiment)}, 1000);
    });
  },

  //calls when experiment is finished; shows ending slide and submits data
  end: function(){
    showSlide("end");
    end_sd.play();
    experiment.submit(); 
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
   $("#trialGrid td").unbind("click");
   $("#trialGrid td.clicked").click(function(){
      ding.play();
    }); 
  },

  //stores data in arrays FIX MEEEEEEEE SO JUST STORES ONE AT A TIME SO THIS IS MORE VERSATILE 
  storeData: function(input, target, trialCount){ 
    //trialcount 3 was used to display some instructions so we want to skip that 
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
      var count;
      for(i=0; i<64; i++){
        var gridElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
        var targetElement = document.getElementById(target).rows[rowIndex].cells[cellIndex];
        if(gridElement.classList == "clicked"){
          dataArray[rowIndex][cellIndex] = 1;
          count++;
        }
        if(targetElement.classList == "clicked"){
          targetArray[rowIndex][cellIndex] = 1; 
        }
        cellIndex++; 
        if(cellIndex == 8) {
          rowIndex++;
        if(rowIndex == 8){
        } else{
          cellIndex = 0; 
        }
        } 
      } 
    //gets arrays in string format of ("1 0 1 0 1 1 0 0 0 0 0"), necessary for posting to google sheet
      if(count > 10){
        experiment.more_than_10 = 1; 
      }
      targetArray = [].concat.apply([], targetArray);
      dataArray = [].concat.apply([], dataArray);
      targetArray = targetArray.join(" ");
      dataArray = dataArray.join(" ");

      var trialCount = experiment.trialCount.toString(); 

    //if experiment is not over, keep adding data to one big long string which can then be called (the data string) in submit function; in correct format for posting to google sheet
      if(experiment.trialCount < 10){
        experiment.dataforRound += "&" + "trial"+trialCount+"Count="+experiment.trialCount + "&" + "trial"+trialCount+"Display="+experiment.trial + "&" + "time"+trialCount+"Used="+experiment.timeUsed + "&" + "target"+trialCount+"Array="+targetArray + "&" + "data"+trialCount+"Array="+dataArray + "\n"; 
      }
 
    //RN, also have the data send round by round FOR TURK EXPERIMENTS just in case this google sheets stuff glitches during the study 
      var dataforServer= experiment.subid + "," + experiment.subage + "," + experiment.generation + "," + experiment.seed + "," + experiment.condition + "," + experiment.date + "," + experiment.timestamp + ","; 
      dataforServer += experiment.trialCount + "," + experiment.trial + "," + experiment.timeUsed + "," + targetArray + "," + dataArray + "\n"; 

    //use line below for writing to server; shouldnt need anymore unless want extra security in child conditions
    //$.post("https://callab.uchicago.edu/experiments/iterated-learning/datasave.php", {postresult_string : dataforServer}); 

    //use line below for writing backup to mturk
      experiment.data.push(dataforServer);
    }
  },

  //function that creates input grid for trials; sets up timer
  input: function(){
    showSlide("input");
    //creates clickable array 
    if(experiment.trialCount == 1){
      $("#trialInput td").click(function(){
        experiment.max10items(this,'trialInput');
      });
      training_2.play();
    }
    //sets up timer
    var count = 60;
    timer = setInterval(function() {
    $("#count").html(count--);
    experiment.timeUsed = 60-count;
    if(count == 10){
      timeout.play();
    } 
    if(count == -1) {
      experiment.timedOut = 1; 
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
    setTimeout(function(){ experiment.input() }, 3000);
  },

  //adds specific color for each trial
  colorAdd: function(color){
    var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");
    document.getElementById("blockCount").style.backgroundColor = color;
    trialGrid.classList.add(color);
    trialInput.classList.add(color);
  },

  //removes color (similar to clear function)
  colorRemove: function(){
    var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");
    trialGrid.classList.remove("aqua", "purple", "olive", "green", "pink", "blue", "orange", "lime", "teal", "navy", "maroon");
    trialInput.classList.remove("aqua", "purple", "olive", "green", "pink", "blue", "orange", "lime", "teal", "navy", "maroon");
  },

  //displays target slide, stores data, handles counter for trials and ends study when 10 trials have passed 
  begin: function(){
    document.getElementById("button").disabled = false;
    if(experiment.condition == "adult"){
      document.querySelector('#blocksLeft').textContent = 0;
    } if(experiment.condition == "child"){
    document.querySelector('#blocksLeft').textContent = 10;
  }

    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    }

    var trialGrid = document.getElementById("trialGrid");
    var trialInput = document.getElementById("trialInput");
    if(experiment.trialCount == 2){
      experiment.trial = 0.5; 
    }
    //stores data by trial
    if(experiment.trialCount != 0){
      if(experiment.trialCount ==1 | experiment.trialCount == 2){
        console.log("running");
        experiment.checkGrid('trialInput', 'trialGrid');
      }
      if(experiment.condition == "child"){
      experiment.storeData("trialInput", "trialGrid", experiment.trialCount);
      } if(experiment.condition == "adult"){
        experiment.storeData("trialInput", "trialGrid", experiment.trialCount); //FIX MEEEEEEEE NOT RIGHT STORING THINGS 
      }

    } 
    //increases trial #
    experiment.trialCount++;
    //clears grids
    experiment.clear("trialGrid");
    experiment.clear("trialInput");

    //trial 3 used for instructions; want to display those and skip this slide 
    if(experiment.trialCount ==3){
      showSlide("expIntro");
      sparkle.play();
      if(experiment.condition == "child"){
        $(adultIntro).html('');
      $(childIntro).html('<p class = "block-text">You have finished the training, and now we are going to begin the study.</p><p class = "block-text"> Just like in the practice, try to remember and recreate the grids to the best of your ability. </p><p class = "block-text">There will be 6 trials. </p>');
      } if(experiment.condition == "adult"){
        $(childIntro).html('');
        $(adultIntro).html('<p class = "block-text">You have finished the training, and now we are going to begin the study.</p><p class = "block-text"> Just like in the practice, try to remember the target grid and fix the one you see displayed. There will be 6 trials. </p>');
      }
      return;  
    }

    //ends experiment when 6 trials + 2 trainings + trial 3 weirdness = 9 completed, so when gets called a 10th time 
    if(experiment.trialCount == 10){
      experiment.end();
    } else {  //if experiment is not done
      if(experiment.trialCount != 1 && experiment.trialCount != 2){ //if we are not in the trial rounds, which have pre-specified grids in pre-specified order
        experiment.trial = experiment.getRandomDisplay(experiment.displayNum); //get our random display
      }
      //shows target slide for X seconds 
      showSlide("trial");  
      //CHANGE ME BEFORE PILOT ******                              
      setTimeout(function(){ experiment.mask() }, 10000);

      if(experiment.trialCount > 3 & experiment.trialCount < 10){ //if in the study trials, not training
        //displays how many trials you have left before being done
        document.getElementById("progress").style.display = "block"; 
        $(progressNo).html(10-experiment.trialCount);
      } else{ //if in training trials
        document.getElementById("progress").style.display = "none";
      }

      //displays each individual trial info; gets called if the random display chooses that number
      //training trials 
      if(experiment.trialCount == 1){ 
        experiment.fillGrid("trialGrid", train1);
        experiment.ding();
        experiment.colorAdd("aqua");
        if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", trainInput1);
        }
      } if(experiment.trialCount == 2){ 
          experiment.fillGrid("trialGrid", train2);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("yellow");
          experiment.trial == 0.5
        if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", trainInput2);
        }
      }
      //study trials
      if(experiment.trial == 1){
        experiment.fillGrid("trialGrid", targetNames[0]);
        experiment.ding();
        experiment.colorRemove();
        experiment.colorAdd("purple");
        if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[0]);
        }
      } if(experiment.trial ==2){
          experiment.fillGrid("trialGrid", targetNames[1]);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("green");
          if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[1]);
        }
      } if(experiment.trial == 3){
          experiment.fillGrid("trialGrid", targetNames[2]);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("maroon");
          if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[2]);
        }
      } if(experiment.trial == 4){
          experiment.fillGrid("trialGrid", targetNames[3]);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("orange");
                  if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[3]);
        }
      } if(experiment.trial== 5){
          experiment.fillGrid("trialGrid", targetNames[4]);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("teal");
                  if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[4]);
        }
      } if(experiment.trial==6){
          experiment.fillGrid("trialGrid", targetNames[5]);
          experiment.ding();
          experiment.colorRemove();
          experiment.colorAdd("blue");
                  if(experiment.condition == "adult"){
          experiment.fillGrid("trialInput", inputNames[5]);
        }
        } 
    }
  },

  //resets timer & calls function to begin again after each trial
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
          } if(count > 10) {
            errorSound.play();
            $(error).html('<font color="red"><strong>You may only select a maximum of 10 items at a time. Please try again<strong></font>');
            return; 
          } if(count==10){
            experiment.playSound();
            return;
          } 
          } else {
          cellIndex = 0; 
        } 
      }
    } 
  },

  //called on "ready for next trial" click; plays sounds if applicable before moving onto next trial
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

  //for very first training trial only; makes it so you cannot move on unless grids are exactly the same; so this checks the grids for accuracy 
  checkGrid: function(input, target, error){
    console.log("running2");
    var rowIndex= 0;
    var cellIndex= 0;
    var i;
    var count=0;
    var accuracy=0; 
    for(i=0; i<64; i++) {
      var inputElement = document.getElementById(input).rows[rowIndex].cells[cellIndex];
      var targetElement = document.getElementById(target).rows[rowIndex].cells[cellIndex];
     //checks if the target cell is clicked or not
      if(targetElement.className == 'clicked'){
        //if target cell clicked, check if input cell is also clicked [RIGHT]
        if(inputElement.className == 'clicked'){
          //if yes, increase cell index by 1 (search next cell)
          cellIndex++;
          accuracy++; 
          //if no, display error message
        } else {
          if(experiment.trialCount != 1 && experiment.trialCount != 2){
          training_1_error.play();
          $(error).html('<font color="red"><strong>The two grids should be the same. Please try again<strong></font>');
          return;
          } else{
            cellIndex++;
          }
        }
      //if the target cell is NOT clicked
      } else {
        //and the input cell IS clicked [WRONG]
        if(inputElement.className =='clicked'){
          //display error message
          if(experiment.trialCount != 1 && experiment.trialCount != 2){
          training_1_error.play();
          $(error).html('<font color="red"><strong>The two grids should be the same. Please try again<strong></font>');
          return;
          } else{
            cellIndex++; 
          }
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
          sparkle.play(); 
          console.log(experiment.condition); 
          if(experiment.condition == "adult"){
            $(childIntro).html('');
            $(adultIntro).html('<p class = "block-text">Now you will try to fix a grid from memory.</p><p class = "block-text"> A target grid will appear for <strong>10</strong> seconds. Your job is to remember where the colors are located in this grid to the best of your ability. You may also click the colors to hear a sound. Next, an image will appear, and then you will see a grid.</p><p class = "block-text"> <strong>Your job is to correct this grid to match the target you previously saw.</p></strong><p class = "block-text"> When you are satisfied with your re-creation, click the button to display the next target grid. There will be 2 practice trials before we start the study.</p>'); 
            showSlide("expIntro")
          } if(experiment.condition == "child"){
            $(adultIntro).html('');
            $(childIntro).html('<p class = "block-text">Now you will try to recreate a grid from memory.</p> <p class = "block-text">A target grid will appear for <strong>10</strong> seconds. Your job is to remember where the colors are located in this grid to the best of your ability. You may also click the colors to hear a sound. Next, an image will appear, and then you will see a blank grid. </p><p class = "block-text"><strong>Fill in the colors on the blank grid just as they appeared on the target grid.</strong></p><p class = "block-text"> When you are satisfied with your re-creation, click the button to display the next target grid. There will be 2 practice trials before we start the study.</p>'); 
            showSlide("expIntro");
          }
        } else{
          cellIndex = 0; 
        }
      }
    }
    if(experiment.trialCount ==1){
      experiment.training_1_accuracy = accuracy/10; 
      console.log(accuracy);
      console.log(experiment.training_1_accuracy);
    } if(experiment.trialCount == 2){
      experiment.training_2_accuracy = accuracy/10;
      console.log(accuracy);
      console.log(experiment.training_2_accuracy); 
    }
  },

  //checks whether first slide is filled out completely [ONLY APPLICABLE ON CHILD TRIALS]
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
    experiment.subage = document.getElementById("age").value;


    //goes to training slide
    experiment.loadIteratedData();
  },
}