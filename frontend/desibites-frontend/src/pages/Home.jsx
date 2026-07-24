import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            {/* Hero Section */}

            <section className="hero">

                <h1>🍔 Welcome to DesiBites</h1>

                <p>
                    Delicious food delivered fresh to your doorstep.
                    Explore your favourite dishes from top restaurants.
                </p>

                <div className="hero-buttons">

                    <button
                        onClick={() => navigate("/products")}
                    >
                        🍽️ Order Now
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/products")}
                    >
                        📖 Explore Menu
                    </button>

                </div>

            </section>


            {/* Categories */}

            <section>

                <h2 className="section-title">
                    🍽️ Food Categories
                </h2>

                <div className="category-container">

                    <div className="category-card">
                        <img
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500"
                            alt="Pizza"
                        />
                        <h3>🍕 Pizza</h3>
                    </div>

                    <div className="category-card">
                        <img
                            src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500"
                            alt="Biryani"
                        />
                        <h3>🍛 Biryani</h3>
                    </div>

                    <div className="category-card">
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
                            alt="Burger"
                        />
                        <h3>🍔 Burger</h3>
                    </div>

                    <div className="category-card">
                        <img
                            src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500"
                            alt="Drinks"
                        />
                        <h3>🥤 Drinks</h3>
                    </div>

                </div>

            </section>


            {/* Why Choose Us */}

            <section className="why-us">

                <h2 className="section-title">
                    ⭐ Why Choose DesiBites?
                </h2>

                <div className="features">

                    <div className="feature-card">
                        <h2>🚀</h2>
                        <h3>Fast Delivery</h3>
                        <p>Hot & fresh food delivered within 30 minutes.</p>
                    </div>

                    <div className="feature-card">
                        <h2>🍲</h2>
                        <h3>Fresh Ingredients</h3>
                        <p>Prepared using premium quality ingredients.</p>
                    </div>

                    <div className="feature-card">
                        <h2>💳</h2>
                        <h3>Secure Payment</h3>
                        <p>Safe and secure online payment methods.</p>
                    </div>

                </div>

            </section>


            {/* Footer */}

            <footer className="footer">

                <h2>🍔 DesiBites</h2>

                <p>
                    Bringing delicious food to your doorstep with love ❤️
                </p>

                <p>
                    © 2026 DesiBites. All Rights Reserved.
                </p>

            </footer>

        </div>

    );

}

export default Home;