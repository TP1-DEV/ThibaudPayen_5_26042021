// EXECUTE ON LOAD
window.onload = () => {
  addItemsCards();
  updateCartInfo();
};

// ADD PRODUCTS TO DOCUMENT
const addItemsCards = async () => {
  // GET LOCALSTORAGE
  const cart = new Cart();

  for (const item of cart.getItems()) {

    const updateValuesInfo = () => {
      price.textContent = formatPrice(cart.sumPrices(item));
      totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
      totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
      quantityNumber.setAttribute("value", quantityNumber.value);
      quantityNumber.textContent = quantityNumber.value;
    };
    document.addEventListener("updateEvent", updateValuesInfo)

    // FETCH DATA
    const url = "http://localhost:3000/api/teddies/";
    const product = await getData(url + item.id);

    // GET DOM ELEMENT
    const items = document.getElementById("items");

    // CREATE <article> = ARTICLE
    const article = createElementFactory("article", { class: "row"}, items);

    // CREATE <div> = BOX
    const box = createElementFactory("div", { class: "row"}, article);

    // CREATE <img> = IMG
    const img = createElementFactory("img", { class: "col-3"}, box);
    img.src = product.imageUrl;

    // CREATE <div> = DESC
    const desc = createElementFactory("div", { class: "col-4 align-self-center"}, box);

    // CREATE <p> = NAME
    const name = createElementFactory("p", { class: "row font-weight-bold"}, desc);
    name.textContent = product.name;

    // CREATE <p> = COLOR
    const color = createElementFactory("p", { class: "row font-weight-bold"}, desc);
    color.textContent = "Couleur: " + item.color;

    // CREATE <div> = QUANTITY
    const quantity = createElementFactory("div", { class: "col d-flex justify-content-center align-items-center quantity"}, box);

    // CREATE <span> = DOWN
    const down = createElementFactory("span", { class: "down font-weight-bold"}, quantity);
    down.textContent = "-";

    // CREATE <input> = QUANTITYNUMBER
    const quantityNumber = createElementFactory("input", { class: "text-center mx-1 font-weight-bold", type: "text", value: item.quantity }, quantity);

    // MODIFY INPUT VALUE
    quantityNumber.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        quantityNumber.setAttribute("value", quantityNumber.value);
        quantityNumber.textContent = quantityNumber.value;
        inputValue = parseInt(quantityNumber.value, 10);
        cart.updateItemQty(item.id, item.color, inputValue);
        cart.update()
      }
    });

    // CREATE <span> = UP
    const up = createElementFactory("span", { class: "up font-weight-bold"}, quantity);
    up.textContent = "+";

    // CREATE <div> = PRICE
    const price = createElementFactory("div", { class: "col align-self-center text-center font-weight-bold"}, box);
    price.textContent = formatPrice(cart.sumPrices(item));

    // CREATE <div> = REMOVE
    const remove = createElementFactory("div", { class: "col align-self-center text-center"}, box);

    // CREATE <i> = ICONREMOVE
    const iconRemove = createElementFactory("i", { class: "fas fa-trash"}, remove);

    // SET QUANTITY UP + UPDATE VALUE
    up.addEventListener("click", () => {
      increaseCount(item);
      cart.update()
    });
    let increaseCount = (item) => {
      const input = up.previousElementSibling;
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      cart.increaseItemQty(item.id, item.color);
      input.value = value;
    };

    // SET QUANTITY DOWN + UPDATE VALUE
    down.addEventListener("click", () => {
      decreaseCount(item);
      cart.update()
    });
    let decreaseCount = (item) => {
      const input = down.nextElementSibling;
      let value = parseInt(input.value, 10);
      if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        cart.decreaseItemQty(item.id, item.color);
        input.value = value;
      } else {
        cart.removeItem(item.id, item.color);
        article.remove();
      }
    };
    // REMOVE PRODUCT FROM CART + UPDATE VALUE
    remove.addEventListener("click", () => {
      cart.removeItem(item.id, item.color);
      article.remove();
      cart.update()
    });
  }

  // CREATE <a> = BACKTOMHOME
  const backToHome = createElementFactory("a", { class: "d-flex align-item-center my-3"}, items);
  backToHome.href = "index.html";

  // CREATE <i> = BACKARROW
  const backArrow = createElementFactory("i", { class: "fas fa-arrow-left pt-1"}, backToHome);

  // CREATE <span> = TEXTBACKARROW
  const textBackArrow = createElementFactory("span", { class: "mx-2 font-weight-bold"}, backToHome);
  textBackArrow.textContent = "Retour à l'acceuil";

  // GET DOM ELEMENT
  const summary = document.getElementById("summary");

  // CREATE <div> = TOTALITEMS
  const totalItems = createElementFactory("div", { class: "col font-weight-bold"}, summary);
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();

  // CREATE <div> = TOTALPRICE
  const totalPrice = createElementFactory("div", { class: "col text-right font-weight-bold", id: "totalPrice"}, summary);
  totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);

  // CREATE NEW FORM CONTACT
  const formContact = () => {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    const nameValidation = /^[a-zA-Z]$/;
    const addressValidation = /^[a-zA-Z0-9 ]$/;
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const nameIsValid = nameValidation.test(firstName) && nameValidation.test(lastName) && nameValidation.test(city);
    const addressIsValid = addressValidation.test(address);
    const emailIsValid = emailValidation.test(email);
    if (nameIsValid === false || addressIsValid === false || emailIsValid === false) {
      alert("Erreur de saisie");
    } else {
      return (contact = new Contact(firstName, lastName, address, city, email));
    }
  };

  // GET DOM ELEMENT
  const formButton = document.getElementById("formButton");
  formButton.addEventListener("click", async (e) => {
    e.preventDefault();
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

    const data = await getData(request);
    if (data.orderId) {
      console.log(data);
      window.location = "command.html?orderId=" + data.orderId;
    } else {
      console.error(error);
    }
  });
};