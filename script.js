/* Author: Trevor Pierce
 * Date: 11/26/17   
 * Description: Final Project, a website that allows for a user to 
                order contacts
 * Filename:  script.js
 */
"use strict";

// These global variables are so that all tables can be accessed from all parts of the program
var columns = ["Brand", "Style", "Price"];
var doctorColumns = ["Name", "Phone #"];
var dailies = [["Acuvue", "Moist", "$56.00"],
               ["Alcon", "AquaComfort Plus", "$52.00"],
               ["Bausch + Lomb", "ONEDay", "$45.00"],
               ["CooperVision", "Clarity", "$60.00"]];
var weeklies = [["Acuvue", "Oasys", "$60.00"],
                ["Bausch + Lomb", "SofLens", "$58.00"],
                ["CooperVision", "Avaira", "$56.00"]];
var monthlies = [["Acuvue", "Vita", "$52.00"],
                 ["Alcon", "Air Optix", "$48.00"],
                 ["Bausch + Lomb", "Ultra", "$42.00"],
                 ["CooperVision", "Biofininity", "$52.00"]];
var doctors = [["Pearle Vision", "812-332-9014"],
               ["Brinegar Eye Care", "812-339-7995"],
               ["Hoosier Eye Doctor", "812-333-2020"],
               ["Precision Eye Group", "812-332-2020"]];

var activeTable = ""; // This is so the program can tell what table to hide
var orderTotal = 0; // This stores the order total for the order that is filled after a user clicks on the button for the contacts

// This checks to see if the user has their prescription
function askForPrescription() {
    if (document.getElementById("havescript").checked === true) {
        showContactType();
    } else if (document.getElementById("noscript").checked === true) {
        provideDoctors();
    } else {
        alert("You need to make a choice, first!");
    }
}

// This checks to see what table is active and removes that table and any buttons or messages related to the table
function hideTable() {
    var buttons = document.getElementsByClassName("order");
    switch (activeTable) {
        case "doctors":
            var doctorMessage = document.getElementById("calladoctor");
            doctorMessage.parentNode.removeChild(doctorMessage);
            var currentTable = document.getElementById("doctortable");
            currentTable.parentNode.removeChild(currentTable);
            break;
        case "dailies":
            while(buttons.length > 0) {
                buttons[0].parentNode.removeChild(buttons[0]);
            }
            var currentTable = document.getElementById("dailytable");
            currentTable.parentNode.removeChild(currentTable);
            break;
        case "weeklies":
            while(buttons.length > 0) {
                buttons[0].parentNode.removeChild(buttons[0]);
            }
            var currentTable = document.getElementById("weeklytable");
            currentTable.parentNode.removeChild(currentTable);
            break;
        case "monthlies":
            while(buttons.length > 0) {
                buttons[0].parentNode.removeChild(buttons[0]);
            }
            var currentTable = document.getElementById("doctortable");
            currentTable.parentNode.removeChild(currentTable);
            break;
    }
}

// This function shows all nearby doctors and their phone numbers so that a user can get a prescription
function provideDoctors() {
    hideTable(); // This calls the function to hide the table
    activeTable = "doctors";

    // This creates the table and sets the ID and allows for it to be centered
    var doctorTable = document.createElement("table");
    doctorTable.className = "center";
    doctorTable.id = "doctortable"

    // This creates the first row in the able
    var newRow = document.createElement("tr")

    // This creates a message to inform the user that they need a prescription before ordering contacts
    var message = document.createElement("p");
    var messageText = document.createTextNode("Please contact a doctor before ordering contacts");
    message.id = "calladoctor";

    // This merges the p element with the desired message text, then appends it to the HTML document
    message.appendChild(messageText);
    document.body.appendChild(message);

    // This appends the new table and the first row to the HTML document
    document.body.appendChild(doctorTable);
    doctorTable.appendChild(newRow);

    // This adds information from the doctor columns array to create table headers
    for(var i = 0; i < doctorColumns.length; i++) {
        var header = document.createElement("th");
        var headerText = document.createTextNode(doctorColumns[i]);

        header.appendChild(headerText);
        newRow.appendChild(header);
    }

    // This add information from the doctors array to fill out the table
    for (var i = 0; i < doctors.length; i++) {
        var row = doctors[i];
        var dataRow = document.createElement("tr");
        for (var j = 0; j < row.length; j++) {
            doctorTable.appendChild(dataRow);
            var newCell = document.createElement('td');
            var cellText = document.createTextNode(row[j]);

            newCell.appendChild(cellText);
            dataRow.appendChild(newCell);
        }
    }
}

