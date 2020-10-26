import _ from 'lodash';
import './../style.scss';
let storage = JSON.parse(localStorage.getItem("idCommande"))
let panier = storage ? storage : [];

let storagePrice = JSON.parse(localStorage.getItem("price"))
let price = storagePrice ? storagePrice : [];


let storageName = JSON.parse(localStorage.getItem("contact"))
let name = storageName ? storageName : [];

let message = document.getElementById("message");
message.innerHTML = "merci " + name.firstName +  " pour votre commande, le prix total est de : " +price+ "€ votre numero de commande est : " +panier;
console.log(id);