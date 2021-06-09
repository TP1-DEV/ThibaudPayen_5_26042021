// EXECUTE ON LOAD
window.onload = () => {
  sumOrder();
  localStorage.clear();
};
// CREATE COMMAND PAGE
const sumOrder = () => {
  const order = document.getElementById("order");
  createSumOrder(order);
};

// CREATE SUM ORDER
const createSumOrder = (element) => {
  const cart = Cart.getCart();
  const totalQuantity = createElementFactory("p", { class: "font-weight-bold" }, element);
  totalQuantity.textContent = "Quantité d'articles : " + cart.itemsQty();
  const totalPrice = createElementFactory("p", { class: "font-weight-bold" }, order);
  totalPrice.textContent = "Prix total : " + formatPrice(cart.totalPrices(), true);
  const orderId = createElementFactory("p", { class: "font-weight-bold" }, order);
  orderId.textContent = "Commande n° : " + getSearchParams("orderId");
};
