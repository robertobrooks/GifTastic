  // Set the initial array of countries
  var topics = ["United States", "Canada", "Mexico", "Argentina"];
  var queryURL;
  var country;
  var imageSelected;
  var stillImage;

  // Add function displayCountryInfo re-renders the HTML to display the appropriate content
  function displayCountryInfo() {

    country = $(this).attr("data-name");

    // Add the API key and the required parameters
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&limit=10&rating=y&rating=g&api_key=dc6zaTOxFJmzC";

    // Creates AJAX call for the specific country button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Creates a div to hold the country
      $('#country-view').html("<div class='h2'>" + country + "</div>");

      // Retrieves the Rating and the image
      for (var i = 0; i < response.data.length; i++) {
        var rating = $("<div>Rating: " + response.data[i].rating + "</div>");
        $('#country-view').append(rating);
        var stillImage = $('<img id="' + i + '" class="still" src="' + response.data[i].images.downsized_still.url + '" />');
        $('#country-view').append(stillImage);
      }

    });

  }

  function animateGif() {

    imageSelected = $(this).attr("id");
    // Add the API key and the required parameters

    // Creates AJAX call for the specific country button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Creates a div to hold the country
      $('#country-view').html("<div class='h2'>" + country + "</div>");

      // Retrieves the Rating and the image
      for (var i = 0; i < response.data.length; i++) {
        var rating = $("<div>Rating: " + response.data[i].rating + "</div>");

        $('#country-view').append(rating);
        if (parseInt(imageSelected) === i) {
          stillImage = $('<img id="' + i + '" class="animated" src="' + response.data[i].images.downsized.url + '" />');
        } else {
          stillImage = $('<img id="' + i + '" class="animated" src="' + response.data[i].images.downsized_still.url + '" />');
        }
        $('#country-view').append(stillImage);
      }

    });

  }

  function stopGif() {

    imageSelected = $(this).attr("id");
    // Add the API key and the required parameters

    // Creates AJAX call for the specific country button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Creates a div to hold the country
      $('#country-view').html("<div class='h2'>" + country + "</div>");

      // Retrieves the Rating and the image
      for (var i = 0; i < response.data.length; i++) {
        var rating = $("<div>Rating: " + response.data[i].rating + "</div>");
        $('#country-view').append(rating);

        stillImage = $('<img id="' + i + '" class="still" src="' + response.data[i].images.downsized_still.url + '" />');

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
      var a = $("<button class='btn-sm btn-primary'>");

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
  $(document).on("click", ".still", animateGif);
  $(document).on("click", ".animated", stopGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
