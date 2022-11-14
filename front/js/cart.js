function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (error) {
      console.log(error);
    });
}

function getStorage() {
  let cart = localStorage.getItem("product");

  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}
let cartItems = document.getElementById("cart__items");

function displayProducts(products, articleToShow) {

  // Ajout de l'element article.
  let cartArticles = document.createElement("article");
  cartItems.appendChild(cartArticles);
  cartArticles.setAttribute("data-id", articleToShow.id);
  cartArticles.setAttribute("data-color", articleToShow.color);
  cartArticles.className = "cart__item";

  // Ajout de l'element div qui va contenir l'img.
  let divCartImages = document.createElement("div");
  divCartImages.className = "cart__item__img";
  cartArticles.appendChild(divCartImages);

  // Ajout de l'élement img.
  let cartImages = document.createElement("img");
  cartImages.setAttribute("src", products.imageUrl);
  cartImages.setAttribute("alt", products.altTxt);
  divCartImages.appendChild(cartImages);

  // Ajout d'une div.
  let divCartItems = document.createElement("div");
  divCartItems.className = "cart__item__content";
  cartArticles.appendChild(divCartItems);

  // Ajout d'une div.
  let divCartItemsDescription = document.createElement("div");
  divCartItemsDescription.className = "cart__item__content__description";
  divCartItems.appendChild(divCartItemsDescription);

  // Ajout du h2 qui va contenir le nom du produit.
  let divCartItemsDescriptionName = document.createElement("h2");
  divCartItemsDescription.appendChild(divCartItemsDescriptionName);
  divCartItemsDescriptionName.textContent = products.name;

  // Ajout d'un p qui va contenir la couleur du produit.
  let divCartItemsDescriptionColor = document.createElement("p");
  divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
  divCartItemsDescriptionColor.textContent = articleToShow.color;

  // Ajout d'un p qui va contenir le prix du produit.
  let divCartItemsDescriptionPrice = document.createElement("p");
  divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
  divCartItemsDescriptionPrice.textContent = products.price + " €"; // Ici le prix a été récupéré de l'api directement.

  // Ajout d'une div.
  let divCartItemsSetting = document.createElement("div");
  divCartItemsSetting.className = "cart__item__content__settings";
  divCartItems.appendChild(divCartItemsSetting);

  // Ajout d'une div.
  let divCartItemsSettingQuantity = document.createElement("div");
  divCartItemsSettingQuantity.className ="cart__item__content__settings__quantity";
  divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

  // Ajout d'un p qui va contenir le mot "Qté :".
  let divCartItemsSettingQty = document.createElement("p");
  divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
  divCartItemsSettingQty.textContent = "Qté : ";

  // Ajout de l'input qui va contenir la quantité.
  let inputQuantity = document.createElement("input");
  divCartItemsSettingQuantity.appendChild(inputQuantity);
  inputQuantity.value = articleToShow.quantity;
  inputQuantity.className = "itemQuantity";
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("name", "itemQuantity");

  // Ajout d'une div.
  let divCartItemsDelete = document.createElement("div");
  divCartItems.appendChild(divCartItemsDelete);
  divCartItemsDelete.className = "cart__item__content__settings__delete";


  // Ajout d'un p qui va contenir le bouton "Supprimer".
  let pDeleteItem = document.createElement("p");
  divCartItemsDelete.appendChild(pDeleteItem);
  pDeleteItem.className = "deleteItem";
  pDeleteItem.textContent = "Supprimer";
}

async function displayAllProducts() {
  // Declaration d'une constante qui contiendra l'API.
  const products = await getProducts();

  // Declaration d'une constante qui contiendra le LS.
  let productInLocalStorage = getStorage();

  for (let articleToShow of productInLocalStorage) {
    const product = products.filter((p) => p._id === articleToShow.id);
    displayProducts(product[0], articleToShow);
  }
  return;
}

