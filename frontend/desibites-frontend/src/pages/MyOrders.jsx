import { useEffect, useState } from "react";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first.");
            return;
        }

        fetch(`https://desibites-backend-dcmi.onrender.com/orders/${userId}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => {
                console.log(err);
                alert("Unable to load your orders.");
            });

    }, []);

    return (

        <div className="orders-page">

            <h1>📦 My Orders</h1>

            {

                orders.length === 0 ?

                <h2>No Orders Found</h2>

                :

                <div className="orders-container">

                    {

                        orders.map(order => (

                            <div className="order-card" key={order.orderId}>

                                <img
                                    src={order.image}
                                    alt={order.productName}
                                />

                                <h2>{order.productName}</h2>

                                <h3>₹{order.price}</h3>

                                <p>Quantity : {order.quantity}</p>

                                <span className="order-status">
                                    {order.status}
                                </span>

                            </div>

                        ))

                    }

                </div>

            }

        </div>

    );

}

export default MyOrders;