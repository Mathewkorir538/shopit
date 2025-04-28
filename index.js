
const products = [
    { id: 1, name: "Double Cylinder Car Compressor", price: 250, image: "./images/double cylinder car compresser.jpg" },
    { id: 2, name: "Fuel Saver", price: 200, image: "./images/fuel saver.jpg" },
    { id: 3, name: "Armrest Cushion Cup Holder", price: 150, image: "./images/armrest cushion cup holder.jpg" },
    { id: 4, name: "FM Radio", price: 100, image: "./images/fm radio.jpg" },
    { id: 5, name: "Hot Selling Jump Starter", price: 300, image: "./images/hot selling jump starter.jpg" }
];

let cart = [];
let wishlist = [];


document.addEventListener('click', (event) => {
    if (event.target.textContent === "Add to cart") {
        const productElement = event.target.closest('.product-item');
        const productId = products.findIndex(p => p.name === productElement.querySelector('h3').textContent);
        if (productId !== -1) {
            addToCart(products[productId]);
        }
    }
});

function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
            <div class="item-actions">
                <button class="adjust-quantity-btn" data-id="${item.id}" data-delta="-1">-</button>
                <span>Quantity: ${item.quantity}</span>
                <button class="adjust-quantity-btn" data-id="${item.id}" data-delta="1">+</button>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}


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