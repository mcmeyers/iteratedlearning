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

//array shuffle function
shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//gets current time 
getCurrentTime = function() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (minutes < 10) minutes = "0" + minutes;
  return (hours + ":" + minutes);
}

//generates a random id for subject
function randId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}


var unique_id = 0;  

//EXPERIMENT SETUP 

//for random order of trials
var t1= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 
var t2= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 
var t3= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 
var t4= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 
var t5= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 
var t6= [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]; 

var genNum= [6]; 
var randDisplay= [t1, t2, t3, t4, t5, t6]; 


//MAIN EXPERIMENT
var experiment = {


  ////////VARIABLES

  //bkgd
  unique_id: randId(),
  generation:6,
  date: getCurrentDate(),
  timestamp: getCurrentTime(), 
  seed: 1,
  trial: 1,
  numTrials: 20, 
  Target: "",
  Chosen: "",
  same: "",
  diff: "",
  chain: 1,
  display: 1,



  //storing data 
  dataforRound:" ",
  data:[],

  //initializes other useful variables
  trialCount:0, //# of trials completed

  ////////FUNCTIONS 



uniqueTurker: function(){
    var ut_id = "53ae4ea04173428d22d2c34c58eca39a";
    if (UTWorkerLimitReached(ut_id)) {
      console.log("not unique");
        document.getElementsByTagName('body')[0].innerHTML = "You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.";
    } else { 
      showSlide("intro"); 
      console.log("unique");
    } 
},

  //choose target image
  //MAKE SURE DOES NOT GET DISPLAY = 0
  pickTarget: function() {
    var display = Math.floor(Math.random()*randDisplay.length);
    experiment.chain = shuffle(randDisplay[display]).pop();
    var Target = "grid" + experiment.chain + "_6_" + display + ".jpeg";
    console.log(Target);
    return(Target);
  },


  //choose same chain image 
  //NEED TO PUT IN QUALIFICATION THAT THE DISPLAY CANNOT BE THE SAME AS THE TARGET !!! 
  //MAKE SURE DOES NOT GET DISPLAY = 0
  pickSameChain: function() {
    experiment.display = Math.floor(Math.random()*randDisplay.length);
    var chain = experiment.chain;
    var same = "grid" + chain + "_6_" + experiment.display + ".jpeg";
    console.log("same =" + same);
    return(same);
  },

  //choose distractor image
  pickDiffChain: function() {
    var display = experiment.display;
    var chain = shuffle(randDisplay[display])[0];
    console.log(chain);
    var diff = "grid" + chain + "_6_" + display + ".jpeg";
    console.log("diff =" + diff);
    return(diff);
  },


  //starts training session 1 
  start: function() {
    showSlide("instructions");
    //puts in headers for Turk data file 
    experiment.data.push("unique_id, date, time, trialCount, Target, Chosen");
    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    };
  },

  //sends final data to turk
  submit: function(){
    showSlide("end");
    //submit data to mTurk 
    setTimeout(function(){turk.submit(experiment)}, 3000);

  },

  //stores data in arrays
  storeData: function(trialCount, target, chosen){
 
    //RN, also have the data send round by round FOR TURK EXPERIMENTS just in case this google sheets stuff glitches during the study 
    var dataforServer= experiment.unique_id + "," + experiment.date + "," + experiment.time + "," + experiment.trialCount + "," + experiment.Target + "," + experiment.Chosen + experiment.same + experiment.diff +"\n"; 
    //use line below for writing backups to turk or server 
    experiment.data.push(dataforServer);
  },

  //STORE WHICH GRID WAS TRUE OR FALSE, MAKE ONCLICK STORE DATA
  begin: function(){
    var Img1;
    var Img2;
    console.log(experiment.trialCount);
    showSlide("trial");
    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    }
    //increases trial #
    experiment.trialCount ++;
    var side = [1,0];
    var randSide = shuffle(side).pop();
    console.log(randSide);

    //if experiment is done
    if(experiment.trialCount > experiment.numTrials){
      experiment.submit();
    }

    var targetImg = experiment.pickTarget();
    if(randSide = 1){
      Img1 = experiment.pickSameChain();
      Img2 = experiment.pickDiffChain();
    } else {
      Img2 = experiment.pickSameChain();
      Img1 = experiment.pickDiffChain();
    }

    document.getElementById("target").src="str_plots/"+targetImg;
    document.getElementById("img1").src="str_plots/"+Img1;
    document.getElementById("img2").src="str_plots/"+Img2;

  },

  //for very first training trial only; makes it so you cannot move on unless grids are exactly the same; so this checks the grids for accuracy 
  checkInput: function(type){
      if(type == 'true'){
        showSlide("expIntro");
        } else {
          $(error).html('<font color="red"><strong>Choose the grid on the bottom which is most similar to the grid on top.<strong></font>');
          return;
          } 
  },


}

