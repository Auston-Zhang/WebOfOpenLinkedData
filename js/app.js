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

          var condition = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Halifax/" + accidentDateShort + "?unitGroup=metric&key=B78G2RNYUSSZWDPGJRY7GNHZJ&include=obs";
          var x = httpGet(condition);
//https://www.w3schools.com/js/js_json_parse.asp
          var obj = JSON.parse(x);
//https://stackoverflow.com/questions/35182660/how-to-read-multi-level-json
//           document.getElementById("obs").innerHTML =
          var weather = obj.days[0].conditions;
        var a =  (
            "<tr> " +
            "<th scope='row'>"+ index+"</th>" +
            " <td>" + roadLocation + "</td>          " +
            " <td>"+ accidentDateShort +"</td>         " +
            "<td id ='coordinateIndex-"+index+"'>"+ accidentCoordinate  + "</td> " +
            "<td>" + weather + "</td>" + "    " +
            "<td><btn onclick ='\ updateCoordinates(this.id) '\  id ='btnIndex-"+index+"'\        class='\ btn btn-warning '\>Click Me! </td>  " +
            " </tr>");

        $('#halifaxSearchResultTable').append(a);
        index = index+1;
      }


    }

     // function to update the coordinate
  

    // $( "</tbody>", {
    //   "class": "tbody",
    //   html: items.join( "" )
    // }).appendTo( "#halifaxSearchResultTable" );

   

    console.log(items);
  });


 




});


function httpGet(theUrl)
{
//    https://stackoverflow.com/questions/247483/http-get-request-in-javascript
        var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
