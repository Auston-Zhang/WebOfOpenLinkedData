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

  $("#halifaxSearchResultTable").empty();
  $("#SearchResultCountry").empty();
  $("#SearchResult2").empty();
  $("#SearchResult2PublicationYear").empty();
  
  
  // perform search and show the result
  ev.preventDefault();

  // get the street input from the search bar
  var valueInput = $('input[name=streetSearchBar]').val();
  // convert the input to uppercase, because the original data only contains uppercase street names
  valueInput = valueInput.toUpperCase();
  console.log("Input1",valueInput);



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
    var index = 1;
    for (i = 0; i < 1000; i++) {

      var roadLocation = arrayData[i].properties.ROAD_LOCATION_1;

      var accidentDate = arrayData[i].properties.ACCIDENT_DATE;


      var accidentCoordinate1 =  arrayData[i].geometry.coordinates[1];
      var accidentCoordinate2 =  arrayData[i].geometry.coordinates[0];
      accidentCoordinate1 = accidentCoordinate1.toString();
      accidentCoordinate2 = accidentCoordinate2.toString();
      var accidentCoordinate =   accidentCoordinate1.concat(', ', accidentCoordinate2);

      

      var accidentDateShort = accidentDate.substring(0,10);


      // console.log("loop",accidentDate)

      // console.log("Input",valueInput);

      // we use includes to help provide more information, users may not want to input the complete address
      
      if( roadLocation.includes(valueInput)   ){

  
        var a =  ("<tr> <th scope='\row'\>"+index+"</th> <td>" +  roadLocation + "</td>           <td>"+ accidentDateShort +"</td>         <td>"+ accidentCoordinate + "</td> <td> to be added </td>" + "    <td> Click Me! </td>   </tr>");
        $('#halifaxSearchResultTable').append(a);
        index = index+1;
      }


    }



    


    // $( "</tbody>", {
    //   "class": "tbody",
    //   html: items.join( "" )
    // }).appendTo( "#halifaxSearchResultTable" );

   

    console.log(items);
  });






});



