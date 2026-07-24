import { useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        fetch(`http://localhost:8081/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err));

    }, []);

    return (

        <div style={{
            maxWidth: "500px",
            margin: "40px auto",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,.15)"
        }}>

            <h1>👤 My Profile</h1>

            <h3>Name : {user.name}</h3>

            <h3>Email : {user.email}</h3>

            <h3>Phone : {user.phone}</h3>

        </div>

    );

}

export default Profile;