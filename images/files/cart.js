document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Retrieve cart data from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Event listener for increasing quantity
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("increase-btn")) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
            saveCart();
            renderCart();
        }

        // Event listener for decreasing quantity
        if (event.target.classList.contains("decrease-btn")) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Remove item if quantity is 0
            }
            saveCart();
            renderCart();
        }

        // Event listener for removing an item
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    });

    // Initial render
    renderCart();
});