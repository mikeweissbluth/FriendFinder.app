// Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

//create a function [x] that calculates the scores and matches with another person.


  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    //collect data and use it to find a match

    // function [x] will be invoked.
     var newPerson = req.body; 
        var bestMatch = 1000;
        var compatiblePerson;
        var compatiblePersonPhoto; 
        for (var i = 0; i < friendData.length; i++) {
            var difference = compareFriends(newPerson.scores, friendData[i].scores);
            console.log("The new person and " + friendData[i].name + " have a difference of: " + difference);
            if (difference < bestMatch) {
                bestMatch = difference;
                compatiblePerson = friendData[i].name;
                compatiblePersonPhoto = friendData[i].photo;
            }
            console.log("Your most compatible match is: " + compatiblePerson);
        }

        friendData.push(req.body);
        // console.log("This is after push:" + friendData);

        res.json({status: 'OK', compatiblePerson: compatiblePerson, compatiblePersonPhoto: compatiblePersonPhoto});
  });
}
function compareFriends (a,b) {
  console.log('new person scores:');
  console.log(a); 
  console.log('next person scores: ');
  console.log(b);
  var totalDifference = 0;

  for(var i= 0; i < a.length; i++){
      comparisonNumber = difference (a[i],b[i]);
      // console.log("The difference of " + i + " is " + comparisonNumber );
      totalDifference = totalDifference + comparisonNumber;
      // console.log(totalDifference);
  }
  // console.log(totalDifference);
  return totalDifference
};

function difference(a, b) {
  return Math.abs(a - b);


  // // ---------------------------------------------------------------------------
  // // I added this below code so I could clear out the table while working with the functionality.
 

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   friendsData = [];
   
  //   console.log(tableData);
  // });
};
