import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const details = state || {};

  const placeOrder = () => {
    alert("Payment Successful 🎉 Order Confirmed!");
    navigate("/my-orders");
  };

  return (
    <div style={{maxWidth:"500px",margin:"40px auto",padding:"20px",border:"1px solid #ddd",borderRadius:"10px"}}>
      <h1>💳 Payment</h1>
      <p><b>Name:</b> {details.name}</p>
      <p><b>Phone:</b> {details.phone}</p>
      <p><b>Address:</b> {details.address}</p>

      <h3>Select Payment Method</h3>

      <label><input type="radio" name="payment" defaultChecked /> Cash on Delivery</label>
      <br/><br/>
      <label><input type="radio" name="payment" /> UPI</label>

      <br/><br/>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Payment;
