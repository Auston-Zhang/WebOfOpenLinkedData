// we use the set because every value is unique in set(so does the imdbID), the processing speed is faster if the data volume is huge
var nominatedList = new Set();

const nominateLimit = 5;
var currNominatedNum = 0;


$('#searchButton').on('submit', function (ev) {

  // animation when click the search button
  $("#loader").fadeIn("3000");
  $("#loader").delay(300).fadeOut("3000");

  // clear the prevous search outcome

  $("#movieSearchResult").empty();
  
  // perform search and show the result
  ev.preventDefault();
  var value = $('input[name=movieSearchBar]').val();


  $.getJSON('https://www.omdbapi.com/?&apikey=2170dc30&type=movie&s=' + value, function (data) {
    var items = [];
    
    // iterate the JSON file
    $.each(data.Search, function (entryIndex, entry) {
      
      /* 
        get the imdbID, since the imdbID is unique for each movie, we can use this as id for each movvie and use it 
        as an identifier to decide whether a movie is in a nominated list.
      */
      var nominateImdbID = this.imdbID;

      // if not in nominated list, add the content and a clickable button
      if (!nominatedList.has(nominateImdbID)) {

        items.push('<li class="list-group-item d-flex justify-content-between align-items-center"><p>' + this.Title + " (" + this.Year + ")"
          + '</p><button type="button" class="btn btn-success btn-sm" id="' + nominateImdbID + '">Nominate ' + '</button></li>');
    
      }


      // if already in nominated list, then disable the button
      else {

        items.push('<li class="list-group-item d-flex justify-content-between align-items-center"><p>' + this.Title + " (" + this.Year + ")"
          + '</p><button type="button" class="btn btn-success btn-sm" id="' + nominateImdbID + '"disabled>Nominate ' + '</button></li>');
      }

    });

    $("<ul/>", {
      "class": "list-group",
      html: items.join("")
    }).appendTo("#movieSearchResult");
  });

  console.log(nominatedList);

});

// add click listener to the dynamically created buttons
// 1. pop up the alert 
// 2. disable the button
// 3. add the record to the nominated list
$('#movieSearchResult').on('click', 'button', function () {

  //if the user has nominated less than 5 movies
  if (currNominatedNum < nominateLimit) {

    currNominatedNum++;
    nominatedList.add(this.id);
    console.log(this.id);

    alert("Nominated!");

    // disable the button once nominated by the user
    $(this).prop('disabled', true);

    // add the content to the nominated section
    $(this).parent("li").children("p").clone().appendTo("#nominatedMovies").append('   <button type="button" class="btn btn-secondary btn-sm" id="' + this.id + '">Remove</button>');
    $(this).parent("li").children("p").clone().appendTo("#nominatedList");

    // check if we should display the banner
    if (currNominatedNum === nominateLimit) {
      $("#bannerToShow").fadeIn("3000");

    }

  }
  //if the use has already nominated 5 movies, then the user cannot continue to nominate
  else {
    alert("Already nominated 5 movies! This will not be added to the list.");
  }

});

// when click remove button, the list item should be deleted
$('#nominatedMovies').on('click', 'button', function () {
  /*
    remove the item form the nominated section
  */
  $(this).parent("p").remove();
  nominatedList.delete(this.id);
  currNominatedNum--;

  if (currNominatedNum < nominateLimit) {
    $("#bannerToShow").fadeOut("4000");
  }

  /* 
    call the function to loop through the buttons and make sure the buttons of nominated movies are disabled;
    if the movie is deleted from the list, then we should enable the button of that movie
  */
  checkSearchResultButton();

  //animation for the deleting bar
  $("#deletingBar").fadeIn("2000");
  $("#deletingBar").delay(500).fadeOut("2000");

});

//function to update the status of search result buttons
function checkSearchResultButton() {
  console.log("checkButton:" + nominatedList);

  $("#movieSearchResult").find("button").each(function () {

    if (!nominatedList.has((this).id)) {

      $(this).prop('disabled', false);
      console.log(this.id + " Not Disabled");

    }
    else if (nominatedList.has((this).id)) {

      console.log(this.id + " Disabled");
      $(this).prop('disabled', true);

    }
  });
}




