/* Author: Trevor Pierce
 * Date: 11/26/17   
 * Description: Final Project, a website that allows for a user to 
                order contacts
 * Filename:  script.js
 */



// Define the 2D arrays that store all of the information for the contacts/doctors
//
// Normally. this would be in a database
var contactColumns = ["Brand", "Style", "Price"];
var doctorColumns = ["Name", "Phone #"];
var dailies = [["Acuvue", "Moist", 56],
               ["Alcon", "AquaComfort Plus", 52],
               ["Bausch + Lomb", "ONEDay", 45],
               ["CooperVision", "Clarity", 60]];
var weeklies = [["Acuvue", "Oasys", 60],
                ["Bausch + Lomb", "SofLens", 58],
                ["CooperVision", "Avaira", 56]];
var monthlies = [["Acuvue", "Vita", 52],
                 ["Alcon", "Air Optix", 48.00],
                 ["Bausch + Lomb", "Ultra", 42],
                 ["CooperVision", "Biofininity", 52]];

var doctors = [["Pearle Vision", "812-332-9014"],
               ["Brinegar Eye Care", "812-339-7995"],
               ["Hoosier Eye Doctor", "812-333-2020"],
               ["Precision Eye Group", "812-332-2020"]];
var states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO',
                'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 
                'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 
                'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 
                'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
                'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 
                'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 
                'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 
                'WV', 'WI', 'WY'];

// This function sees if a user has a prescription or not
(function($) {
    $.fn.askForPrescription = function() {
        var scriptChoice = $("input[type='radio'][name='prescription']:checked");
        
        if (scriptChoice.attr("id") === "havescript") {
            $("#contacttype").show();
        } else if (scriptChoice.attr("id") === "noscript") {
            $.fn.setTables();
        } else {
            alert("You need to make a choice, first!");
        }
    };
}(jQuery));

// This function checks to see what type of table is needed
// and then creates that table dynamically
(function($) {
    $.fn.setTables = function() {
        $("table").remove();

        var currentTable = $("<table>");
        var currentHeaders = "";
        var currentData = "";
        var scriptChoice = $("input[type='radio'][name='prescription']:checked");

        if (scriptChoice.attr("id") === "havescript") {
            currentHeaders = contactColumns;
            currentData = $.fn.getContactType();
        } else {
            $("#contacttype").hide();
            currentHeaders = doctorColumns
            currentData = doctors;
        }
        
        var headers = $("<tr>");
        
        for (header in currentHeaders) {
            $(headers).append("<th>" + currentHeaders[header] + "</th>");
        }

        $(currentTable).append(headers);

        for (row in currentData) {
            var newRow = $("<tr>");

            for (item in currentData[row]) {
                $(newRow).append("<td>" + currentData[row][item] + "</td>");
            }
            
            if (scriptChoice.attr("id") === "havescript") {
                $(newRow).append("<td><button class='orderbutton' value='$currentData[$row][2]'>Order</button></td>");
            }

            $(currentTable).append(newRow);
        }

        $("#contacttype").after(currentTable);

    } 
}(jQuery));

// This function determines what contact type the user has chosen
// and returns it to the $setTables function to determine what 
// contacts to show
(function($) {
    $.fn.getContactType = function() {
        var contactType = $("#contacttype").val();
        var chosenType = "";

        switch (contactType) {
            case "dailies":
                chosenType = dailies;
                break;
            case "weeklies":
                chosenType = weeklies;
                break;
            case "monthlies":
                chosenType = monthlies;
                break;
            case "NULL":
                break;
        }

        return chosenType;
    };
}(jQuery));

(function($) {
    $.fn.prepareOrderForm = function() {
        $("table").remove();
        $("#orderinfo").show();
        $("#haveprescription").remove();
        $("#contacttype").remove();
    };
}(jQuery));

(function($) {   
    $.fn.checkOrder = function() {     
        var formValidity = false;
        var orderDetails = $(".orderdetail").toArray();;
        var state = $("#state").val();
        var zip = $("#zip").val();
        var zipMatch = /\b\d{5}\b/;

        for (i in orderDetails) {
            if (orderDetails[i].value.length < 1) {
                $("#" + orderDetails[i].id).removeClass("goodinput").addClass("error");
                formValidity = false;
            } else {
                $("#" + orderDetails[i].id).removeClass("error").addClass("goodinput");
                formValidity = true;
            }
        }
         
        if (states.indexOf(state) == -1) {
            $("#state").removeClass("goodinput").addClass("error");
            formValidity = false;
        } else {
            $("#state").removeClass("error").addClass("goodinput");
            formValidity = true;
        }

        if (zipMatch.test(zip)) {
            $("#zip").removeClass("error").addClass("goodinput");
            formValidity = true;
        } else {
            $("#zip").removeClass("goodinput").addClass("error");
            formValidity = false;
        }

        // If the form is not valid, an alert is displayed. If valid, then the order is submitted
        if (formValidity === false) {
            alert("Please correct the highlighted fields");
        } else {
            alert("Your order has been placed and should arrive at your given address in 5-7 business days!\nYour total price is ");
        }
    };
}(jQuery));

// Event handlers
$(function() {
    $("#haveprescription").change(function() {
        $.fn.askForPrescription();
    });

    $("#contacttype").change(function() {
        $.fn.setTables();
    });

    $(document).on("click", ".orderbutton", function(){
        $.fn.prepareOrderForm();
    });

    $(document).on("click", "#submitorder", function() {
        $.fn.checkOrder();
    });
});

