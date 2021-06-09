// URL API
const url = location.hostname === "localhost" || location.hostname === "127.0.0.1"
? "http://localhost:3000/api/teddies/"
: "https://tp-oc-orinoco.herokuapp.com/api/teddies/";