$(document).ready(function() {

    //initial array of types of sports to pre-populate starter buttons

    var topics = ["Soccer", "Hockey", "Basketball", "Baseball", "Football", "Lacrosse", "Golf", "Curling", "Bowling"];

    //first need function to GET attributes and display content to DOM using Giphy API and JSON

    function displayInfo() {
        var sport = $(this).attr("sport-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

        //use AJAX to GET information on sport button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty sports div so new selection appends to emtpy div - do not want previous searches listed
            $("#sports").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var sportDiv = $("<div class='sport'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                var gifURL = results[i].images.fixed_height.url;
                var gif = $("<img>").attr("src", gifURL);

                sportDiv.append(gif);
                sportDiv.append(pRate);


                $("#sports").append(sportDiv);
            }
        });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#sportButtons").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var sportRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            sportRender.addClass("sport");
            sportRender.attr("sport-name", topics[i]);
            sportRender.text(topics[i]);
            $("#sportButtons").append(sportRender);
        }
    }

    //on click event to add an additional sport button when submitted - push input to array.

    $("#addSport").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        topics.push(sport);
        renderButtons();
    });

    //on click entire document to cover all elements named "sport" and run display function
    $(document).on("click", ".sport", displayInfo);

    //on click of gif still image, gif will play. When clicked again, gif will pause.

    //run function to display all buttons on startup
    renderButtons();

});
