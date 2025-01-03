const apiUrl = "http://localhost:5000";
let products = [];
let cart = [];

// Utility to format currency
function formatCurrency(value) {
  return `R${value.toLocaleString()}`;
}

// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch(`${apiUrl}/products`);
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Fetch cart
async function fetchCart() {
  try {
    const response = await fetch(`${apiUrl}/cart`);
    cart = await response.json();
    renderCart(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

// Render cart
function renderCart(cart) {
  const cartItems = document.getElementById("cart-items");
  const totalItemsEl = document.getElementById("total-items");
  const totalPriceEl = document.getElementById("total-price");

  cartItems.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    const itemTotal = product.price * cartItem.quantity;
    totalItems += cartItem.quantity;
    totalPrice += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td>${product.brand}</td>
      <td>${product.name}</td>
      <td>${formatCurrency(product.price)}</td>
      <td>
        <button onclick="updateCart('${cartItem.id}', 'decrease')">-</button>
        ${cartItem.quantity}
        <button onclick="updateCart('${cartItem.id}', 'increase')">+</button>
      </td>
      <td>${formatCurrency(itemTotal)}</td>
      <td><button onclick="removeFromCart('${cartItem.id}')">Remove</button></td>
    `;
    cartItems.appendChild(row);
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = formatCurrency(totalPrice);
}

// Add to cart
async function addToCart(productId) {
  try {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
      await fetch(`${apiUrl}/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existingItem.quantity }),
      });
    } else {
      const newItem = { id: productId, quantity: 1 };
      cart.push(newItem);
      await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
    }
    renderCart(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

// Update cart
async function updateCart(productId, action) {
  try {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem) return;

    if (action === "increase") {
      cartItem.quantity++;
    } else if (action === "decrease" && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    await fetch(`${apiUrl}/cart/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: cartItem.quantity }),
    });

    renderCart(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}

// Remove from cart
async function removeFromCart(productId) {
  try {
    cart = cart.filter((item) => item.id !== productId);
    await fetch(`${apiUrl}/cart/${productId}`, {
      method: "DELETE",
    });
    renderCart(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}

// Initialize
async function initialize() {
  await fetchProducts();
  await fetchCart();
}

initialize();
