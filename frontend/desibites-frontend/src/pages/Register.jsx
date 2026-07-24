import { useState } from "react";

function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch("https://desibites-backend-dcmi.onrender.com/users/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });

            if (response.ok) {

                alert("Registration Successful! 🎉");

                setUser({
                    name: "",
                    email: "",
                    password: "",
                    phone: ""
                });

            } else {

                alert("Registration Failed! ❌");

            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to the server.");

        }

    };

    return (

        <div className="login-page">

            <h1>Register 👤</h1>

            <form
                className="login-form"
                onSubmit={handleRegister}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;