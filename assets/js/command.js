// MAIN FUNCTION
const main = async () => {
    const cart = new Cart
    sumOrder(cart)
    localStorage.clear();
};

const sumOrder = (cart) => {
    // GET DOM ELEMENT
    const order = document.getElementById("order")

    // CREATE <p> TOTALQUANTITY
    const totalQuantity = document.createElement("p")
    order.appendChild(totalQuantity)
    totalQuantity.classList.add("font-weight-bold")
    totalQuantity.textContent = "Quantité d'articles : " + cart.itemsQty()

    // CREATE <p> TOTALPRICE
    const totalPrice = document.createElement("p")
    order.appendChild(totalPrice)
    totalPrice.classList.add("font-weight-bold")
    totalPrice.textContent = "Prix total : " + formatPrice(cart.totalPrices(), true);

    // CREATE <p> ORDERID
    const orderId = document.createElement("p")
    order.appendChild(orderId)
    orderId.classList.add("font-weight-bold")
    orderId.textContent = "Numéro de commande : " + getSearchParams("orderId")
}
// EXECUTE MAIN FUNCTION ON LOAD
document.onload = main();