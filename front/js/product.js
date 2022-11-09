
  
function getProduct(idProduct) {
    return fetch(`http://localhost:3000/api/products/${idProduct}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch(function (error) {
        console.log(error);
    });
}
function displayProduct(product){
let picture = document.querySelector(".item__img"); 
let title = document.getElementById("title"); 
let price = document.getElementById("price"); 
let description = document.getElementById("description"); 
let colorsArray = document.getElementById("colors"); 
let image = document.createElement("img");
image.setAttribute("src", product.imageUrl);
image.setAttribute('alt',product.altTxt)
picture.appendChild(image)
title.textContent = product.name;
price.textContent = product.price;
description.textContent = product.description;
for (let i=0; i < product.colors.length; i++) {
let color = document.createElement("option");
color.setAttribute('value', product.colors[i]);
color.innerHTML = product.colors[i];
colorsArray.appendChild(color);
  }
  const selectQuantity = document.getElementById('quantity');
  const selectColors = document.getElementById('colors');
  const addToCart = document.getElementById('addToCart');
  addToCart.addEventListener('click', (event) => {
  event.preventDefault();
  const selection = {
      id: product.id,
      image: product.imageUrl,
      alt: product.altTxt,
      name: title.textContent,
      price: price.textContent,
      color: selectColors.value,
      quantity: selectQuantity.value,
    };
    let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
    const addProductLocalStorage = () => {
    productInLocalStorage.push(selection);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    }
    let addConfirm = () => {
      alert('Le produit a bien été ajouté au panier');
    }
    let update = false;
    if (productInLocalStorage) {
     productInLocalStorage.forEach (function (productOk, key) {
      if (productOk.id == product.id && productOk.color == selectColors.value) {
        productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        update = true;
     
      }
    });
      if (!update) {
      addProductLocalStorage();
     
      }
    }
    else {
      productInLocalStorage = [];
      addProductLocalStorage();
     
    }
    addConfirm()
  });
}
async function main() {
  let idProduct = new URL(window.location.href).searchParams.get("id"); 
    console.log(idProduct);
    const product = await getProduct(idProduct) 
    displayProduct(product)
    
}
main()
