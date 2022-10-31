let idProduct = new URL(window.location.href).searchParams.get("id"); 
console.log(idProduct);
  
let picture     = document.querySelector(".item__img"); 
let title       = document.getElementById("title"); 
let price       = document.getElementById("price"); 
let description = document.getElementById("description"); 
let colorsArray = document.getElementById("colors"); 

const apelfectch = function (){
  fetch("http://localhost:3000/api/products/" + idProduct)
.then (function(res){
    return res.json();
})
.then (function(data) {
    console.log(data)
})
}