import { useEffect, useState } from "react";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {

        fetch("https://desibites-backend-dcmi.onrender.com/orders")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err));

    };

    const updateStatus = async (id, status) => {

        try {

            const response = await fetch(
                `https://desibites-backend-dcmi.onrender.com/orders/${id}/status?status=${status}`,
                {
                    method: "PUT"
                }
            );

            if (response.ok) {

                alert("Order Status Updated Successfully 🎉");
                loadOrders();

            } else {

                alert("Failed to update order");

            }

        } catch (error) {

            console.log(error);
            alert("Server Error");

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1 style={{ textAlign: "center" }}>📦 Admin Orders</h1>

            {
                orders.length === 0 ?

                    <h2 style={{ textAlign: "center" }}>No Orders Found</h2>

                    :

                    <table
                        border="1"
                        cellPadding="10"
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "center"
                        }}
                    >

                        <thead>

                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Product ID</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {orders.map(order => (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>{order.userId}</td>

                                    <td>{order.productId}</td>

                                    <td>{order.customerName}</td>

                                    <td>{order.phone}</td>

                                    <td>{order.address}</td>

                                    <td>{order.quantity}</td>

                                    <td>₹{order.totalPrice}</td>

                                    <td>

                                        {order.status === "PLACED" && "🟡 Order Placed"}

                                        {order.status === "PREPARING" && "👨‍🍳 Preparing"}

                                        {order.status === "OUT_FOR_DELIVERY" && "🚚 Out for Delivery"}

                                        {order.status === "DELIVERED" && "✅ Delivered"}

                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                updateStatus(order.id, "PREPARING")
                                            }
                                        >
                                            👨‍🍳 Preparing
                                        </button>

                                        <br /><br />

                                        <button
                                            onClick={() =>
                                                updateStatus(order.id, "OUT_FOR_DELIVERY")
                                            }
                                        >
                                            🚚 Out for Delivery
                                        </button>

                                        <br /><br />

                                        <button
                                            onClick={() =>
                                                updateStatus(order.id, "DELIVERED")
                                            }
                                        >
                                            ✅ Delivered
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

            }

        </div>

    );

}

export default AdminOrders;