// This function will show the contact type selection drop down menu
function showContactType() {
    var contactType = document.getElementById("contacttype").value;
    document.getElementById("contacttype").style.visibility = "visible";
}

// This function will get the type of contact selected and then run the appropriate function
function getContactType() {
    var contactType = document.getElementById("contacttype").value;

    switch (contactType) {
        case "dailies":
            dailyTable();
            break;
        case "weeklies":
            weeklyTable();
            break;
        case "monthlies":
            monthlyTable();
            break;
        case "NULL":
            break;
    }
}

// This function creates and displays a table for daily contacts. This works the same as the doctor table function, 
// except for the buttons created to order the contacts
function dailyTable() {
    hideTable();
    activeTable = "dailies";

    var dailyTable = document.createElement("table");
    dailyTable.className = "center";
    dailyTable.id = "dailytable";

    var newRow = document.createElement("tr")

    document.body.appendChild(dailyTable);
    dailyTable.appendChild(newRow);

    for(var i = 0; i < columns.length; i++) {
        var header = document.createElement("th");
        var headerText = document.createTextNode(columns[i]);

        header.appendChild(headerText);
        newRow.appendChild(header);
    }

    for (var i = 0; i < dailies.length; i++) {
        var row = dailies[i];
        var dataRow = document.createElement("tr");
        for (var j = 0; j < row.length; j++) {
            dailyTable.appendChild(dataRow);
            var newCell = document.createElement('td');
            var cellText = document.createTextNode(row[j]);

            newCell.appendChild(cellText);
            dataRow.appendChild(newCell);
        }
   
        // This creates a button the given contact and adds an event handler to the button to send the contacts price to the addCost() function 
        var orderContacts = document.createElement("button");
        orderContacts.type = "button";
        orderContacts.className = "order";
        orderContacts.onclick = addCost(dailies[i][2]); // This sends the price to the addCost() function
        orderContacts.innerHTML = "Order " + dailies[i][1]; // This gets the name of the button
        document.body.appendChild(orderContacts);
    }
    createEventListeners();
}

// This function works the same as the dailies function
function weeklyTable() {
    hideTable();
    activeTable = "weeklies";

    var weeklyTable = document.createElement("table");
    weeklyTable.className = "center";
    weeklyTable.id = "weeklytable";

    var newRow = document.createElement("tr")

    document.body.appendChild(weeklyTable);
    weeklyTable.appendChild(newRow);

    for(var i = 0; i < columns.length; i++) {
        var header = document.createElement("th");
        var headerText = document.createTextNode(columns[i]);

        header.appendChild(headerText);
        newRow.appendChild(header);
    }

    for (var i = 0; i < weeklies.length; i++) {
        var row = weeklies[i];
        var dataRow = document.createElement("tr");
        for (var j = 0; j < row.length; j++) {
            weeklyTable.appendChild(dataRow);
            var newCell = document.createElement('td');
            var cellText = document.createTextNode(row[j]);

            newCell.appendChild(cellText);
            dataRow.appendChild(newCell);
        }
        var orderContacts = document.createElement("button");
        orderContacts.type = "button";
        orderContacts.className = "order";
        orderContacts.onclick = addCost(weeklies[i][2]);
        orderContacts.innerHTML = "Order " + weeklies[i][1];
        document.body.appendChild(orderContacts);
    }
    createEventListeners();
}

