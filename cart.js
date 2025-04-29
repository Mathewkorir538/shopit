// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Save updated cart to localStorage
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add item to cart
  function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    setCart(cart);
    alert(`${product.name} added to cart!`);
    updateCartCount(); // update UI if needed
  }
  
  // Update cart item count in header (if applicable)
  function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      countElement.textContent = cart.length;
    }
  }
  
  // Remove an item by index
  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    updateCartDisplay(); // refresh cart view if applicable
  }
  
  // Clear the cart
  function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
    updateCartCount();
  }
  
  // Display cart items on cart.html page
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const cart = getCart();
  
    if (!cartItemsContainer || !totalPriceEl) return;
  
    cartItemsContainer.innerHTML = '';
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
      totalPriceEl.textContent = '';
      return;
    }
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <strong>${item.name}</strong> – $${parseFloat(item.price).toFixed(2)}
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += parseFloat(item.price);
    });
  
    totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
    attachRemoveHandlers();
  }
  
  // Attach remove button listeners
  function attachRemoveHandlers() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        removeFromCart(index);
      });
    });
  }
  
  // Initialize count on page load (optional)
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartDisplay(); // Only runs if container is present
  });
  