// EXECUTE ON LOAD
window.onload = async () => {
  await createCartPage();
  const cart = Cart.getCart();
  cart.updateHeader();
};
// ADD PRODUCTS TO DOCUMENT
const createCartPage = async () => {
  // GET LOCALSTORAGE
  const cart = Cart.getCart();
  for (const item of cart.getItems()) {
    // FETCH DATA
    const url = "http://localhost:3000/api/teddies/";
    const product = await getData(url + item.id);
    // GET DOM ELEMENT
    const cartItems = document.getElementById("cart-items");
    const newCard = createCard(cartItems, product);
    const desc = newCard.querySelector(".card-box-body-text");
    desc.textContent = "Couleur: " + item.color;
    const price = newCard.querySelector(".card-box-body-price-text");
    price.textContent = formatPrice(cart.sumPrices(item));
    const box = newCard.querySelector(".card-box");
    createQuantity(box, item, newCard);
    createRemove(box, item, newCard);
  }
  // GET DOM ELEMENT
  const cartItems = document.getElementById("cart-items");
  createBackToHome(cartItems);
  // GET DOM ELEMENT
  const summary = document.getElementById("summary");
  createTotalSummary(summary);
  // GET DOM ELEMENT
  const buttonForm = document.getElementById("formButton");
  buttonFormOrder(buttonForm);
};

// SHOW SUM INFO
const updateSumInfo = (e) => {
  const cart = e.detail.cart;
  const totalItems = document.getElementById("total-items")
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
  const totalPrice = document.getElementById("total-price")
  totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
};
document.addEventListener("updateEvent", updateSumInfo)
