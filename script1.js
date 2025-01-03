const apiUrl = 'http://localhost:5000'; // Your mock API URL

let cart = [];

// Fetch products from the mock API
async function fetchProducts() {
  try {
    const response = await fetch(`${apiUrl}/products`);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Fetch cart from the mock API
async function fetchCart() {
  try {
    const response = await fetch(`${apiUrl}/cart`);
    cart = await response.json();
    updateCart();
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

// Add item to the cart in the mock API
async function addToCart(productId) {
  const product = await fetchProductById(productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  await updateCartInApi();
  updateCart();
}

// Fetch a product by ID
async function fetchProductById(productId) {
  const response = await fetch(`${apiUrl}/products/${productId}`);
  return await response.json();
}

// Update the cart data in the mock API
async function updateCartInApi() {
  try {
    await fetch(`${apiUrl}/cart`, {
      method: 'PUT',
      body: JSON.stringify(cart),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}

// Remove an item from the cart in the mock API
async function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  await updateCartInApi();
  updateCart();
}

// Update the UI to reflect the cart
function updateCart() {
  const cartButton = document.getElementById('cart-button').querySelector('button');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total').querySelector('p');

  // Update cart button
  cartButton.innerHTML = `Cart (${cart.length})`;

  // Clear cart items list
  cartItemsContainer.innerHTML = '';

  // Add cart items to the cart container
  let total = 0;
  cart.forEach(item => {
    total += parseFloat(item.price.replace('R', '').replace(',', '').trim()) * item.quantity;
    const itemElement = document.createElement('li');
    itemElement.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>R${(item.price.replace('R', '').replace(',', '').trim() * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  // Update total
  cartTotal.innerHTML = `Total: R${total.toFixed(2)}`;
}

// Toggle the cart visibility
function toggleCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.classList.toggle('hidden');
}

// Checkout action
function checkout() {
  alert('Checkout functionality is not implemented yet!');
}

// Render products dynamically
function renderProducts(products) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Initialize page
async function init() {
  await fetchProducts();
  await fetchCart();
}

init();
