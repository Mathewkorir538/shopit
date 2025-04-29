const products = [
    { id: 1, name: "Double Cylinder Car Compressor", price: 250, image: "./images/double cylinder car compresser.jpg" },
    { id: 2, name: "Fuel Saver", price: 200, image: "./images/fuel saver.jpg" },
    { id: 3, name: "Armrest Cushion Cup Holder", price: 150, image: "./images/armrest cushion cup holder.jpg" },
    { id: 4, name: "FM Radio", price: 100, image: "./images/fm radio.jpg" },
    { id: 5, name: "Hot Selling Jump Starter", price: 300, image: "./images/hot selling jump starter.jpg" },
    { id: 6, name: "Car Horn", price: 300, image: "./images/car horn.jpg" },
    { id: 7, name: "Motorbike Windproof Balaclava", price: 300, image: "./images/outdoor mortobike windproof balacava.jpg" },
    { id: 8, name: "Oils", price: 300, image: "./images/oils.jpg" },
    { id: 9, name: "Mortoyle Bike Phone Holder", price: 300, image: "./images/mortoyle bike phone holder.jpg" },
    { id: 10, name: "Boschmann EQX-powerful 7 Band Parametric Equalizer", price: 300, image: "./images/Boschmann EQX-powerful 7 band paramwtric equalizer.jpg" },
    { id: 11, name: "Pump Maxpolor", price: 300, image: "./images/pump maxpolor.jpg" },
    { id: 12, name: "Exhaust Pipe Wrap Gold Air Intake", price: 300, image: "./images/exhaust pipe wrap gold air intake.jpg" },
    { id: 13, name: "Pioneer Speaker", price: 300, image: "./images/piooner speaker.jpg" },
    { id: 14, name: "Pioneer 2400watts", price: 300, image: "./images/pioneer 2400watts.jpg" },
    { id: 15, name: "Spark Plug", price: 300, image: "./images/spark plug.jpg" },
    { id: 16, name: "Pioneer TS High Power Dome", price: 300, image: "./images/pionner Ts high power dome.jpg" },
    { id: 17, name: "Rubber Seal Strip", price: 300, image: "./images/rubber seal strip.jpg" },
    { id: 18, name: "Devil Eye Light", price: 300, image: "./images/Devil eye light.jpg" },
    { id: 19, name: "Toyota Image Roof Rails", price: 300, image: "./images/toyota image roofs rails.jpg" },
    { id: 20, name: "Car Side Mirror Anti Fog", price: 300, image: "./images/car side mirror anti fog.jpg" },
    { id: 21, name: "Windshield Washer Fluids", price: 300, image: "./images/Windshield-Washer-Fluids.jpg" },
    { id: 22, name: "Tyres Tire Puncture Kit", price: 300, image: "./images/tyres tire puncture kit.jpg" },
    { id: 23, name: "Transmission Fluids", price: 300, image: "./images/Transmission-Fluids.jpg" }
];

let cart = [];
let wishlist = [];

// Add to Cart functionality
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");

    // Add to cart functionality
    document.querySelectorAll(".product-item button:first-of-type").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.closest(".product-item");
            const name = product.querySelector("h3").innerText;
            const price = parseFloat(product.querySelector("p").innerText.replace(/[^\d.]/g, ""));

            cart.push({ name, price });
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement("div");
            div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(div);
        });

        cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Back to top
    const backToTopBtn = document.getElementById("back-to-top");
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Filter by category
    document.querySelectorAll(".category-filter button").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            document.querySelectorAll(".product-item").forEach(item => {
                const matches = category === "all" || item.dataset.category === category;
                item.style.display = matches ? "block" : "none";
            });
        });
    });

    // Sort products
    document.getElementById("sort").addEventListener("change", (e) => {
        const sortType = e.target.value;
        const container = document.querySelector(".product-list");
        const items = Array.from(container.querySelectorAll(".product-item"));

        items.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toLowerCase();
            const nameB = b.querySelector("h3").innerText.toLowerCase();
            const priceA = parseFloat(a.querySelector("p").innerText.replace(/[^\d.]/g, ""));
            const priceB = parseFloat(b.querySelector("p").innerText.replace(/[^\d.]/g, ""));

            switch (sortType) {
                case "price-asc": return priceA - priceB;
                case "price-desc": return priceB - priceA;
                case "name-asc": return nameA.localeCompare(nameB);
                case "name-desc": return nameB.localeCompare(nameA);
                default: return 0;
            }
        });

        container.innerHTML = "";
        items.forEach(item => container.appendChild(item));
    });
});


// Adjust quantity functionality
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('adjust-quantity-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const delta = parseInt(event.target.getAttribute('data-delta'));
        adjustQuantity(productId, delta);
    }
});

function adjustQuantity(productId, delta) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += delta;
        if (cartItem.quantity <= 0) {
            removeItem(productId);
        } else {
            updateCart();
        }
    }
}

// Remove item functionality
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        removeItem(productId);
    }
});

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

document.getElementById('next-page-btn').addEventListener('click', () => {
    window.location.href = 'next-page.html'; // Redirect to the next page
});

// Wishlist functionality
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('wishlist-button')) {
        const productElement = event.target.closest('.product-item');
        const productId = products.findIndex(p => p.name === productElement.querySelector('h3').textContent);
        if (productId !== -1) {
            addToWishlist(products[productId]);
        }
    }
});

function addToWishlist(product) {
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        alert(`${product.name} added to your wishlist!`);
    } else {
        alert(`${product.name} is already in your wishlist.`);
    }
}

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});


// Back-to-top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});