// je modifie la quantité dans le panier
function changeQtt() {
  let itemQtt = document.querySelectorAll(".itemQuantity");
 
  for (let j = 0; j < itemQtt.length; j++) {
    itemQtt[j].addEventListener("change", (event) => {
      event.preventDefault();
   
      // sélection de la nouvelle quantité...
      // ... qu'on va sauvegarder dans un nouveau tableau
      // avec les autres éléments du localStorage
      let itemNewQtt = itemQtt[j].value;
  
      const newLocalStorage = {
        id: productInLocalStorage[j].id,
        image: productInLocalStorage[j].image,
        alt: productInLocalStorage[j].alt,
        name: productInLocalStorage[j].name,
        color: productInLocalStorage[j].color,
        price: productInLocalStorage[j].price,
        quantity: itemNewQtt, // avec la nouvelle quantité souhaitée
       
      };
      
      // actualiser le localStorage avec les nouvelles données récupérées...
      productInLocalStorage[j] = newLocalStorage;
      // ...en transformant les Js en Json
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      // avertir de la modification et mettre à jour les totaux
      alert("Votre panier est à jour.");
      totalArticles();
      priceAmount();
    });
  }
}
changeQtt();

// je supprime un produit dans le panier
function deleteArticle() {
let deleteItem = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteItem.length; k++) {
    deleteItem[k].addEventListener("click", (event) => {
      event.preventDefault();

      // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
      let deleteId = productInLocalStorage[k].id;
      let deleteColor = productInLocalStorage[k].color;

      // filtrer l'élément cliqué par le bouton supprimer
      // en respectant les conditions du callback
      productInLocalStorage = productInLocalStorage.filter(
        (elt) => elt.id !== deleteId || elt.color !== deleteColor
      );

      // envoyer les nouvelles données dans le localStorage
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      // avertir de la suppression et recharger la page
      alert("Votre article a bien été supprimé.");
      window.location.href = "cart.html";
    });
  }
}
deleteArticle();

// j'affiche le total des articles dans le panier
function totalArticles() {
  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  let totalItems = 0;
  for (l in productInLocalStorage) {
    // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
    // et renvoie un entier (parseInteger), sur la base décimale de 10
    const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);

    // attribuer la valeur retournée par parseInt à la variable totalItems
    totalItems += newQuantity;
  }
  // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalItems;
}
totalArticles();

// je calcule le montant total du panier
async function priceAmount() {
  let productInLocalStorage = getStorage();
  let product = await getProducts();
  let totalPrice = 0;

  for (let i in productInLocalStorage) {
    for (let j in product) {
      const priceOfProduct = product[j].price;
      const idOfProduct = product[j]._id;
      console.log(productInLocalStorage[i].quantity);

      if (productInLocalStorage[i].id === idOfProduct) {
        totalPrice += productInLocalStorage[i].quantity * priceOfProduct;
      }
    }
  }
  document.getElementById("totalPrice").textContent = totalPrice;

  return;
}

// fin else : s'il y a des produits dans le panier

/***********************************/
//DEMANDER LES INFOS DE L'UTILISATEUR//
/**********************************/

// j'envoie le formulaire dans le serveur
function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();

    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    ////
    // --- vérifier la validation des entrées --- //
    ////

    //contrôle prénom 
    function controlFirstName() {
      const validFirstName = contact.firstName;
      if (
        /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)
      ) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText =
          "Merci de vérifier le prénom, 3 caractères minimum";
      }
    }

    // contrôle nom
    function controlName() {
      const validName = contact.lastName;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText =
          "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
      }
    }

    // contrôle adresse
    function controlAddress() {
      const validAddress = contact.address;
      if (/[a-zA-Z]+/g.test(validAddress)) {
        return true;
      } else {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText =
          "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
      }
    }

    // contrôle ville
    function controlCity() {
      const validAddress = contact.city;
      if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText =
          "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
      }
    }

    // contrôle email
    function controlEmail() {
      const validEmail = contact.email;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
        return true;
      } else {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "Erreur ! Email non valide";
      }
    }
    ////
    // --- FIN vérifier la validation des entrées --- //
    ////

    // Après vérification des entrées, j'envoie l'objet contact dans le localStorage
    function validControl() {
      if (
        controlFirstName() &&
        controlName() &&
        controlAddress() &&
        controlCity() &&
        controlEmail()
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      } else {
        alert("Merci de revérifier les données du formulaire");
      }
    }
    validControl();

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
    };

    // j'envoie le formulaire + localStorage (sendFormData)
    // ... que j'envoie au serveur

    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        if (validControl()) {
          document.location.href = "confirmation.html?id=" + data.orderId;
        }
      });
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();

async function main() {
  await displayAllProducts();
  await priceAmount();
}
main();