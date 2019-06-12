$(document).ready(function () {

    // These are our global variables:
    // This is our current number that will always change once image is clicked on for a value.
    var yourMatchingNumber = 0;

    // Creates a target number.
    var randomNum = randomNumGen();

    // Record player wins.
    var wins = 0;

    // Record player losses.
    var losses = 0;

    //  Creates values for each crystals.
    var crystals = randomNumCrystals();

    // Create a function that will generate a random value for each crystal, all four crystals are placed in an object.
    function randomNumCrystals() {
        return {
            blue: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/blue.jpg"
            },
            red: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/red.jpg"
            },
            white: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/white.jpg"
            },
            yellow: {
                value: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/photos/yellow.jpg"
            }
        };
    }

    // Function to create a random number.
    function randomNumGen() {
        return Math.floor(Math.random() * 101) + 20;
    }

    // Function that resets the game.
    function newGame() {

        // Make our current total number 0.
        yourMatchingNumber = 0;

        // Generate random crystal values.
        crystals = randomNumCrystals();

        // Display the newly generated target number and display it.
        randomNum = randomNumGen();
        $("#random-area").text("Number to achieve: " + randomNum);
    }

    // Update the display- the dom.
    function updateDom(didUserWin) {
        $("#record-area").empty();

        // If statement for winning, else false.
        if (didUserWin === true) {
            // Create message, restart the game, and establish new current guess number.
            $("#record-area").append($("<p>").text("Previous game: Win"));
            newGame();
            renderMatchingNumber();
        }

        // If the user lost...
        else if (didUserWin === false) {
            // Show defeat message, restart the game, and render the new "current guess" number.
            $("#record-area").append($("<p>").text("Previous game: Loss"));
            newGame();
            renderMatchingNumber();
        }

        // Append win loss to the record-area.
        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);
        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");
        pWins.append(wSpan);
        pLosses.append(lSpan);
        $("#record-area").append(pWins);
        $("#record-area").append(pLosses);
    }

    // Create a function for rendering the crystals to the crystal-area.
    function renderCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#crystal-area").append(crystalDiv);
        }
    }

    // Create a function to update the current guess.
    function updateMatchingNumber(crystal) {

        // Update the current guess number by crystal value.
        yourMatchingNumber += crystals[crystal.attr("data-name")].value;
    }

    // Create a function that displays current number to the page.
    function renderMatchingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
        $("#score-area").html();
        $("#score-area").html(scoreNumDiv);
    }

    // Call functions to start the game.
    newGame();
    updateDom();
    renderCrystals();
    renderMatchingNumber();

    // Create on.click events for crystals.
    $(".crystals-button").on("click", function (event) {

        // Continue to render page with current guess.
        updateMatchingNumber($(this));
        renderMatchingNumber();

        // If statement to check if the user has won, else loss.
        if (yourMatchingNumber === randomNum) {

            // If user won, increase wins by one, restart the game and update dom.
            alert("You matched the numbers, you win!")
            wins++;
            newGame();
            updateDom(true);
        }
        else if (yourMatchingNumber > randomNum) {
            alert("You went over, you lose.")
            losses++;
            newGame();
            updateDom(false);
        }
    });
});