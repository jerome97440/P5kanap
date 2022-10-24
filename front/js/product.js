let params = new URL(window.location.href).searchParams;
let newID = params.get('id');
let picture = document.querySelector(".item__img")
let title = document.getElementById("title")
let price = document.getElementById("price")
let description = document.getElementById("description")
let colorsArray = document.getElementById("colors")

fetch("http://localhost:3000/api/products/"+ newID)
.then((response) => response.json())
.then((product) =>{
        console.log(product)
   
        let image = document.createElement("img");
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        picture.appendChild(image);

        title.textContent = product.name;
        description.textContent = product.description;
        price.textContent = product.price;
        
        for (let i=0; i < product.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute('value', product.colors);
            color.textContent = product.colors;
            colorsArray.appendChild(color)
            
        }
    });
  let imageURL = "";
  let imageAlt = "";
  const selectQuantity = document.getElementById("quantity");
  const selectColors =document.getElementById("colors");
  const addToCart = document.getElementById("addToCart");
  
  addToCart.addEventListener('click',(event)=> {
  event.preventDefault();

    const selection = {
        id: newID,
        image: imageURL,
        alt: imageAlt,
        name: title.textContent,
        price: price.textContent,
        color: selectColors.value,
        quantity: selectQuantity.value,
      }
      let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
      const addProductLocalStorage = () => {
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }
  let addConfirm = () => {
    alert('Le produit a bien été ajouté au panier');
  }

  let update = false;
  
  if (productInLocalStorage) {
   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newID && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });
    if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }
  else {
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});
