import _ from 'lodash';
import './../style.scss';
let storage = JSON.parse(localStorage.getItem("toto"))
let panier = storage ? storage : [];

let storagePrice = JSON.parse(localStorage.getItem("price"))
let price = storagePrice ? storagePrice : [];


const urlName = new URL(window.location.href);
const id = urlName.searchParams.get("name");
console.log(id);

let message = document.getElementById("message");
message.innerHTML = "merci " + id +  " pour votre commande, le prix total est de : " +price+ "€ votre numero de commande est : " +panier;
console.log(id);