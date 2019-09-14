//Madeline Meyers Structure Task

// GENERAL FUNCTIONS 

/*PROBLEMS 
1. The ending slide text is not displaying??? why not?
*/

// Shows slides
function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

function addZero(x, n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
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
var displayNum = [1,2,3,4,5,6];


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
  numTrials: 15, 
  Target: "",
  Chosen: "",
  same: "",
  diff: "",
  chain: 1,
  display: 1,
  trialDisplay: 1,
  trialDisplay1: 1,
  trialDisplay2: 1,
  rightSide: "",
  diffPosition: "",
  targetPosition: "",
  startTime: 0,
  endTime: 0,
  rt: 0,
  target1: 1,
  target2: 1,
  colors: ["black", "red", "purple", "blue"],
  color: "",



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
  pickTarget: function(position) {
    experiment.targetPosition = position;
    var trials = [1,2,3,4,5,6];
    experiment.trialDisplay = shuffle(trials).pop();

    experiment.chain = shuffle(randDisplay[experiment.trialDisplay-1]).pop();

    experiment.target = "grid" + experiment.chain + "_6_" + experiment.trialDisplay + "_" + experiment.color + ".jpeg";

    console.log("Target = " + experiment.target);
    return(experiment.target);
  },

  //function DateDiff


  //choose same chain image 
  //NEED TO PUT IN QUALIFICATION THAT THE DISPLAY CANNOT BE THE SAME AS THE TARGET !!! 
  //you are getting undefined for some of the display #'s and don't understand why, try a different way of getting random number 
  
  pickSameChain: function(rightImg) {
    experiment.samePosition = rightImg;
     experiment.display = displayNum[Math.floor(Math.random()*randDisplay.length)]; 
    if(experiment.display == experiment.trialDisplay){
      experiment.display = experiment.display +1;
      if(experiment.display > 6){
        experiment.display = experiment.display -2; 
      }
    } 
    var chain = experiment.chain;
    experiment.same = "grid" + chain + "_6_" + experiment.display + "_" + experiment.color + ".jpeg";
    console.log("same =" + experiment.same);
    return(experiment.same);
  },

  //choose distractor image
  pickDiffChain: function(position) {
    var trials = [1,2,3,4,5,6];

    experiment.diffPosition = position;

    for( var i = 0; i < trials.length; i++){ 
      if ( trials[i] === experiment.display || trials[i]==experiment.trialDisplay) {
        trials.splice(i, 1); 
      }
    }
    
    var display = shuffle(trials).pop();
    var chain = shuffle(randDisplay[display-1])[0];
    if(chain != experiment.chain){
    } else {
        if(chain < 41){
          chain = chain +1;
      } else{
          chain = chain - 1; 
      }
    }
    experiment.diff = "grid" + chain + "_6_" + display + "_" + experiment.color + ".jpeg";
    console.log("diff =" + experiment.diff);
    return(experiment.diff);
  },


  //starts training session 1 
  start: function() {
        showSlide("instructions");
    if(turk.assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") { //if person has not accepted HIT
      document.getElementById("notAccepted").innerHTML= "Please accept the HIT to Begin!!";
    } 

    //puts in headers for Turk data file 
    experiment.data.push("unique_id, date, time, trialCount, Target, Chosen");
    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    };
  },

  update: function() { 
    var element = document.getElementById("myprogressBar");    
    var width = experiment.trialCount * (100/experiment.numTrials); 
   // var identity = setInterval(scene, 10); 
    //function scene() { 
      //if (width >= 100) { 
        //clearInterval(identity); 
      //} else { 
        //width++;  
      element.style.width = width + '%';  
      //return;
      //} 
    //}  
  }, 

  //stores data in arrays
  storeData: function(chosen){
    //RN, also have the data send round by round FOR TURK EXPERIMENTS just in case this google sheets stuff glitches during the study 
    var dataforServer= experiment.unique_id + "," + experiment.date + "," + experiment.timestamp + "," + experiment.trialCount + "," + experiment.target + "," + experiment.targetPosition + "," + chosen  +","+ experiment.rightSide+ "," + experiment.same + "," + experiment.diff + ","+ experiment.diffPosition+","+ experiment.startTime +","+ experiment.endTime+"\n"; 
    //use line below for writing backups to turk or server 
    $.post("https://callab.uchicago.edu/experiments/structure/datasave.php", {postresult_string : dataforServer});
    experiment.data.push(dataforServer);

    console.log(dataforServer);
  },

  fadeIn: function(image1, image2, image3){
    $('#'+image1).hide();
    $('#'+image2).hide();
    $('#'+image3).hide();
    var timeOut = setTimeout(function() {
     // console.log('timein');
      $('#'+image1).fadeIn();
      $('#'+image2).fadeIn();
      $('#'+image3).fadeIn();
      }, 1000);

  },


  getTime: function(time){
    var d = new Date();
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);
    if(time == 'startTime'){
      experiment.startTime = m + ":" + s + ":" + ms;
    } else{
      experiment.endTime = m + ":" + s + ":" + ms;
    }
  },

  //STORE WHICH GRID WAS TRUE OR FALSE, MAKE ONCLICK STORE DATA
  begin: function(){

    experiment.color = shuffle(experiment.colors)[0];

    experiment.getTime('startTime');

    var Img1;
    var Img2;
    var Img3;
    var randSide1;
    var randSide2;
    showSlide("trial");
    //disables scrolling
    document.ontouchmove=function(event){
      event.preventDefault();
    }
    //increases trial #
    experiment.trialCount ++;
    var side = [1,2,3];
    randSide = shuffle(side).pop();    

    //console.log(randSide);

    //if experiment is done
    if(experiment.trialCount == (experiment.numTrials+1)){
      showSlide("expEnd");
      setTimeout(function(){turk.submit(experiment)}, 3000);
    }


   // var targetImg = experiment.pickTarget();
   // experiment.Target = targetImg;

    if(randSide == 1){
      if(experiment.trialCount == 2 || experiment.trialCount == 7 || experiment.trialCount == 12){
       $('#prompt').html('<strong><center>CHOOSE THE ONE IN THE MIDDLE</strong></center>');
        Img1 = "grid9_6_2.jpeg";
        experiment.diff = Img1;
        Img2 = "grid2_6_3.jpeg";
        experiment.same = Img2;
        Img3 = "grid2_6_3.jpeg";
        experiment.target = Img3;
      }else{
        $('#prompt').html('<center><b>Which grid is not like the others?</b></center>');
        Img3 = experiment.pickTarget('Img3');
        Img1 = experiment.pickDiffChain('Img1');
        Img2 = experiment.pickSameChain('Img2');
      }
    }if(randSide == 2){
      if(experiment.trialCount == 2 || experiment.trialCount == 7 || experiment.trialCount == 12){
       $('#prompt').html('<center><strong>CHOOSE THE ONE IN THE MIDDLE</strong></center>');
        Img1 = "grid2_6_3.jpeg";
        experiment.same = Img1;
        Img2 = "grid9_6_2.jpeg";
        experiment.diff = Img2;
        Img3 = "grid2_6_3.jpeg";
        experiment.target = Img3;
      }else{
        $('#prompt').html('<center><b>Which grid is not like the others?</b></center>');
        Img3 = experiment.pickTarget('Img3'); 
        Img1 = experiment.pickSameChain('Img1');
        Img2 = experiment.pickDiffChain('Img2');
      }
    }else{
      if(experiment.trialCount == 2 || experiment.trialCount == 7 || experiment.trialCount == 12){
      $('#prompt').html('<center><strong>CHOOSE THE ONE IN THE MIDDLE</strong></center>');
      Img1 = "grid2_6_3.jpeg";
      experiment.same = Img1;
      Img2 = "grid2_6_3.jpeg";
      experiment.target = Img2;
      Img3 = "grid9_6_2.jpeg";
      experiment.diff = Img3;
    } else{
      $('#prompt').html('<center><b>Which grid is not like the others?</b></center>');
      Img2 = experiment.pickTarget('Img2'); 
      Img1 = experiment.pickSameChain('Img1');
      Img3 = experiment.pickDiffChain('Img3');
    }}

    //setTimeout(function() {document.getElementById('imageID').style.display='none'}, 5*1000);
    document.getElementById("img1").src="str_plots/"+Img1;
    document.getElementById("img2").src="str_plots/"+Img2;
    document.getElementById("img3").src="str_plots/"+Img3;
        experiment.fadeIn('img1','img2','img3');



  },

  //for very first training trial only; makes it so you cannot move on unless grids are exactly the same; so this checks the grids for accuracy 
  checkInput: function(type){
      if(type == 'true'){
        showSlide("expIntro");
        } else {
          $(error).html('<font color="red"><strong>Choose the grid which is most dissimilar from the others.<strong></font>');
          return;
          } 
  },


}

