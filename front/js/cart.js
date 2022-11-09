function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (error) {
      console.log(error);
    });
}
function displayProducts(products) {
  let  productInLocalStorage = JSON.parse(localStorage.getItem("prod")); 
    console.log(productInLocalStorage);
    for (let i = 0; i < productInLocalStorage.length; i++) {


      let cartItems = document.getElementById("cart__items");

      // on ajoute l'element article
      let cartArticles = document.createElement("article");
      cartItems.appendChild(cartArticles);
      cartArticles.setAttribute("data-id", productInLocalStorage[i].id);
      cartArticles.setAttribute("data-color", productInLocalStorage[i].color)
      cartArticles.className = "cart__item";


      // on ajoute l'element div qui va contenir l'img 
      let divCartImages = document.createElement("div");
      divCartImages.className = "cart__item__img";
      cartArticles.appendChild(divCartImages);

      // on ajoute l'élement img 
      let cartImages = document.createElement("img");
      cartImages.setAttribute('src', productInLocalStorage[i].image);
      cartImages.setAttribute('alt', productInLocalStorage[i].alt);
      divCartImages.appendChild(cartImages);

      // on ajoute une div
      let divCartItems = document.createElement("div");
      divCartItems.className = "cart__item__content";
      cartArticles.appendChild(divCartItems);

      // on ajoute une div
      let divCartItemsDescription = document.createElement("div");
      divCartItemsDescription.className = "cart__item__content__description";
      divCartItems.appendChild(divCartItemsDescription);

      // ajout du h2 qui va contenir le nom du produit
      let divCartItemsDescriptionName = document.createElement("h2");
      divCartItemsDescription.appendChild(divCartItemsDescriptionName);
      divCartItemsDescriptionName.innerHTML = productInLocalStorage[i].name;

      // ajout d'un p qui va contenir la couleur du produit
      let divCartItemsDescriptionColor = document.createElement("p");
      divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
      divCartItemsDescriptionColor.innerHTML = productInLocalStorage[i].color;

      // ajout d'un p qui va contenir le prix du produit
      let divCartItemsDescriptionPrice = document.createElement("p");
      divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
      divCartItemsDescriptionPrice.innerHTML = products[i].price + " €"; // ici le prix a été récupéré de l'api directement

      // ajout d'une div    
      let divCartItemsSetting = document.createElement("div");
      divCartItemsSetting.className = "cart__item__content__settings";
      divCartItems.appendChild(divCartItemsSetting);

      // ajout d'une div
      let divCartItemsSettingQuantity = document.createElement("div");
      divCartItemsSettingQuantity.className = "cart__item__content__settings__quantity";
      divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

      // ajout d'un p qui va contenir le mot "Qté :" 
      let divCartItemsSettingQty = document.createElement("p");
      divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
      divCartItemsSettingQty.innerHTML = "Qté : ";

      // ajout de l'input qui va contenir la quantité 
      let inputQuantity = document.createElement("input");
      divCartItemsSettingQuantity.appendChild(inputQuantity);
      inputQuantity.value = productInLocalStorage[i].addQuantity;
      inputQuantity.className = "itemQuantity";
      inputQuantity.setAttribute("type", "number");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("name", "itemQuantity");

      // ajout d'une div   
      let divCartItemsDelete = document.createElement("div");
      divCartItemsDelete.className = "cart__item__content__settings__delete";
      divCartItems.appendChild(divCartItemsDelete);

      // ajout d'un p qui va contenir le bouton "Supprimer"   
      let pDeleteItem = document.createElement("p");
      pDeleteItem.className = "deleteItem";
      divCartItemsDelete.appendChild(pDeleteItem);
      pDeleteItem.innerHTML = "Supprimer";
}
}
async function main() {
  const products = await getProducts();
  displayProducts(products);
}
main();
