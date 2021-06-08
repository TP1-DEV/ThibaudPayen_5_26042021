// EXECUTE ON LOAD
window.onload = async () => {
  await createCartPage();
  const cart = Cart.getCart();
  cart.updateHeader();
};

// ADD PRODUCTS TO DOCUMENT
const createCartPage = async () => {
  const cart = Cart.getCart();
  const myArray = [];
  for (const item of cart.getItems()) {
    const product = await getData(url + item.id);
    const cartItems = document.getElementById("cart-items");
    const newCard = createCard(cartItems, product);
    const box = newCard.querySelector(".card-box");
    const cartItemComponent = new CartItemComponent(item, box);
    myArray.push(cartItemComponent)
    const component = cartItemComponent.getComponent();
    newCard.appendChild(component);
    const desc = newCard.querySelector(".card-box-body-text");
    desc.textContent = "Couleur: " + item.color;
  }
  const cartItemsFooter = document.getElementById("cart-items");
  createBackToHome(cartItemsFooter)
  const summary = document.getElementById("summary");
  createTotalSummary(summary);
  const buttonForm = document.getElementById("form-button");
  buttonFormOrder(buttonForm);
};

// SHOW SUM INFO
const updateSumInfo = (e) => {
  const cart = e.detail.cart;
  const totalItems = document.getElementById("total-items");
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
  const totalPrice = document.getElementById("total-price");
  totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
};
document.addEventListener("updateEvent", updateSumInfo);

// CLASS CARTITEMCOMPONENT
class CartItemComponent {
  component;
  quantityNumber;
  constructor(item, id) {
    this.item = item;
    this.quantityComponent = this.createQuantity();
    this.sumPriceComponent = this.createSumPrice();
    this.removeComponent = this.createRemove();
    this.component = this.createCartItemComponent(id);
    this.card = id.parentElement;
  }
  getComponent() {
    return this.component;
  }
  createQuantity() {
    const quantity = createElementFactory("div", { class: "card-component-quantity" });
    const down = createElementFactory("span", { class: "down" }, quantity);
    down.textContent = "-";
    this.quantityNumber = createElementFactory("input", { type: "text", value: this.item.quantity }, quantity);
    const up = createElementFactory("span", { class: "up" }, quantity);
    up.textContent = "+";
    up.addEventListener("click", () => {
      const input = up.previousElementSibling;
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      this.updateQty(value);
    });
    down.addEventListener("click", () => {
      const input = down.nextElementSibling;
      let value = parseInt(input.value, 10);
      if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        this.updateQty(value);
      } else {
        this.removeItem();
      }
    });
    this.quantityNumber.addEventListener("change", () => {
      let value = parseInt(this.quantityNumber.value, 10);
      this.updateQty(value);
    });
    return quantity;
  }
  createSumPrice() {
    const sumPrice = createElementFactory("p", { class: "card-component-price" });
    sumPrice.textContent = formatPrice(this.item.quantity * this.item.price);
    return sumPrice;
  }
  createRemove() {
    const remove = createElementFactory("div", { class: "card-component-remove" });
    const iconRemove = createElementFactory("i", { class: "fas fa-trash" }, remove);
    remove.addEventListener("click", () => {
      this.removeItem();
    });
    return remove;
  }
  createCartItemComponent() {
    const cardComponent = createElementFactory("div", { class: "card-component" });
    cardComponent.appendChild(this.quantityComponent);
    cardComponent.appendChild(this.sumPriceComponent);
    cardComponent.appendChild(this.removeComponent);
    return cardComponent;
  }
  updateQty(qty) {
    this.quantityNumber.value = qty;
    this.sumPriceComponent.textContent = formatPrice(qty * this.item.price);
    Cart.getCart().updateItemQty(this.item.id, this.item.color, qty);
  }
  removeItem() {
    Cart.getCart().removeItem(this.item.id, this.item.color);
    this.card.remove();
  }
}