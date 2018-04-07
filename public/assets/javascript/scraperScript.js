
// Whenever someone clicks a p tag
$(document).on("click", "p", function(event) {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  var thisClassList = $(this).attr('class');
  console.log(thisClassList);

  console.log("Click!");
  console.log(thisId);

  // Trying to find the parent
  console.log(event);
  console.log(arguments);
  var id = $(this).parent().parent().parent().attr('id');
  console.log("id is " + id);
  console.log(id);

  switch(id)
  {

    case "screen1_saved":
    {
      // Request that the backend toggle the article's
      // saved status
      console.log("Put code here to toggle saved status");
      $.get("/toggle_saved", {article_id: thisId, newValue:false });
      break;
    }

    case "screen1_not_saved":
    {
      // Request that the backend toggle the article's
      // saved status
      console.log("Put code here to toggle saved status");
      $.get("/toggle_saved", {article_id: thisId, newValue:true});
      break;

    }

    default:
    {
  

      // Now make an ajax call for the Article
      $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
        // With that done, add the note information to the page
        .then(function(data) {
          console.log(data);
          // The title of the article
          $("#notes").append("<h2>" + data.title + "</h2>");
          // An input to enter a new title
          $("#notes").append("<input id='titleinput' name='title' >");
          // A textarea to add a new note body
          $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
          // A button to submit a new note, with the id of the article saved to it
          $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

          // If there's a note in the article
          if (data.note) {
            // Place the title of the note in the title input
            $("#titleinput").val(data.note.title);
            // Place the body of the note in the body textarea
            $("#bodyinput").val(data.note.body);
          }
        });

      } // End of default

  } // End of switch

});

// When you click the savenote button
$(document).on("click", "#savenote", function(event) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

let displayPage = function(event)
{
	console.log("I'm in displayPage");
	// Get handles to all the divs representing top level screensl
    let div1     = document.getElementById("screen1");
    let div2        = document.getElementById("screen2");
    

    // Set the display of all the top level divs to "none"
    div1.style.display     = "none";
    div2.style.display     = "none";
    

    // Get the data-name of the object that was clicked
    let name = event.target.getAttribute("data-name");
   
    // Set the display of one of the top level divs to
    // "block" so that it will be seen.
    switch (name)
    {
    	case "screen1":
            console.log("screen1");
            div1.style.display = "block";
            break;

        case "screen2":
            console.log("screen2");
            div2.style.display = "block";
            break;


    } // End of switch (name)

}; // End of let displayPage = function(event)


let readyFunction = function()
{
	// Add click event listener to all elements with a class of "nav-link"
	$(document).on("click", ".nav-link", displayPage);

	console.log("Ready");
};

$( document ).ready(readyFunction);