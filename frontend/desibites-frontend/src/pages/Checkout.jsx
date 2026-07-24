import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const placeOrder = async () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!name || !phone || !address) {
            alert("Please fill all details.");
            return;
        }

        try {

            for (const item of cart) {

                await fetch("https://desibites-backend-dcmi.onrender.com/orders/place", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        userId: Number(userId),

                        productId: item.id,

                        quantity: item.quantity,

                        totalPrice: item.price * item.quantity,

                        status: "PLACED"

                    })

                });

            }

            localStorage.removeItem("cart");

            alert("🎉 Order Placed Successfully!");

            navigate("/my-orders");

        } catch (error) {

            console.error(error);

            alert("Order Failed! Please try again.");

        }

    };

    return (

        <div className="checkout-page">

            <div className="checkout-card">

                <h1>💳 Checkout</h1>

                <input
                    type="text"
                    placeholder="👤 Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="📞 Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                    rows="4"
                    placeholder="📍 Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button onClick={placeOrder}>
                    ✅ Place Order
                </button>

            </div>

        </div>

    );

}

export default Checkout;