import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(cart);

    }, []);

    const updateCart = (updatedCart) => {

        setCartItems(updatedCart);

        localStorage.setItem("cart", JSON.stringify(updatedCart));

    };

    const increaseQuantity = (id) => {

        const updated = cartItems.map(item =>

            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item

        );

        updateCart(updated);

    };

    const decreaseQuantity = (id) => {

        const updated = cartItems.map(item =>

            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item

        );

        updateCart(updated);

    };

    const removeItem = (id) => {

        const updated = cartItems.filter(item => item.id !== id);

        updateCart(updated);

    };

    const total = cartItems.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );

    return (

        <div className="cart-page">

            <h1>🛒 Shopping Cart</h1>

            {

                cartItems.length === 0 ?

                <h2>Your Cart is Empty 😔</h2>

                :

                <>

                {

                    cartItems.map(item => (

                        <div className="cart-item" key={item.id}>

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <h2>{item.name}</h2>

                            <p>{item.description}</p>

                            <h3>₹{item.price}</h3>

                            <div className="qty-box">

                                <button
                                onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>

                            </div>

                            <button
                            className="remove-btn"
                            onClick={() => removeItem(item.id)}
                            >
                                ❌ Remove
                            </button>

                        </div>

                    ))

                }

                <div className="cart-summary">

                    <h2>Total : ₹{total}</h2>

                    <button
                    onClick={() => navigate("/checkout")}
                    >
                        Proceed To Checkout 💳
                    </button>

                </div>

                </>

            }

        </div>

    );

}

export default Cart;