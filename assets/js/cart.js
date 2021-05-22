// MAIN FUNCTION
const main = async () => {
  addItemsCards();
};

const addItemsCards = async () => {
  const cart = new Cart();
  const url = "http://localhost:3000/api/teddies/";

  const items = document.getElementById("items");
  for (const item of cart.getItems()) {
    const product = await getData(url + item.id);

    const article = document.createElement("article");
    items.appendChild(article);
    article.classList.add("row");

    const box = document.createElement("div");
    article.appendChild(box);
    box.classList.add("row");

    const img = document.createElement("img");
    box.appendChild(img);
    img.src = product.imageUrl;
    img.classList.add("col-3", "w-25");

    const desc = document.createElement("div");
    box.appendChild(desc);
    desc.classList.add("col-4", "align-self-center");

    const name = document.createElement("p");
    desc.appendChild(name);
    name.classList.add("row", "font-weight-bold");
    name.textContent = product.name;

    const color = document.createElement("p");
    desc.appendChild(color);
    color.classList.add("row", "font-weight-bold");
    color.textContent = item.color;

    const quantity = document.createElement("div");
    box.appendChild(quantity);
    quantity.classList.add("col", "d-flex", "justify-content-center", "align-items-center", "quantity");

    const down = document.createElement("span");
    quantity.appendChild(down);
    down.classList.add("down", "font-weight-bold");
    down.textContent = "-";

    const quantityNumber = document.createElement("input");
    quantity.appendChild(quantityNumber);
    quantityNumber.classList.add("text-center", "mx-1", "font-weight-bold");
    quantityNumber.setAttribute("type", "text");
    quantityNumber.setAttribute("value", item.quantity);

    const up = document.createElement("span");
    quantity.appendChild(up);
    up.classList.add("up", "font-weight-bold");
    up.textContent = "+";

    const price = document.createElement("div");
    box.appendChild(price);
    price.classList.add("col", "font-weight-bold", "text-center", "align-self-center");
    price.textContent = formatPrice(cart.sum(item));

    const remove = document.createElement("div");
    box.appendChild(remove);
    remove.classList.add("col", "text-center", "align-self-center");

    const iconRemove = document.createElement("i");
    remove.appendChild(iconRemove);
    remove.classList.add("fas", "fa-trash");

    // SET QUANTITY
    up.addEventListener("click", () => {
      increaseCount(item);
    });
    down.addEventListener("click", () => {
      decreaseCount(item);
    });
    let increaseCount = (item) => {
      const input = up.previousElementSibling;
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      cart.increaseItem(item.id, item.color);
      input.value = value;
      price.textContent = formatPrice(cart.sum(item));
      totalPrice.textContent = "Prix total = " + formatPrice(sumPrices());
      totalItems.textContent = "Nombre d'articles : " + sumItems();
      cartQtyIcon.textContent = sumItems();
    };
    let decreaseCount = (item) => {
      const input = down.nextElementSibling;
      let value = parseInt(input.value, 10);
      if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        cart.decreaseItem(item.id, item.color);
        input.value = value;
        price.textContent = formatPrice(cart.sum(item));
        totalPrice.textContent = "Prix total = " + formatPrice(sumPrices());
        totalItems.textContent = "Nombre d'articles : " + sumItems();
        cartQtyIcon.textContent = sumItems();
      } else {
        cart.removeItem(item.id, item.color);
        article.remove();
      }
    };

    // REMOVE PRODUCT FROM CART
    remove.addEventListener("click", () => {
      cart.removeItem(item.id, item.color);
      article.remove();
    });
  }
  const backToHome = document.createElement("a");
  items.appendChild(backToHome);
  backToHome.classList.add("d-flex", "align-item-center", "my-3");
  backToHome.href = "index.html";

  const backArrow = document.createElement("i");
  backToHome.appendChild(backArrow);
  backArrow.classList.add("fas", "fa-arrow-left", "pt-1");

  const textBackArrow = document.createElement("span");
  backToHome.appendChild(textBackArrow);
  textBackArrow.classList.add("mx-2", "font-weight-bold");
  textBackArrow.textContent = "Retour à l'acceuil";

  const summary = document.getElementById("summary");

  const sumItems = () => {
    let itemsQty = 0;
    for (const item of cart.getItems()) {
      itemsQty += item.quantity;
    }
    return itemsQty;
  };

  const totalItems = document.createElement("div");
  summary.appendChild(totalItems);
  totalItems.classList.add("col", "font-weight-bold");
  totalItems.textContent = "Nombre d'articles : " + sumItems();

  const sumPrices = () => {
    let itemsPrices = 0;
    for (const item of cart.getItems()) {
      itemsPrices += item.price * item.quantity;
    }
    return itemsPrices;
  };

  const totalPrice = document.createElement("div");
  summary.appendChild(totalPrice);
  totalPrice.classList.add("col", "font-weight-bold", "text-right");
  totalPrice.textContent = "Prix total = " + formatPrice(sumPrices());

  const cartQtyIcon = document.getElementById("cart-qty");
  cartQtyIcon.textContent = sumItems();
};


const formContact = () => {
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const email = document.getElementById("email").value
  contact = new Contact(firstName, lastName, address, city, email)
}

const formButton =  document.getElementById("formButton")
formButton.addEventListener("click", () => {
  event.preventDefault()
  formContact()
  console.log(contact);
})



// ON LOAD
document.onload = main();
