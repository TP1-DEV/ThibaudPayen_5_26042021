// EXECUTE ON LOAD
window.onload = () => {
  addItemsCards();
  updateCartInfo();
};

// ADD PRODUCTS TO DOCUMENT
const addItemsCards = async () => {
  // FETCH DATA
  const url = "http://localhost:3000/api/teddies/";
  const products = await getData(url);

  // GET DOM ELEMENT
  const cardSection = document.getElementById("card-section");

  // CREATE <div> = CARD
  const cardBox = createElementFactory("div", {class: "row row-cols-1 row-cols-md-3 products my-4"}, cardSection);

  for (let product of products) {
    // CREATE <article> = ARTICLE
    const card = createElementFactory("article", { class: "col my-4"}, cardBox);

    // CREATE <a> = LINK
    const link = createElementFactory("a", { class: "" }, card);
    link.href = "product.html?id=" + product._id;

    // CREATE <div> = BOX
    const box = createElementFactory("div", { class: "card shadow"}, link);

    // CREATE <img> = IMG
    const img = createElementFactory("img", { class: "card-img-top"}, box);
    img.src = product.imageUrl;

    // CREATE <div> = BODY
    const body = createElementFactory("div", { class: "card-body d-flex flex-column"}, box);

    // CREATE <h5> = TITLE
    const title = createElementFactory("h5", { class : "card-title font-weight-bold"}, body);
    title.textContent = product.name;

    // CREATE <p> = DESC
    const desc = createElementFactory("p", { class: "card-text mb-auto text-justify font-weight-bold"}, body);
    desc.textContent = product.description;

    // CREATE <div> = FOOTER
    const footer = createElementFactory("div", { class: "card-price d-flex justify-content-end"}, body);

    // CREATE <p> = PRICE
    const price = createElementFactory("p", { class: "price font-weight-bold my-0"}, footer);
    price.textContent = formatPrice(product.price);
  }
};