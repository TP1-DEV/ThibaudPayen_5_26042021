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
  const totalQuantity = createElementFactory("p", { class: "font-weight-bold"}, order);
  totalQuantity.textContent = "Quantité d'articles : " + cart.itemsQty();

  // CREATE <p> TOTALPRICE
  const totalPrice = createElementFactory("p", { class: "font-weight-bold"}, order);
  totalPrice.textContent = "Prix total : " + formatPrice(cart.totalPrices(), true);

  // CREATE <p> ORDERID
  const orderId = createElementFactory("p", { class: "font-weight-bold"}, order);
  orderId.textContent = "Commande n° : " + getSearchParams("orderId");
};
