let product 

fetch("http://localhost:3000/api/products/")
.then((response) => response.json())
.then((product) =>{
       
let productInLocalStorage = JSON.parse(localStorage.getItem('product'))
        console.log(product)

for (let i = 0; i < product.length; i++) {

let cartItems = document.getElementById("cart__items")

let cartArticles = document.createElement("article");
        cartItems.appendChild(cartArticles);
        cartArticles.setAttribute("data-id", product[i].product);
        cartArticles.setAttribute("data-color", product[i].Colors)
        cartArticles.className = "cart__item";
       
let divCartImages = document.createElement("div");
        divCartImages.className = "cart__item__img";
        cartArticles.appendChild(divCartImages);

let CartImages = document.createElement("img")
        CartImages.setAttribute('src', product[i].imageUrl)
        CartImages.setAttribute('alt', product[i].altTxt)
        divCartImages.appendChild(CartImages)
        
let divCartItems = document.createElement("div")  
    divCartItems.className = "cart__item__content"  
    cartArticles.appendChild(divCartItems)

let divCartItemsDescription = document.createElement("div")
    divCartItemsDescription.className = "cart__item__content__description"
    divCartItems.appendChild(divCartItemsDescription)

let divCartItemsDescriptionname = document.createElement("h2")
    divCartItemsDescription.appendChild(divCartItemsDescriptionname)
    divCartItemsDescriptionname.textContent + product[i].name  

let divCartItemsDescriptionColor = document.createElement("p")
    divCartItemsDescription.appendChild(divCartItemsDescriptionColor)
    divCartItemsDescriptionColor.textContent = product[i].Colors   

let divCartItemsDescriptionPrice = document.createElement("p")
    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice)
    divCartItemsDescriptionPrice.textContent = product[i].price + "€"
        
}})