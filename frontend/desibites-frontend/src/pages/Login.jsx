import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("https://desibites-backend-dcmi.onrender.com/users/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (data && data.id) {

                alert("Login Successful! 🎉");

                localStorage.setItem(
                    "user",
                    JSON.stringify(data)
                );

                localStorage.setItem(
                    "userId",
                    data.id
                );

                navigate("/products");

            } else {

                alert("Invalid Email or Password ❌");

            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to the server. Please try again.");

        }

    };

    return (

        <div className="login-page">

            <h1>Login 🔐</h1>

            <form
                className="login-form"
                onSubmit={handleLogin}
            >

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;