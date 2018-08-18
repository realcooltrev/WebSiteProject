$(function() {
    $("#tabler").click(function() {
        var $tableNew = $("<table><tr><th>ketchup</th><th>price</th><tr><table/>");
        $("form").append($tableNew);
        $("form").append("<p>ketchup</p>");
    });
});

