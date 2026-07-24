import { useEffect, useState } from "react";

function Products() {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetch("https://desibites-backend-dcmi.onrender.com/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => {
                console.log(err);
                alert("Unable to load products.");
            });

    }, []);

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return categoryMatch && searchMatch;

    });

    const addToCart = (product) => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === product.id);

        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart 🛒");

    };

    return (

        <div className="products-page">

            <h1>🍽️ Explore Our Menu</h1>

            <div className="search-box">

                <input
                    type="text"
                    placeholder="🔍 Search Food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="filter-buttons">

                <button onClick={() => setSelectedCategory("All")}>All</button>

                <button onClick={() => setSelectedCategory("Biryani")}>🍛 Biryani</button>

                <button onClick={() => setSelectedCategory("Fast Food")}>🍔 Fast Food</button>

                <button onClick={() => setSelectedCategory("Dessert")}>🍰 Dessert</button>

            </div>

            <div className="products">

                {filteredProducts.map(product => (

                    <div className="product-card" key={product.id}>

                        <div className="discount-badge">
                            20% OFF
                        </div>

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <div className="rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <h3>₹{product.price}</h3>

                        <button
                            onClick={() => addToCart(product)}
                        >
                            🛒 Add To Cart
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Products;