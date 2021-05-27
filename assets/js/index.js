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
  const card = document.createElement("div");
  cardSection.appendChild(card);
  card.classList.add("row", "row-cols-1", "row-cols-md-3", "products", "my-4");

  for (let product of products) {
    // CREATE <article> = ARTICLE
    const article = document.createElement("article");
    card.appendChild(article);
    article.classList.add("col", "my-4");

    // CREATE <a> = LINK
    const link = document.createElement("a");
    article.appendChild(link);
    link.href = "product.html?id=" + product._id;

    // CREATE <div> = BOX
    const box = document.createElement("div");
    link.appendChild(box);
    box.classList.add("card", "shadow");

    // CREATE <img> = IMG
    const img = document.createElement("img");
    box.appendChild(img);
    img.classList.add("card-img-top");
    img.src = product.imageUrl;

    // CREATE <div> = BODY
    const body = document.createElement("div");
    box.appendChild(body);
    body.classList.add("card-body", "d-flex", "flex-column");

    // CREATE <h5> = TITLE
    const title = document.createElement("h5");
    body.appendChild(title);
    title.classList.add("card-title", "font-weight-bold");
    title.textContent = product.name;

    // CREATE <p> = DESC
    const desc = document.createElement("p");
    body.appendChild(desc);
    desc.classList.add("card-text", "mb-auto", "text-justify", "font-weight-bold");
    desc.textContent = product.description;

    // CREATE <div> = FOOTER
    const footer = document.createElement("div");
    body.appendChild(footer);
    footer.classList.add("card-price", "d-flex", "justify-content-end");

    // CREATE <p> = PRICE
    const price = document.createElement("p");
    footer.appendChild(price);
    price.classList.add("price", "font-weight-bold", "my-0");
    price.textContent = formatPrice(product.price);
  }
};
