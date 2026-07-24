document
.getElementById("checkoutForm")
.addEventListener("submit", function(e){

e.preventDefault();

alert("🎉 Order Placed Successfully!\n\nThank you for choosing DesiBites.");

window.location.href="index.html";

});