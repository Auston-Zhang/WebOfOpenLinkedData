// CSCI 4147 Assignment #3- Winter 2021 
// jQuery related functions all referred to https://jquery.com/
// animation related functions all referred to https://getbootstrap.com/docs/5.0/getting-started/introduction/
// the code logic referred to Nicola Raffaele Di Matteo's source code (PHP+HTML) posted on "Simple DBpedia search", Brightspace , CSCI 4147 Winter 2021
// get data from two SPARQL endpoints: Dbpedia and WikiData, also added wikipedia links to countries in the result


$('#searchButton').on('submit', function (ev) {

  // animation when click the search button
  $("#loader").fadeIn("3000");
  $("#loader").delay(300).fadeOut("3000");

  // clear the previous search outcome

  $("#SearchResult").empty();
  $("#SearchResultCountry").empty();
  $("#SearchResult2").empty();
  $("#SearchResult2PublicationYear").empty();
  
  
  // perform search and show the result
  ev.preventDefault();

   var queryUrl = 'https://opendata.arcgis.com/datasets/e0293fd4721e41d7be4d7386c3c59c16_0.geojson'


  // use jQuery function to parse JSON file return from the queryUrl
   $.getJSON(queryUrl, function( data ) {
    console.log("111",data.features);
    var items = [];
    var filmCountry = [];
    
    arrayData = data.features
    
    console.log(data);

    console.log("ArrayData",arrayData[0].properties.ROAD_LOCATION_1);

   
    // use 10 for test purpose

    // now we can get the data we want from the geoJSON file
    for (i = 0; i < 10; i++) {
      var roadLocation = arrayData[i].properties.ROAD_LOCATION_1;

      var accidentDate = arrayData[i].properties.ACCIDENT_DATE;

      var accidentCoordinate =  arrayData[i].geometry.coordinates;

      //accidentDate = Datetime.accidentDate.format('YYYY-MM-dd');

      console.log("loop",accidentDate)

      items.push( "<li id='" + i + "'>" + roadLocation + "     Date:"+ accidentDate +"Coordinates:    "+ accidentCoordinate + "</div> </li>" );

    }



    
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#halifaxSearchResult" );

    $( "<ul/>", {
      "class": "my-new-list",
      html: filmCountry.join( "" )
    }).appendTo( "#halifaxSearchResult" );

    console.log(items);
  });






});

