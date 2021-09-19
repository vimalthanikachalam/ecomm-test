const clothing = document.getElementById("clothing");
const accessory = document.getElementById("accessory");
const cartValue = document.getElementById("cartValue");
cartValue.innerHTML = localStorage.getItem("cartCount");

const displayUI = function (dataPane, data) {
  dataPane.innerHTML += `<div class="col-3">
  <a href="/product.html?id=${data.id}">  
  <div class="card">
      <img
        src="${data.preview}"
        alt="product"
      />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">
          ${data.brand}
        </p>
        <p class="card-text">
          ${data.price}
        </p>
      </div>
    </div>
  </div></a>`;
};

const renderData = function (data) {
  for (let i = 0; i < data.length; i++) {
    if (!data[i].isAccessory) {
      displayUI(clothing, data[i]);
    } else {
      displayUI(accessory, data[i]);
    }
  }
};

const getData = () => {
  const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

  fetch(url)
    .then((res) => res.json())
    .then((products) => renderData(products))
    .catch((err) => console.log(err));
};

getData();

//On click of the product
//Open new page show the product details

//crawl --> content
