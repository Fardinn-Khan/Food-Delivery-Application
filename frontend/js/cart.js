let quantity = 1;

let price = 249;

document.getElementById("plus").onclick = function(){

quantity++;

updateCart();

}

document.getElementById("minus").onclick=function(){

if(quantity>1){

quantity--;

updateCart();

}

}

function updateCart(){

document.getElementById("quantity").innerText=quantity;

let subtotal=quantity*price;

let gst=subtotal*0.05;

let total=subtotal+gst+40;

document.getElementById("subtotal").innerText=subtotal.toFixed(2);

document.getElementById("gst").innerText=gst.toFixed(2);

document.getElementById("total").innerText=total.toFixed(2);

}