const checkoutCard = document.getElementById("checkoutCard");
const getLocalData = localStorage.getItem("cart");
const totalAmount = document.getElementById("total-amount");
const btn_place_order = document.getElementById("btn-place-order");

const displayCart = function (data) {
  checkoutCard.innerHTML += `
<div class="checkout-card">
<div>
  <img
    class="checkout-product-img"
    src="${data.preview}"
  />
</div>
<div>
  <h4>${data.name}</h4>
  <p>x${data.quantity}</p>
  <p><span>Amount: Rs </span><span>${data.totalPrice}</span></p>
</div>
</div>`;
};

let total = 0;

if (getLocalData !== null) {
  const data = JSON.parse(getLocalData);
  for (let i = 0; i < data.length; i++) {
    displayCart(data[i]);
    total += data[i].totalPrice;
  }
}
totalAmount.innerText = total;

btn_place_order.addEventListener("click", placeOrder);

function placeOrder() {
  const myOrder = [];

  const cartProducts = JSON.parse(getLocalData);

  for (let i = 0; i < cartProducts.length; i++) {
    const product = {
      productID: cartProducts[i].id,
      productName: cartProducts[i].name,
      productQuantity: cartProducts[i].quantity,
      totalPrice: cartProducts[i].totalPrice,
    };
    myOrder.push(product);
  }
  const orderProduct = {
    products: myOrder,
  };

  //order api invoke
  function orderAPI(data) {
    const endPointURl =
      "https://6146b71b8f2f4e00173040bf.mockapi.io/placeOrder";
    fetch(endPointURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    location.assign("/thankyou.html");
  }

  orderAPI(orderProduct);
}
