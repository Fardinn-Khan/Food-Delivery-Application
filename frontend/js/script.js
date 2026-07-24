let cartCount = 0;

const buttons = document.querySelectorAll(".add-cart");

buttons.forEach(button => {

    button.addEventListener("click", function(){

        cartCount++;

        document.getElementById("cartCount").innerText = cartCount;

        let itemName = this.dataset.name;

        alert(itemName + " added to cart!");

    });

});