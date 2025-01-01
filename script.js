// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active')
    })
}
if (close){
    close.addEventListener('click', () =>{
        nav.classList.remove('active')
    })
}



//fetch and display the products 

document.addEventListener('DOMContentLoaded', function() {
    // Fetch product data from mock API
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        const productContainer = document.querySelector('#product1 .pro-container');
        
        data.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('pro');
          
          productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="des">
              <span>${product.brand}</span>
              <h5>${product.name}</h5>
              <div class="star">
                ${Array(product.rating).fill('<i class="fas fa-star"></i>').join('')}
              </div>
              <h4>${product.price}</h4>
            </div>
            <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
          `;
          
          productContainer.appendChild(productDiv);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  });
  