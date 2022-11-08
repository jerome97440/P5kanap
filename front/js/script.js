
function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (error) {
      console.log(error);
    });
}

function displayProducts(products) {
  for (let i in products) {
    const product = products[i];
    let items = document.getElementById("items");
    let link = document.createElement("a");
    link.href = `./product.html?id=${product._id}`;
    items.appendChild(link);

    let article = document.createElement("article");
    link.appendChild(article);

    let images = document.createElement("img");
    images.setAttribute("src", product.imageUrl);
    images.setAttribute("alt", product.altTxt);
    article.appendChild(images);

    let title = document.createElement("h3");
    title.textContent = product.name;
    article.appendChild(title);

    let description = document.createElement("p");
    description.textContent = product.description;
    article.appendChild(description);
  }
}
async function main() {
  const products = await getProducts();
  displayProducts(products);
}
main();
