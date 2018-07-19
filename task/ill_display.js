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


//creates initial seed grids 
var trial1 = [[1,1,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,1,0,0,0,0],
              [0,0,0,0,0,1,0,0],
              [1,0,0,0,0,1,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0]];

var results1 = [[1,0,0,0,0,0,0,0],
              [1,0,1,0,0,0,0,0],
              [ 0, 0, 1, 0, 1, 0, 0, 0],
              [ 0, 0, 1, 0, 1, 0, 0, 0],
              [ 0, 0, 0, 0, 1, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 1, 0, 0, 0, 0, 1, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0]];


var results2 = [[0,0, 0, 0, 0, 0, 1, 0],
              [ 0, 0, 0, 0, 0, 1, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 1, 0],
              [ 0, 0, 0, 1, 0, 0, 1, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 1, 0],
              [ 0, 0, 0, 0, 1, 1, 0, 0]];

var results3 = [[1, 1, 1, 0, 0, 0, 0, 0],
              [ 0, 0, 1, 0, 0, 0, 0, 0],
              [ 0, 0, 1, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 1, 0, 0, 0],
              [ 1, 0, 0, 0, 1, 0, 0, 0],
              [ 1, 0, 0, 0, 0, 1, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0]];

var results4 = [[0, 1, 1, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 1, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 1, 0, 0, 0, 0, 1, 0]];

var results5 = [[0, 0, 1, 0, 1, 1, 0, 0],
              [ 0, 0, 1, 0, 1, 1, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 1, 0, 1, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 1, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0]];

var results6 = [[1, 1, 0, 0, 1, 0, 0, 0],
              [ 1, 0, 0, 0, 1, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 1],
              [ 0, 1, 0, 0, 0, 1, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0]];

var results7 = [[1, 1, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 1, 0, 0, 0, 0, 0, 0, 0],
              [ 1, 0, 0, 0, 1, 1, 1, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0]];

var results8 = [[1, 0, 1, 1, 0, 0, 0, 0],
              [ 1, 0, 0, 1, 0, 0, 0, 0],
              [ 1, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 1, 1, 0, 0, 1, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 0, 0]];

var results9 =[[1, 1, 0, 0, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 0, 0, 0, 1, 0, 0, 0, 0],
              [ 1, 0, 0, 0, 0, 0, 0, 0],
              [ 1, 0, 0, 0, 0, 1, 0, 0],
              [ 0, 0, 0, 0, 1, 0, 0, 0],
              [ 0, 0, 0, 0, 0, 0, 1, 0]];



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
 



//MAIN EXPERIMENT
var experiment = {
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

  //displays target slide, stores data, handles counter for trials and ends study when 10 trials have passed 
  begin: function(){
      //shows target slide for X seconds                                                 
      showSlide("trial");                              
      //displays each individual trial info
        experiment.fillGrid("trialGrid", trial1);
        trialGrid.classList.add("purple");

          experiment.fillGrid("results1", results1);


          experiment.fillGrid("results2", results2);


          experiment.fillGrid("results3", results3);


          experiment.fillGrid("results4", results4);


          experiment.fillGrid("results5", results5);


          experiment.fillGrid("results6", results6);
          experiment.fillGrid("results7", results7);
          experiment.fillGrid("results8", results8);
          experiment.fillGrid("results9", results9);
  },
}

experiment.begin();
// for debugging, jump to training
//experiment.startTrain();
//jump to trials
//showSlide("expIntro");

