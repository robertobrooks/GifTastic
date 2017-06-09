  // Set the initial array of countries
  var topics = ["United States", "Canada", "Mexico", "Argentina"];

  // Add function displayCountryInfo re-renders the HTML to display the appropriate content
  function displayCountryInfo() {

    var topics = $(this).attr("data-name");

  // Add the API key and the required parameters
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&limit=10&rating=y&rating=g&api_key=dc6zaTOxFJmzC";

  // Creates AJAX call for the specific country button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

  // Creates a div to hold the country
      $('#country-view').html("<div>"+topics+"</div>");

  // Retrieves the Rating and the image
      for (var i =0; i < response.data.length; i++) {
      var rating = $("<p>" + response.data[i].rating + "</p>");
      $('#country-view').append(rating);
      var stillImage = $('<img src="' + response.data[i].images.downsized_still.url + '" />');
      $('#country-view').append(stillImage);
    }

    });

  }

  // Function for displaying country data
  function renderButtons() {

  // Deletes the countries prior to adding new

    $("#buttons-view").empty();
  // Loops through the array of countries
    for (var i = 0; i < topics.length; i++) {

  // Dinamically buttons for each country in the array
      var a = $("<button class='btn-sm col-s-1'>");

  // Adds a class of country to  button
      a.addClass("country");
  // Added a data-attribute
      a.attr("data-name", topics[i]);
  // Provided the initial button text
      a.text(topics[i]);
  // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles when add country button is clicked
  $("#add-country").on("click", function(event) {
    event.preventDefault();

  // This line of code will grab the input from the textbox
    var country = $("#country-input").val().trim();

  // The country from the textbox is then added to our array
    topics.push(country);

  // Calling renderButtons which handles the processing of our country array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "country"
  $(document).on("click", ".country", displayCountryInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
