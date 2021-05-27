// EXECUTE MAIN FUNCTION ON LOAD
window.onload = () => {
  sumOrder();
  localStorage.clear();
};

const sumOrder = () => {
  // GET LOCALSTORAGE
  const cart = new Cart();

  // GET DOM ELEMENT
  const order = document.getElementById("order");

  // CREATE <p> TOTALQUANTITY
  const totalQuantity = document.createElement("p");
  order.appendChild(totalQuantity);
  totalQuantity.classList.add("font-weight-bold");
  totalQuantity.textContent = "Quantité d'articles : " + cart.itemsQty();

  // CREATE <p> TOTALPRICE
  const totalPrice = document.createElement("p");
  order.appendChild(totalPrice);
  totalPrice.classList.add("font-weight-bold");
  totalPrice.textContent = "Prix total : " + formatPrice(cart.totalPrices(), true);

  // CREATE <p> ORDERID
  const orderId = document.createElement("p");
  order.appendChild(orderId);
  orderId.classList.add("font-weight-bold");
  orderId.textContent = "Commande n° : " + getSearchParams("orderId");
};
