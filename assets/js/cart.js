// MAIN FUNCTION
const main = async () => {
  const url = "http://localhost:3000/api/teddies/";
  const cart = new Cart();
  addItemsCards(url, cart);
  showCartQty();
};

// ADD PRODUCTS TO DOCUMENT
const addItemsCards = async (url, cart) => {
  // GET DOM ELEMENT
  const items = document.getElementById("items");

  for (const item of cart.getItems()) {
    const product = await getData(url + item.id);

    // CREATE <article> = ARTICLE
    const article = document.createElement("article");
    items.appendChild(article);
    article.classList.add("row");

    // CREATE <div> = BOX
    const box = document.createElement("div");
    article.appendChild(box);
    box.classList.add("row");

    // CREATE <img> = IMG
    const img = document.createElement("img");
    box.appendChild(img);
    img.src = product.imageUrl;
    img.classList.add("col-3", "w-25");

    // CREATE <div> = DESC
    const desc = document.createElement("div");
    box.appendChild(desc);
    desc.classList.add("col-4", "align-self-center");

    // CREATE <p> = NAME
    const name = document.createElement("p");
    desc.appendChild(name);
    name.classList.add("row", "font-weight-bold");
    name.textContent = product.name;

    // CREATE <p> = COLOR
    const color = document.createElement("p");
    desc.appendChild(color);
    color.classList.add("row", "font-weight-bold");
    color.textContent = "Couleur: " + item.color;

    // CREATE <div> = QUANTITY
    const quantity = document.createElement("div");
    box.appendChild(quantity);
    quantity.classList.add("col", "d-flex", "justify-content-center", "align-items-center", "quantity");

    // CREATE <span> = DOWN
    const down = document.createElement("span");
    quantity.appendChild(down);
    down.classList.add("down", "font-weight-bold");
    down.textContent = "-";

    // CREATE <input> = QUANTITYNUMBER
    const quantityNumber = document.createElement("input");
    quantity.appendChild(quantityNumber);
    quantityNumber.classList.add("text-center", "mx-1", "font-weight-bold");
    setAttributes(quantityNumber, { type: "text", value: item.quantity });

    // MODIFY INPUT VALUE
    quantityNumber.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        quantityNumber.setAttribute("value", quantityNumber.value);
        quantityNumber.textContent = quantityNumber.value;
        item.quantity = quantityNumber.value;
        cart.updateItemQty(item.id, item.color);
        price.textContent = formatPrice(cart.sumPrices(item));
        totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
        totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
        showCartQty()
      }
    });

    // CREATE <span> = UP
    const up = document.createElement("span");
    quantity.appendChild(up);
    up.classList.add("up", "font-weight-bold");
    up.textContent = "+";

    // CREATE <div> = PRICE
    const price = document.createElement("div");
    box.appendChild(price);
    price.classList.add("col", "font-weight-bold", "text-center", "align-self-center");
    price.textContent = formatPrice(cart.sumPrices(item));

    // CREATE <div> = REMOVE
    const remove = document.createElement("div");
    box.appendChild(remove);
    remove.classList.add("col", "text-center", "align-self-center");

    // CREATE <i> = ICONREMOVE
    const iconRemove = document.createElement("i");
    remove.appendChild(iconRemove);
    remove.classList.add("fas", "fa-trash");

    // SET QUANTITY UP + UPDATE VALUE
    up.addEventListener("click", () => {
      increaseCount(item);
    });
    let increaseCount = (item) => {
      const input = up.previousElementSibling;
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      cart.increaseItemQty(item.id, item.color);
      input.value = value;
      price.textContent = formatPrice(cart.sumPrices(item));
      totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
      totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
      showCartQty();
    };

    // SET QUANTITY DOWN + UPDATE VALUE
    down.addEventListener("click", () => {
      decreaseCount(item);
    });
    let decreaseCount = (item) => {
      const input = down.nextElementSibling;
      let value = parseInt(input.value, 10);
      if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        cart.decreaseItemQty(item.id, item.color);
        input.value = value;
        price.textContent = formatPrice(cart.sumPrices(item));
        totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
        totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
        showCartQty();
      } else {
        cart.removeItem(item.id, item.color);
        article.remove();
        totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
        totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
        showCartQty();
      }
    };

    // REMOVE PRODUCT FROM CART + UPDATE VALUE
    remove.addEventListener("click", () => {
      cart.removeItem(item.id, item.color);
      article.remove();
      totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
      totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
      showCartQty();
    });
  }

  // CREATE <a> = BACKTOMHOME
  const backToHome = document.createElement("a");
  items.appendChild(backToHome);
  backToHome.classList.add("d-flex", "align-item-center", "my-3");
  backToHome.href = "index.html";

  // CREATE <i> = BACKARROW
  const backArrow = document.createElement("i");
  backToHome.appendChild(backArrow);
  backArrow.classList.add("fas", "fa-arrow-left", "pt-1");

  // CREATE <span> = TEXTBACKARROW
  const textBackArrow = document.createElement("span");
  backToHome.appendChild(textBackArrow);
  textBackArrow.classList.add("mx-2", "font-weight-bold");
  textBackArrow.textContent = "Retour à l'acceuil";

  // GET DOM ELEMENT
  const summary = document.getElementById("summary");

  // CREATE <div> = TOTALITEMS
  const totalItems = document.createElement("div");
  summary.appendChild(totalItems);
  totalItems.classList.add("col", "font-weight-bold");
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();

  // CREATE <div> = TOTALPRICE
  const totalPrice = document.createElement("div");
  summary.appendChild(totalPrice);
  totalPrice.classList.add("col", "font-weight-bold", "text-right");
  totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);

  // CREATE NEW FORM CONTACT
  const formContact = () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    return (contact = new Contact(firstName, lastName, address, city, email));
  };

  // GET DOM ELEMENT
  const formButton = document.getElementById("formButton");
  formButton.addEventListener("click", () => {
    event.preventDefault();
    const orderData = {
      contact: formContact(),
      products: cart.getItemsId(),
    };
    const request = new Request("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    getData(request).then((data) => {
      console.log(data);
    });
  });
};

// EXECUTE MAIN FUNCTION ON LOAD
document.onload = main();
