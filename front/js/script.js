fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then(function a (products){

    console.log(products)
    products.forEach(product => {
        console.log(product)
        
      //Crée les 5 éléments 
      //faire un getElementById pour ciblé la section et ajouter les 5 élements crée

      let items = document.getElementById("items");
      let link = document.createElement("a");
      link.setAttribute('href',`./product.html?id=${product._id}`);
      items.appendChild(link);

      let article = document.createElement("article");
      link.appendChild(article);

      let images = document.createElement("img");
      images.setAttribute('src', product.imageUrl)
      images.setAttribute('alt', product.altTxt);
      article.appendChild(images);

      let title = document.createElement("h3");
      title.textContent = product.name;
      article.appendChild(title);

      let description = document.createElement("p");
      article.appendChild(description);
      description.textContent = product.description;
    });
});