// This function works the same as the dailies function
function monthlyTable() {
    hideTable();
    activeTable = "monthlies";

    var monthlyTable = document.createElement("table");
    monthlyTable.className = "center";
    monthlyTable.id = "monthlytable";
    var newRow = document.createElement("tr")

    document.body.appendChild(monthlyTable);
    monthlyTable.appendChild(newRow);

    for(var i = 0; i < columns.length; i++) {
        var header = document.createElement("th");
        var headerText = document.createTextNode(columns[i]);

        header.appendChild(headerText);
        newRow.appendChild(header);
    }

    for (var i = 0; i < monthlies.length; i++) {
        var row = monthlies[i];
        var dataRow = document.createElement("tr");
        for (var j = 0; j < row.length; j++) {
            monthlyTable.appendChild(dataRow);
            var newCell = document.createElement('td');
            var cellText = document.createTextNode(row[j]);

            newCell.appendChild(cellText);
            dataRow.appendChild(newCell);
        }
        var orderContacts = document.createElement("button");
        orderContacts.type = "button";
        orderContacts.className = "order";
        orderContacts.onclick = addCost(monthlies[i][2]);
        orderContacts.innerHTML = "Order " + monthlies[i][1];
        document.body.appendChild(orderContacts);
    }
    createEventListeners();
}

// This function adds the contact price to the person's order
function addCost(contactOrder) {
    orderTotal = contactOrder;
}

// This function displays the order form
function showOrderForm() {
    var orderForm = document.getElementById("orderinfo");
    orderForm.style.visibility = "visible";
    hideTable();
}

// This code is used to make sure that the user enters all of the required data
function checkOrder() {
    var formValidity = false; // This is used to check to see if the form is valid enough to be sent off

    var orderForm = document.getElementById("orderinfo");
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;

    if (firstName === "") {
        document.getElementById("firstname").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("firstname").style.background = "";
        formValidity = true;
    }

    if (lastName === "") {
        document.getElementById("lastname").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("lastname").style.background = "";
        formValidity = true;
    }

    if (street === "") {
        document.getElementById("street").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("street").style.background = "";
        formValidity = true;
    }

    if (city === "") {
        document.getElementById("city").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("city").style.background = "";
        formValidity = true;
    }

    if (state === "") {
        document.getElementById("state").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("state").style.background = "";
        formValidity = true;
    }

    if (zip === "") {
        document.getElementById("zip").style.background = "rgb(255,233,233)";
        formValidity = false;
    } else {
        document.getElementById("zip").style.background = "";
        formValidity = true;
    }


    // If the form is not valid, an alert is displayed. If valid, then the order is submitted
    if (formValidity === false) {
        alert("Please correct the highlighted fields");
    } else {
        submitOrder();
    }
}

// If this order form is valid, this alert is displayed and displays the order total
function submitOrder() {
    alert("Your order has been placed and should arrive at your given address in 5-7 business days!\nYour total price is " + orderTotal);
}

// Event listeners
function createEventListeners() {
    var contactType = document.getElementById("contacttype");
    var prescription = document.getElementById("haveprescription");
    var orderTime = document.getElementsByClassName("order");
    var submit = document.getElementById("submitorder");
    
    if (prescription.addEventListener) {
        prescription.addEventListener("change", askForPrescription, false);
    } else if (prescription.attachEvent) {
        prescription.attachEvent("onchange", askForPrescription);
    }

    if (contactType.addEventListener) {
        contactType.addEventListener("change", getContactType, false);
    } else if (contactType.attachEvent) {
        contactType.attachEvent("onchange", getContactType);
    }
    
    for (var i = 0; i < orderTime.length; i++) {
        if (orderTime[i].addEventListener) {
            orderTime[i].addEventListener("click", showOrderForm, false);
        } else if (orderTime[i].attachEvent) {
            orderTime[i].attachEvent("onclick", showOrderForm, false);
        }
    }

    if (submit.addEventListener) {
        submit.addEventListener("click", checkOrder, false);
    } else if (submit.attachEvent) {
        submit.attachEvent("onclick", checkOrder);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}