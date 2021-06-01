// EXECUTE MAIN FUNCTION ON LOAD
window.onload = () => {
  sumOrder();
  localStorage.clear();
};
// CREATE COMMAND PAGE
const sumOrder = () => {
  // GET DOM ELEMENT
  const order = document.getElementById("order");
  createSumOrder(order);
};
