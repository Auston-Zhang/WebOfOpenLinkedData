// CSCI 4147 Assignment #3- Winter 2021 
// Team members (by order of first name): 
//               Adeolu Ogunnoiki       B00777067
//               Aoxiang Zhang          B00794930
//               Rita(Yuqiao) Liu       B00685263
//               Taylor MacIntyre       B00752864 
// jQuery related functions all referred to https://jquery.com/
// animation related functions all referred to https://getbootstrap.com/docs/5.0/getting-started/introduction/
// all other references are put in the code


var weather;
var weatherResult;


$('#searchButton').on('submit', function (ev) {

  // animation when click the search button
  $("#loader").fadeIn("3000");
  $("#loader").delay(300).fadeOut("3000");

  // clear the previous search outcome

  $("#halifaxSearchResultTable").empty();
  $("#SearchResult2").empty();
  $("#weather").empty();
  $("#weatherResult").empty();

  // perform search and show the result
  ev.preventDefault();

  // get the street input from the search bar
  var valueInput = $('input[name=streetSearchBar]').val();
  // convert the input to uppercase, because the original data only contains uppercase street names
  valueInput = valueInput.toUpperCase();

  // Halifax open data from the Halifax government
  var queryUrl = 'https://opendata.arcgis.com/datasets/e0293fd4721e41d7be4d7386c3c59c16_0.geojson'


  // use jQuery function to parse JSON file return from the queryUrl
  $.getJSON(queryUrl, function (data) {
    
    var items = [];

    arrayData = data.features

  
    // now we can get the data we want from the geoJSON file
    // we limit the number of 1000 to ensure the API works well, because we are using a free version
    var index = 1;
    for (i = 0; i < 1000; i++) {

      var roadLocation = arrayData[i].properties.ROAD_LOCATION_1;

      var accidentDate = arrayData[i].properties.ACCIDENT_DATE;


      var accidentCoordinate1 = arrayData[i].geometry.coordinates[1];
      var accidentCoordinate2 = arrayData[i].geometry.coordinates[0];
      // convert the coordinates to string
      accidentCoordinate1 = accidentCoordinate1.toString();
      accidentCoordinate2 = accidentCoordinate2.toString();
      var accidentCoordinate = accidentCoordinate1.concat(', ', accidentCoordinate2);


      // get the short format of date
      var accidentDateShort = accidentDate.substring(0, 10);

      // we use includes to help provide more information, users may not want to input the complete address
      // also we make sure the input is not empty so that we can have more access to the API, since we are using a free version of API
      if (valueInput!="" && roadLocation.includes(valueInput)) {

        var condition = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Halifax/" + accidentDateShort + "?unitGroup=metric&key=BT6QRH3GRX9MQ2Y6NZC9KRJ5U&include=obs";
        var x = httpGet(condition);
        //https://www.w3schools.com/js/js_json_parse.asp
        var obj = JSON.parse(x);
        //https://stackoverflow.com/questions/35182660/how-to-read-multi-level-json

        weatherResult = obj.days[0].conditions;
        console.log(weather);

        //https://www.w3schools.com/jsref/prop_select_value.asp
        //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_localecompare
        if (weather == null || weather.localeCompare("---Choose weather condition---") == 0) {
          var a = (
            "<tr> " +
            "<th scope='row'>" + index + "</th>" +
            " <td>" + roadLocation + "</td>          " +
            " <td>" + accidentDateShort + "</td>         " +
            "<td id ='coordinateIndex-" + index + "'>" + accidentCoordinate + "</td> " +
            "<td>" + weatherResult + "</td>" + "    " +
            "<td><btn onclick ='\ updateCoordinates(this.id) '\  id ='btnIndex-" + index + "'\        class='\ btn btn-success '\>Click Me! </td>  " +
            " </tr>");

          $('#halifaxSearchResultTable').append(a);
          index = index + 1;
        }
        else {
          if (weather.localeCompare(weatherResult) == 0) {
            var a = (
              "<tr> " +
              "<th scope='row'>" + index + "</th>" +
              " <td>" + roadLocation + "</td>          " +
              " <td>" + accidentDateShort + "</td>         " +
              "<td id ='coordinateIndex-" + index + "'>" + accidentCoordinate + "</td> " +
              "<td>" + weather + "</td>" + "    " +
              "<td><btn onclick ='\ updateCoordinates(this.id) '\  id ='btnIndex-" + index + "'\        class='\ btn btn-success '\>Click Me! </td>  " +
              " </tr>");

            $('#halifaxSearchResultTable').append(a);
            index = index + 1;
          }
        }
      }

    }

    console.log(items);
  });

});


function httpGet(theUrl) {
  //    https://stackoverflow.com/questions/247483/http-get-request-in-javascript
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

//https://www.w3schools.com/tags/att_onchange.asp
function favTutorial() {
  //    https://stackoverflow.com/questions/59581547/return-select-option-value-in-javascript
  weather = document.getElementById('myList').value;

}
