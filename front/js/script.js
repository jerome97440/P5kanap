
function getProducts(){ 
return fetch("http://localhost:3000/api/products")
.then (function(res){
    return res.json();
})
.then (function(data) {
  console.log(data)
  })
  .catch (function(error){
    console.log(error)
  })
}

function displayProduct (products) {


   
      for (let i in products) {
      let items = document.getElementById("items");
      let link = document.createElement("a");
      link.href = `./product.html?id=${i._id}`;
      items.appendChild(link);

      let article = document.createElement("article");
      link.appendChild(article);

      let images = document.createElement("img");
      images.setAttribute('src', i.imageUrl)
      images.setAttribute('alt', i.altTxt);
      article.appendChild(images);

      let title = document.createElement("h3");
      title.textContent = i.name;
      article.appendChild(title);

      let description = document.createElement("p");
      article.appendChild(description);
      description.textContent =i.description;
 
      }
    }
  async function main (){
    const products = await getProducts ();
    displayProduct (products)

  }
  main()