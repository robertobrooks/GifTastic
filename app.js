  // Initial array of movies
  var topics = ["United States", "Canada", "Mexico", "Argentina"];

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayCountryInfo() {

    var topics = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Creates a div to hold the movie

      $('#country-view').html("<div>"+topics+"</div>");

      // Retrieves the Rating Data
      var rating = $("<p>" + response.data[0].rating + "</p>");
      $('#country-view').append(rating);
      var stillImage = $('<img src="' + response.data[0].images.downsized_still.url + '" />');
      $('#country-view').append(stillImage);

      // Creates an element to have the rating displayed
      // Displays the rating
      // Retrieves the release year
      // Creates an element to hold the release year
      // Displays the release year
      // Retrieves the plot
      // Creates an element to hold the plot
      // Appends the plot
      // Creates an element to hold the image
      // Appends the image
      // Puts the entire Movie above the previous movies.
    });

  }

  // Function for displaying movie data
  function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button class='btn-sm col-s-1'>");
      // Adds a class of movie to our button
      a.addClass("country");
      // Added a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the initial button text
      a.text(topics[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where the add movie button is clicked
  $("#add-country").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var country = $("#country-input").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(country);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".country", displayCountryInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
