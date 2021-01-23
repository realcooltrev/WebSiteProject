import contacts from './data/contacts.js';
import optometrists from './data/optometrists.js';
import states from './data/states.js';

// Normally. this would be in a database

// Filter the contacts down to the correct type
const dailies = contacts.filter(contact => contact.type == 'daily');
const weeklies = contacts.filter(contact => contact.type == 'monthly');
const monthlies = contacts.filter(contact => contact.type == 'monthly');

// This function sees if a user has a prescription or not
(function ($) {
  $.fn.askForPrescription = function () {
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
(function ($) {
  $.fn.setTables = function () {
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
      currentHeaders = doctorColumns;
      currentData = optometrists;
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
(function ($) {
  $.fn.getContactType = function () {
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

(function ($) {
  $.fn.prepareOrderForm = function () {
    $("table").remove();
    $("#orderinfo").show();
    $("#haveprescription").remove();
    $("#contacttype").remove();
  };
}(jQuery));

(function ($) {
  $.fn.checkOrder = function () {
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
$(function () {
  $("#haveprescription").change(function () {
    $.fn.askForPrescription();
  });

  $("#contacttype").change(function () {
    $.fn.setTables();
  });

  $(document).on("click", ".orderbutton", function () {
    $.fn.prepareOrderForm();
  });

  $(document).on("click", "#submitorder", function () {
    $.fn.checkOrder();
  });
});

