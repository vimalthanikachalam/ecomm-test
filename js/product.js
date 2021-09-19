const params = location.search.split("=")[1];
const productContainer = document.getElementById("productContainer");
const cartValue = document.getElementById("cartValue");
cartValue.innerHTML = localStorage.getItem("cartCount");

const getData = () => {
  const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/";

  fetch(url + params)
    .then((res) => res.json())
    .then((product) => renderUI(product))
    .catch((err) => console.log(err));
};

getData();

const renderUI = function (data) {
  let preview = data.photos;

  let thumbnails = "";

  for (let i = 0; i < preview.length; i++) {
    thumbnails += `<img src="${preview[i]}" alt="thumbnails"/>`;
  }

  productUI(productContainer, data, thumbnails);
};

const productUI = function (dataPane, data, thumbnails) {
  dataPane.innerHTML = `
    <div class="product-wrapper">
        <div id="product-image">
          <div class="image-wrapper">
            <img
              id="product-preview"
              src="${data.preview}"
            />
          </div>
        </div>
        <div id="product-details">
          <h1 id="product-title">${data.name}</h1>
          <h1 id="product-brand">${data.brand}</h1>
          <h4 class="section-heading">
            Price: Rs
            <p id="product-price">${data.price}</p>
          </h4>
          <h4 class="section-heading">Description</h4>
          <p id="description">
            ${data.description}
          </p>
          <h4 class="section-heading">Product Preview</h4>
          <div id="product-images">
           ${thumbnails}
          </div>
          <button id="btn-add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
  const add_to_cart = document.getElementById("btn-add-to-cart");

  add_to_cart.addEventListener("click", function () {
    addToCart(data);
  });
};

const addToCart = function (data) {
  let cartProducts = [];
  let foundAtPos = -1;
  const getLocalData = localStorage.getItem("cart");

  if (getLocalData === null) {
    data.quantity = 1;
    data.totalPrice = data.price;
    cartProducts.push(data);
    localStorage.setItem("cartCount", JSON.stringify(1));
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  } else {
    cartProducts = JSON.parse(getLocalData);

    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id == data.id) {
        foundAtPos = i;
      }
    }

    if (foundAtPos > -1) {
      cartProducts[foundAtPos].quantity += 1;
      cartProducts[foundAtPos].totalPrice =
        cartProducts[foundAtPos].quantity * data.price;
      cartProducts.cartCount += 1;
      const cartCounter = Number(localStorage.getItem("cartCount")) + 1;
      localStorage.setItem("cartCount", JSON.stringify(cartCounter));
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    } else {
      data.quantity = 1;
      cartProducts.cartCount = 1;
      data.totalPrice = data.price;
      cartProducts.push(data);
      const cartCounter = Number(localStorage.getItem("cartCount")) + 1;
      localStorage.setItem("cartCount", JSON.stringify(cartCounter));
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }
  cartValue.innerHTML = localStorage.getItem("cartCount");
};
