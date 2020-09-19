import _ from 'lodash';
import './../style.scss';

const urlName = new URL(window.location.href);
const id = urlName.searchParams.get("name");
console.log(id);
const urlEmail = new URL(window.location.href);
const email = urlEmail.searchParams.get("email");
console.log(email);
let name = document.getElementById("name");
name.innerHTML = "merci " + id +  " pour votre commande un email de confirmation vous à été envoyé à " +email;