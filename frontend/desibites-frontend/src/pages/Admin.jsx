import { useEffect, useState } from "react";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {

        fetch("https://desibites-backend-dcmi.onrender.com/orders/1")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => {
                console.log(err);
                alert("Unable to load orders.");
            });

    };

    const updateStatus = async (id, status) => {

        try {

            await fetch(

                `https://desibites-backend-dcmi.onrender.com/orders/${id}/status?status=${status}`,

                {
                    method: "PUT"
                }

            );

            alert("Order Updated Successfully ✅");

            loadOrders();

        } catch (error) {

            console.log(error);
            alert("Failed to update order.");

        }

    };

    return (

        <div className="admin-orders">

            <h1>📦 Manage Orders</h1>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order => (

                            <tr key={order.orderId}>

                                <td>{order.orderId}</td>

                                <td>{order.productName}</td>

                                <td>₹{order.price}</td>

                                <td>{order.quantity}</td>

                                <td>{order.status}</td>

                                <td>

                                    <button

                                        className="prepare-btn"

                                        onClick={() =>
                                            updateStatus(order.orderId, "PREPARING")
                                        }

                                    >

                                        Prepare

                                    </button>

                                    <button

                                        className="deliver-btn"

                                        onClick={() =>
                                            updateStatus(order.orderId, "DELIVERED")
                                        }

                                    >

                                        Deliver

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminOrders;