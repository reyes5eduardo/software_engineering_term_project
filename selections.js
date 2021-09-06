var el;

$("tr").each(function() {
    var subtotal = parseFloat($(this).children(".price").text().replace("$",""));
    var amount = parseFloat($(this).children(".amount").children("input").val());
    $(this).children(".pricesubtotal").text("$"+(Math.round(subtotal*amount*100)/100).toFixed(2));
});

$(".amount > input").bind("change keyup", function() {
    if (parseFloat($(this).val())<1) {
        $(this).val(1);
        el = $(this).parents("td").parents("tr").children(".remove");
        el.addClass("hey");
        setTimeout(function() {
            el.removeClass("hey");
        }, 200);
    }
    var subtotal = parseFloat($(this).parents("td").parents("tr").children(".price").text().replace("$",""));
    var amount = parseFloat($(this).parents("td").parents("tr").children(".amount").children("input").val());
    $(this).parents("td").parents("tr").children(".pricesubtotal").text("$"+
        (Math.round(
            subtotal*amount*100
        )/100).toFixed(2));
    changed();
});

$(".remove > div").click(function() {
    $(this).parents("td").parents("tr").remove();
    changed();
});

function changed() {
    var subtotal = 0;
    $(".p").each(function() {
        subtotal = subtotal + parseFloat($(this).children(".pricesubtotal").text().replace("$",""));
    });
    $(".totalpricesubtotal").text("$"+(Math.round(subtotal*100)/100).toFixed(2));
    var a = (subtotal/100*110);
    var total = (Math.round(a*100)/100).toFixed(2);
    $(".realtotal").text(total);
    var tax = ("$"+(Math.round(subtotal*8.25)/100).toFixed(2)+" ");
    $(".taxval").text("($"+(Math.round(subtotal*8)/100).toFixed(2)+") ");

    //rewards
    var pts = subtotal * (10/100);
    $(".pts").text((Math.round(subtotal*10)/100));

    var sc_subtotal = subtotal;
    var sc_tax = tax;
    //var sc_shipping = a;
    var sc_total = total;

    //Store values into local storage
    localStorage.setItem("ch_subtotal", sc_subtotal);
    localStorage.setItem('ch_tax', sc_tax);
    //localStorage.setItem('ch_shipping', sc_shipping);
    localStorage.setItem('ch_total', sc_total);
}

//Direct to Checkout page
$("#checkout").click(function() {
    location.href="Checkout.html"
});

changed();

$("#expand").click(function() {
    $("#coolstuff").toggle();
});