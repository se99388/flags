



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
                $("#container").html("Request Failed: " + err).css("color", "red");
            }
        });
    });

    function CreateNote(countryDetails) {

        let noteData = "<h3 id=name>" + isDataExist(countryDetails.name) + "</h3><p>Top level domain: " +
            isDataExist(countryDetails.topLevelDomain) + "<br>Capital: " +
            isDataExist(countryDetails.capital) + "<br><h5>Currencies:</h5>Code:" +
            getAllItems(countryDetails.currencies, "code") + "<br>Name: " +
            getAllItems(countryDetails.currencies, "name") + "<br>Symbol: " +
            getAllItems(countryDetails.currencies, "symbol")
            // isDataExist(countryDetails.currencies[0].symbol) 
            + "</p>";

        $('#container').append("<div class='note'><div class='divFlag'><img class='flag' src=" + countryDetails.flag +
            "></imp></div><div class='details'>" + noteData + "</div></div>").css("color", "");
    }

    function isDataExist(data) {
        if ((data)) {
            if ((data.length))
                return data;
            else {
                return "No data";
            }
        }
        return "No data";
    }

    function getAllItems(items, title) {
        let allItems = [];
        console.log("before",allItems)
        for (let i = 0; i < items.length; i++) {
            allItems.push(items[i][title]);
        }
        
        if (allItems[0]!== null) {
            return allItems;
        }
        return "No Data";
    }
});


