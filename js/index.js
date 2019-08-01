



$(function () {
    $('#btnAllCoyntries').click(function () {

        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/all",
            success: function (response) {
                console.log(response);
                $('#container').empty();
                for (let i = 0; i < response.length; i++) {
                    let countryDetails = response[i];
                    CreateNote(countryDetails);
                }
            },
            error: function (jqXHR, textStatus, error) {
                $("#container").empty();  
                let err = textStatus + ", " + error;
                $("#container").html("Request Failed: " + err);
            }
        }
        );
    });

    $('#filterByName').click(function () {

        let countryName = $('#countryName').val()
        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/name/" + countryName,
            success: function (response) {
                console.log(response);
                $('#container').empty();
                for (let i = 0; i < response.length; i++) {
                    let countryDetails = response[i];
                    CreateNote(countryDetails);
                }
            },
            error: function (jqXHR, textStatus, error) {
                $("#container").empty();
                let err = textStatus + ", " + jqXHR.status;
                $("#container").html("Request Failed: " + err).css("color" , "red");
            }
        });
    });

    function CreateNote(countryDetails) {

        let noteData = "<h3 id=name>" + countryDetails.name + "</h3><p>Top level domain: " +
            countryDetails.topLevelDomain + "<br>Capital: " +
            countryDetails.capital + "<br><h5>Currencies:</h5>Code:" +
            countryDetails.currencies[0].code + "<br>Name: " +
            countryDetails.currencies[0].name + "<br>Symbol: " +
            countryDetails.currencies[0].symbol + "</p>";

        $('#container').append("<div class='note'><div class='divFlag'><img class='flag' src=" + countryDetails.flag +
            "></imp></div><div class='details'>" + noteData + "</div></div>").css("color" , "");
    }
});


