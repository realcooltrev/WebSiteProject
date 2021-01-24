/*
 * import contacts from './data/contacts.js';
 * import optometrists from './data/optometrists.js';
 * import states from './data/states.js';
 */

// Normally. this would be in a database, but...


/* Optometrist Data Structures */
class Optometrist {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}

const optometrists = [
  new Optometrist('Pearle Vision', '8123329014'),
  new Optometrist('Brinegar Eye Care', '8123397995'),
  new Optometrist('Hoosier Eye Doctor', '8123332020'),
  new Optometrist('Precision Eye Group', '8123322020'),
];


/* Contact Data Structures */
class Contact {
  constructor(type, brand, style, price) {
    this.type = type;
    this.brand = brand;
    this.style = style;
    this.price = price;
  }
}

const contacts = [
  new Contact('daily', 'Acuvue', 'Moist', 56),
  new Contact('daily', 'Alcon', 'AquaComfort Plus', 52),
  new Contact('daily', 'Bausch + Lomb', 'ONEDay', 45),
  new Contact('daily', 'CooperVision', 'Clarity', 60),
  new Contact('weekly', 'Acuvue', 'Oasys', 60),
  new Contact('weekly', 'Bausch + Lomb', 'SofLens', 58),
  new Contact('weekly', 'CooperVision', 'Avaira', 56),
  new Contact('monthly', 'Acuvue', 'Vita', 52),
  new Contact('monthly', 'Alcon', 'Air Optix', 48),
  new Contact('monthly', 'Bausch + Lomb', 'Ultra', 42),
  new Contact('monthly', 'CooperVision', 'Biofininity', 52)
];


/* State Data Structures */
const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA',
  'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH',
  'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY'
];


const askForPrescription = (prescriptionChoice) => {
  // Check if a user has a prescription from an optometrist
  //let scriptChoice = document.querySelector('input[type="radio"][name="prescription"]:checked');

  if (prescriptionChoice === 'yes') {
    $("#contacttype").show();
  } else if (prescriptionChoice === 'no') {
    $.fn.setTables();
  } else {
    alert("You need to make a choice, first!");
  }
}

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
        chosenType = contacts.filter(contact => contact.type == 'daily');
        break;
      case "weeklies":
        chosenType = contacts.filter(contact => contact.type == 'weekly');
        break;
      case "monthlies":
        chosenType = contacts.filter(contact => contact.type == 'monthly');
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
const prescriptionRadio = document.querySelector('#prescription');

prescriptionRadio.addEventListener('change', event => {
  askForPrescription(event.target.value);
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

